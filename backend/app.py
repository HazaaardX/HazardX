# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# import pandas as pd
# import pickle

# app = FastAPI()

# #frontend requests
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# #load model and encoder
# model = pickle.load(open("random_forest_model.pkl", "rb"))
# encoders = pickle.load(open("encoders.pkl", "rb"))

# @app.get("/")
# def home():
#     return {"message": "HazardX Backend Running"}

# @app.post("/predict")
# def predict(data: dict):

#     try:

#         input_data = {
#             "Countries": data["country"],
#             "Local": data["local"],
#             "Industry Sector": data["industrySector"],
#             "Employee or Third Party": data["employeeType"],
#             "Critical Risk": data["criticalRisk"],
#         }

#         df = pd.DataFrame([input_data])

#         for col in df.columns:
#             df[col] = encoders[col].transform(df[col])

#         prediction = model.predict(df)[0]

#         probabilities = model.predict_proba(df)[0]

#         confidence = round(max(probabilities) * 100, 2)

#         if prediction == 1:
#             severity = "High Severity Risk"

#             recommendation = (
#                 "Immediate safety inspection recommended. "
#                 "Review operational hazards and enforce "
#                 "preventive safety protocols."
#             )

#         else:
#             severity = "Low Severity Risk"

#             recommendation = (
#                 "Current incident pattern indicates lower "
#                 "severity risk. Continue standard safety monitoring."
#             )

#         return {
#             "severity": severity,
#             "confidence": confidence,
#             "recommendation": recommendation,
#         }

#     except Exception as e:
#         return {
#             "error": str(e)
#         }

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from contextlib import asynccontextmanager

import pandas as pd
import pickle
import logging
import os

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)s  %(message)s",
)
logger = logging.getLogger(__name__)

model = None
encoders = None

REQUIRED_FILES = ["random_forest_model.pkl", "encoders.pkl"]

FEATURE_COLUMNS = [
    "Countries",
    "Local",
    "Industry Sector",
    "Employee or Third Party",
    "Critical Risk",
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, encoders

    for f in REQUIRED_FILES:
        if not os.path.exists(f):
            raise FileNotFoundError(
                f"Required file '{f}' not found. "
                "Ensure model artifacts are in the working directory."
            )

    model   = pickle.load(open("random_forest_model.pkl", "rb"))
    encoders = pickle.load(open("encoders.pkl", "rb"))
    logger.info("Model and encoders loaded successfully.")

    missing = [c for c in FEATURE_COLUMNS if c not in encoders]
    if missing:
        raise KeyError(f"Encoders missing for columns: {missing}")

    yield 

    logger.info("Shutting down HazardX backend.")

app = FastAPI(
    title="HazardX API",
    description="Workplace hazard severity prediction API.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    country:        str
    local:          str
    industrySector: str
    employeeType:   str
    criticalRisk:   str

    
    @validator("*", pre=True)
    def strip_strings(cls, v):
        return v.strip() if isinstance(v, str) else v

class PredictResponse(BaseModel):
    severity:       str
    confidence:     float
    recommendation: str
    probabilities:  dict

#helper
def encode_input(data: PredictRequest) -> pd.DataFrame:
    """Map request fields → model columns and label-encode each one."""
    raw = {
        "Countries":              data.country,
        "Local":                  data.local,
        "Industry Sector":        data.industrySector,
        "Employee or Third Party": data.employeeType,
        "Critical Risk":          data.criticalRisk,
    }

    df = pd.DataFrame([raw])

    unknown_values = {}
    for col in FEATURE_COLUMNS:
        encoder = encoders[col]
        known   = set(encoder.classes_)
        val     = df.at[0, col]

        if val not in known:
            unknown_values[col] = val

    if unknown_values:
        raise HTTPException(
            status_code=422,
            detail={
                "message": "One or more input values are not recognised by the encoder.",
                "unknown_values": unknown_values,
            },
        )

    for col in FEATURE_COLUMNS:
        df[col] = encoders[col].transform(df[col])

    return df

#routes
@app.get("/", tags=["Health"])
def home():
    return {"message": "HazardX Backend Running", "status": "ok"}


@app.get("/health", tags=["Health"])
def health():
    """Quick liveness + readiness check."""
    ready = model is not None and encoders is not None
    return {
        "status":  "ready" if ready else "unavailable",
        "model":   "loaded" if model    is not None else "missing",
        "encoders": "loaded" if encoders is not None else "missing",
    }


@app.get("/options", tags=["Metadata"])
def get_options():
    """
    Return the valid choices for every categorical field.
    The frontend can use this to populate dropdowns dynamically.
    """
    if encoders is None:
        raise HTTPException(status_code=503, detail="Encoders not loaded yet.")

    return {
        "country":        list(encoders["Countries"].classes_),
        "local":          list(encoders["Local"].classes_),
        "industrySector": list(encoders["Industry Sector"].classes_),
        "employeeType":   list(encoders["Employee or Third Party"].classes_),
        "criticalRisk":   list(encoders["Critical Risk"].classes_),
    }


@app.post("/predict", response_model=PredictResponse, tags=["Prediction"])
def predict(data: PredictRequest):
    """
    Predict workplace hazard severity for the given input.
    Returns severity label, confidence %, recommendation, and full probabilities.
    """
    logger.info("Predict request received: %s", data.model_dump())

    df = encode_input(data)

    prediction    = model.predict(df)[0]
    probabilities = model.predict_proba(df)[0]
    classes       = model.classes_  

    confidence = round(float(max(probabilities)) * 100, 2)

    prob_map = {
        "High Severity Risk": round(float(probabilities[list(classes).index(1)]) * 100, 2),
        "Low Severity Risk":  round(float(probabilities[list(classes).index(0)]) * 100, 2),
    }

    if prediction == 1:
        severity = "High Severity Risk"
        recommendation = (
            "Immediate safety inspection recommended. "
            "Review operational hazards and enforce "
            "preventive safety protocols."
        )
    else:
        severity = "Low Severity Risk"
        recommendation = (
            "Current incident pattern indicates lower severity risk. "
            "Continue standard safety monitoring."
        )

    logger.info(
        "Prediction: %s | Confidence: %.2f%% | Input: %s",
        severity, confidence, data.model_dump(),
    )

    return PredictResponse(
        severity=severity,
        confidence=confidence,
        recommendation=recommendation,
        probabilities=prob_map,
    )