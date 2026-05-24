# HazardX

A full-stack workplace safety intelligence platform that uses machine learning to predict the severity of industrial incidents in real time. Given contextual information about a workplace event, the system classifies it as high or low severity and surfaces an actionable safety recommendation.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#api-reference)
- [Machine Learning Model](#machine-learning-model)
- [Dataset](#dataset)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

HazardX bridges the gap between raw incident data and actionable safety intelligence. Safety officers and operations teams can input the details of a workplace incident — industry sector, employee type, country, plant location, and the identified critical risk — and receive an instant severity classification backed by a trained Random Forest classifier.

The platform was built with production readiness in mind: the backend exposes a documented REST API, validates all inputs against encoder-known categories, and returns structured predictions with confidence scores and probability breakdowns.

---

## Features

**Severity Prediction**
Classifies each submitted incident as either High Severity Risk or Low Severity Risk using a binary Random Forest classifier trained on real industrial safety data.

**Confidence Scoring**
Returns the model's confidence level as a percentage alongside a full probability breakdown across both classes, giving users a quantitative basis for decision-making.

**Safety Recommendations**
Each prediction is accompanied by a contextual safety recommendation — either prompting immediate inspection and protocol enforcement or confirming that standard monitoring is sufficient.

**Dynamic Form Options**
The frontend fetches valid dropdown options directly from the backend `/options` endpoint, ensuring the UI always reflects the categories the model was trained on and preventing invalid submissions.

**Input Validation**
The API layer validates every categorical field against the label encoder's known classes before inference. Unknown values return a structured 422 response identifying the offending fields.

**Health Check Endpoint**
A dedicated `/health` endpoint confirms whether the model and encoders are loaded and ready, useful for container orchestration and uptime monitoring.

**Interactive Landing Page**
A multi-section landing page explains the product, how it works, and its key features before routing users to the prediction interface.

---

## Architecture

```
Browser (React + Vite)
        |
        | HTTP (fetch)
        v
FastAPI Backend (Python)
        |
        | pickle
        v
Random Forest Model + Label Encoders
```

The frontend and backend are decoupled services. The React application communicates with the FastAPI backend over HTTP. CORS is configured on the backend to allow cross-origin requests during local development. In a production deployment, both services would typically sit behind a reverse proxy such as Nginx.

---

## Project Structure

```
HazardX/
|
|-- backend/
|   |-- app.py                        # FastAPI application, routes, schemas, inference logic
|   |-- random_forest_model.pkl       # Serialized trained Random Forest classifier
|   |-- encoders.pkl                  # Serialized label encoders for all categorical features
|
|-- data/
|   |-- IHMStefanini_industrial_safety_and_health_database.csv
|                                     # Source dataset used for training
|
|-- notebook/
|   |-- model.ipynb                   # End-to-end model development and evaluation notebook
|   |-- training.ipynb                # SMOTE-based resampling and training pipeline notebook
|
|-- vite-project/
|   |-- index.html                    # Application entry point
|   |-- vite.config.js                # Vite + React + Tailwind plugin configuration
|   |-- package.json
|   |
|   |-- src/
|       |-- main.jsx                  # React root, router setup
|       |-- App.jsx                   # Top-level component, route definitions
|       |-- App.css                   # Global styles and design tokens
|       |-- index.css                 # Base resets and utility classes
|       |
|       |-- pages/
|       |   |-- HomePage.jsx          # Landing page composition
|       |   |-- PredictionPage.jsx    # Prediction form and results view
|       |
|       |-- components/
|           |-- Navbar.jsx            # Top navigation bar
|           |-- Hero.jsx              # Hero section with call-to-action
|           |-- Features.jsx          # Feature highlights section
|           |-- HowItWorks.jsx        # Step-by-step process explanation
|           |-- Footer.jsx            # Site footer
|
|-- .gitignore
|-- README.md
```

---

## Technology Stack

**Frontend**

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI framework |
| Vite 8 | Build tool and development server |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| Lucide React | Icon library |

**Backend**

| Technology | Purpose |
|---|---|
| FastAPI | Async REST API framework |
| Pydantic | Request/response schema validation |
| scikit-learn | Random Forest classifier and label encoders |
| pandas | DataFrame construction for model inference |
| pickle | Model and encoder serialization |
| uvicorn | ASGI server |

**Machine Learning**

| Technology | Purpose |
|---|---|
| scikit-learn RandomForestClassifier | Core classification model |
| SMOTE (imbalanced-learn) | Synthetic oversampling to address class imbalance |
| LabelEncoder | Categorical feature encoding |

---

## Getting Started

### Prerequisites

- Python 3.9 or higher
- Node.js 18 or higher
- npm 9 or higher

### Backend Setup

1. Navigate to the backend directory.

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment.

   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. Install the required Python packages.

   ```bash
   pip install fastapi uvicorn pydantic pandas scikit-learn
   ```

4. Start the API server. The server must be launched from the `backend/` directory so that the relative paths to the `.pkl` files resolve correctly.

   ```bash
   uvicorn app:app --reload --host 127.0.0.1 --port 8000
   ```

5. Confirm the server is running by visiting `http://127.0.0.1:8000/health` or `http://127.0.0.1:8000/docs` for the interactive Swagger documentation.

### Frontend Setup

1. Navigate to the frontend directory.

   ```bash
   cd vite-project
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Start the development server.

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

The frontend expects the backend to be running on `http://127.0.0.1:8000`. If you change the backend host or port, update the fetch URL in `src/pages/PredictionPage.jsx` accordingly.

---

## API Reference

All endpoints are prefixed at `http://127.0.0.1:8000`. Full interactive documentation is available at `/docs` (Swagger UI) and `/redoc` (ReDoc) when the server is running.

### GET /health

Returns the operational status of the model and encoders.

**Response**
```json
{
  "status": "ready",
  "model": "loaded",
  "encoders": "loaded"
}
```

---

### GET /options

Returns the valid categorical values for each input field, sourced directly from the label encoders.

**Response**
```json
{
  "country": ["Country_01", "Country_02", "Country_03"],
  "local": ["Local_01", "Local_02", "..."],
  "industrySector": ["Metals", "Mining", "Others"],
  "employeeType": ["Employee", "Third Party", "Third Party (Remote)"],
  "criticalRisk": ["Fall", "Chemical substances", "..."]
}
```

---

### POST /predict

Accepts incident details and returns a severity prediction.

**Request Body**
```json
{
  "country": "Country_01",
  "local": "Local_03",
  "industrySector": "Mining",
  "employeeType": "Employee",
  "criticalRisk": "Fall"
}
```

**Response**
```json
{
  "severity": "High Severity Risk",
  "confidence": 87.4,
  "recommendation": "Immediate safety inspection recommended. Review operational hazards and enforce preventive safety protocols.",
  "probabilities": {
    "High Severity Risk": 87.4,
    "Low Severity Risk": 12.6
  }
}
```

**Error Responses**

| Code | Condition |
|---|---|
| 422 | One or more input values are not recognised by the encoder |
| 500 | Internal model inference failure |
| 503 | Model or encoders not yet loaded |

---

## Machine Learning Model

The classifier is a Random Forest trained on the IHMStefanini industrial safety dataset. The training pipeline is documented in `notebook/model.ipynb` and `notebook/training.ipynb`.

**Input Features**

| Feature | Description |
|---|---|
| Countries | The country in which the incident occurred |
| Local | The specific plant or local facility |
| Industry Sector | Sector of operation (Metals, Mining, Others) |
| Employee or Third Party | Whether the involved party is a direct employee or contractor |
| Critical Risk | The primary risk category associated with the incident |

**Target**

Binary classification: `1` (High Severity) or `0` (Low Severity), derived from the Accident Level and Potential Accident Level fields in the source data.

**Class Imbalance**

The dataset exhibits significant class imbalance. SMOTE (Synthetic Minority Oversampling Technique) was applied during training to synthesize additional samples for the minority class, improving recall on high-severity incidents.

**Artifacts**

The trained model and encoders are serialized to `backend/random_forest_model.pkl` and `backend/encoders.pkl` respectively. These files are loaded once at server startup via FastAPI's lifespan context manager.

---

## Dataset

Source: [IHMStefanini Industrial Safety and Health Database](https://www.kaggle.com/datasets/ihmstefanini/industrial-safety-and-health-database)

The dataset contains anonymized records of workplace incidents across multiple countries, industry sectors, and plant locations. Each record includes the accident level, potential accident level, the critical risk category, and metadata about the worker and workplace involved.

The raw CSV is stored in `data/IHMStefanini_industrial_safety_and_health_database.csv` and is used exclusively during model training. It is not accessed at runtime.

---

## Contributing

1. Fork the repository.
2. Create a feature branch from `development`.

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes with clear, descriptive messages.
4. Open a pull request against the `development` branch.

All pull requests should target `development`. Changes are merged to `master` only after review and validation.

---

## License

This project is released under the MIT License.
