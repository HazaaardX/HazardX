import { AlertCircle, CheckCircle, ArrowLeft, ShieldAlert, Building2, Users, MapPin, Factory, Zap } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function PredictionPage() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    industrySector: '',
    employeeType: '',
    criticalRisk: '',
    country: '',
    localPlant: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [prediction, setPrediction] = useState(null)

  const industrySectors = [
    'Mining',
    'Metals',
    'Others',
  ]

  const employeeTypes = [
    'Employee',
    'Third Party',
    'Third Party (Remote)',
  ]

  const criticalRisks = [
    'Fall',
    'Electrical Shock',
    'Vehicles and Mobile Equipment',
    'Pressurized Systems',
    'Chemical Substances',
    'Suspended Loads',
    'Machinery',
    'Others',
  ]

  const countries = [
    'Country_01',
    'Country_02',
    'Country_03'
  ]

  const localPlants = [
    'Local_01',
    'Local_02',
    'Local_03',
    'Local_04',
    'Local_05',
    'Local_06',
    'Local_07',
    'Local_08',
    'Local_09',
    'Local_10',
    'Local_11',
    'Local_12'
  ]

  const handleSubmit = async (e) => {

    e.preventDefault()

    setIsSubmitting(true)

    setPrediction(null)

    try {

      const response = await fetch(
        'http://127.0.0.1:8000/predict',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(formData),
        }
      )

      const result = await response.json()

      setPrediction(result)

    } catch (error) {

      console.error(error)

      //hardcoded value until backend is completed
      setPrediction({
        severity: 'High Severity Risk',
        confidence: 67,
        recommendation:
          'Immediate safety inspection recommended for this operational scenario.',
      })

    } finally {

      setIsSubmitting(false)

    }
  }

  const handleReset = () => {

    setFormData({
      industrySector: '',
      employeeType: '',
      criticalRisk: '',
      country: '',
      localPlant: '',
    })

    setPrediction(null)
  }

  const isHighSeverity = prediction?.severity?.toLowerCase().includes('high')

  return (
    <div className="predict-page">

      {/* Background decoration */}
      <div className="predict-bg-wash" />

      <div className="predict-container">

        <button
          onClick={() => navigate('/')}
          className="predict-back reveal"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="predict-card reveal reveal-d1">

          {/* Header */}
          <div className="predict-card-header">
            <div className="predict-header-icon">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h1 className="predict-card-title">
                Safety Incident Prediction
              </h1>
              <p className="predict-card-subtitle">
                Enter workplace incident details to predict severity risk
              </p>
            </div>
          </div>

          <div className="predict-card-body">

            {!prediction ? (

              <form
                onSubmit={handleSubmit}
                className="predict-form"
              >

                {/* Workplace Info */}
                <div className="predict-form-group">

                  <div className="predict-group-label">
                    <span className="section-overline">Workplace Information</span>
                  </div>

                  <div className="predict-form-grid">

                    {/* Industry */}
                    <div className="predict-field">
                      <label className="predict-label">
                        <Building2 size={14} />
                        Industry Sector
                      </label>
                      <select
                        required
                        value={formData.industrySector}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            industrySector: e.target.value,
                          })
                        }
                        className="predict-select"
                      >
                        <option value="">
                          Select Industry Sector
                        </option>
                        {industrySectors.map((sector) => (
                          <option
                            key={sector}
                            value={sector}
                          >
                            {sector}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Employee Type */}
                    <div className="predict-field">
                      <label className="predict-label">
                        <Users size={14} />
                        Employee Type
                      </label>
                      <select
                        required
                        value={formData.employeeType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            employeeType: e.target.value,
                          })
                        }
                        className="predict-select"
                      >
                        <option value="">
                          Select Employee Type
                        </option>
                        {employeeTypes.map((type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Country */}
                    <div className="predict-field">
                      <label className="predict-label">
                        <MapPin size={14} />
                        Country
                      </label>
                      <select
                        required
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            country: e.target.value,
                          })
                        }
                        className="predict-select"
                      >
                        <option value="">
                          Select Country
                        </option>
                        {countries.map((country) => (
                          <option
                            key={country}
                            value={country}
                          >
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Local Plant */}
                    <div className="predict-field">
                      <label className="predict-label">
                        <Factory size={14} />
                        Local / Plant
                      </label>
                      <select
                        required
                        value={formData.localPlant}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            localPlant: e.target.value,
                          })
                        }
                        className="predict-select"
                      >
                        <option value="">
                          Select Local Plant
                        </option>
                        {localPlants.map((plant) => (
                          <option
                            key={plant}
                            value={plant}
                          >
                            {plant}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>

                {/* Incident Info */}
                <div className="predict-form-group">

                  <div className="predict-group-label">
                    <span className="section-overline">Incident Information</span>
                  </div>

                  <div className="predict-field">
                    <label className="predict-label">
                      <Zap size={14} />
                      Critical Risk
                    </label>
                    <select
                      required
                      value={formData.criticalRisk}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          criticalRisk: e.target.value,
                        })
                      }
                      className="predict-select"
                    >
                      <option value="">
                        Select Critical Risk
                      </option>
                      {criticalRisks.map((risk) => (
                        <option
                          key={risk}
                          value={risk}
                        >
                          {risk}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Buttons */}
                <div className="predict-actions">

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary predict-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="predict-spinner" />
                        Analyzing…
                      </>
                    ) : (
                      'Predict Severity'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-secondary predict-reset"
                  >
                    Reset
                  </button>

                </div>

              </form>

            ) : (

              <div className="predict-results reveal">

                {/* Result */}
                <div className="predict-result-hero">

                  <div className={`predict-result-icon ${isHighSeverity ? 'predict-result-icon--danger' : 'predict-result-icon--safe'}`}>
                    {isHighSeverity ? (
                      <AlertCircle size={32} />
                    ) : (
                      <CheckCircle size={32} />
                    )}
                  </div>

                  <h3 className="predict-result-title">
                    Prediction Result
                  </h3>

                  <div className={`predict-severity-badge ${isHighSeverity ? 'predict-severity-badge--danger' : 'predict-severity-badge--safe'}`}>
                    {prediction.severity}
                  </div>

                  <div className="predict-confidence">
                    <span className="predict-confidence-label">Confidence</span>
                    <div className="predict-confidence-bar-wrap">
                      <div
                        className="predict-confidence-bar"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                    <span className="predict-confidence-value">
                      {prediction.confidence}%
                    </span>
                  </div>

                </div>

                {/* Recommendation */}
                <div className="predict-recommendation">
                  <h4 className="predict-recommendation-title">
                    Safety Recommendation
                  </h4>
                  <p className="predict-recommendation-text">
                    {prediction.recommendation}
                  </p>
                </div>

                {/* Input Summary */}
                <div className="predict-summary">
                  <h4 className="predict-summary-title">
                    Input Summary
                  </h4>
                  <div className="predict-summary-grid">
                    <div className="predict-summary-item">
                      <span className="predict-summary-key">Industry</span>
                      <span className="predict-summary-val">{formData.industrySector}</span>
                    </div>
                    <div className="predict-summary-item">
                      <span className="predict-summary-key">Employee Type</span>
                      <span className="predict-summary-val">{formData.employeeType}</span>
                    </div>
                    <div className="predict-summary-item">
                      <span className="predict-summary-key">Critical Risk</span>
                      <span className="predict-summary-val">{formData.criticalRisk}</span>
                    </div>
                    <div className="predict-summary-item">
                      <span className="predict-summary-key">Country</span>
                      <span className="predict-summary-val">{formData.country}</span>
                    </div>
                    <div className="predict-summary-item">
                      <span className="predict-summary-key">Local Plant</span>
                      <span className="predict-summary-val">{formData.localPlant}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="predict-actions">
                  <button
                    onClick={handleReset}
                    className="btn-primary predict-submit"
                  >
                    New Prediction
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="btn-secondary predict-reset"
                  >
                    Back to Home
                  </button>
                </div>

              </div>

            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionPage