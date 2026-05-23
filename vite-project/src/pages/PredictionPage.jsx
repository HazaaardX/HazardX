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
  const [error, setError] = useState(null)     

const industrySectors = [
  'Metals',
  'Mining',
  'Others',
]

const employeeTypes = [
  'Employee',
  'Third Party',
  'Third Party (Remote)',
]

const criticalRisks = [
  'Not applicable',
  'Bees',
  'Blocking and isolation of energies',
  'Burn',
  'Chemical substances',           
  'Confined space',
  'Cut',
  'Electrical Shock',
  'Electrical installation',
  'Fall',
  'Fall prevention',
  'Fall prevention (same level)',
  'Individual protection equipment',
  'Liquid Metal',
  'Machine Protection',
  'Manual Tools',
  'Others',
  'Plates',
  'Poll',
  'Power lock',
  'Pressed',
  'Pressurized Systems',
  'Pressurized Systems / Chemical Substances',
  'Projection',
  'Projection of fragments',
  'Projection/Burning',
  'Projection/Choco',
  'Projection/Manual Tools',
  'Suspended Loads',
  'Traffic',
  'Vehicles and Mobile Equipment',
  'Venomous Animals',
  'remains of choco',
]

const countries = [
  'Country_01',
  'Country_02',
  'Country_03',
]

const localPlants = [
  'Local_01', 'Local_02', 'Local_03', 'Local_04',
  'Local_05', 'Local_06', 'Local_07', 'Local_08',
  'Local_09', 'Local_10', 'Local_11', 'Local_12',
]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setPrediction(null)
    setError(null)                          

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country:        formData.country,
          local:          formData.localPlant,
          industrySector: formData.industrySector,
          employeeType:   formData.employeeType,
          criticalRisk:   formData.criticalRisk,
        }),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        const msg =
          result.error ||
          result.detail?.message ||
          result.detail ||
          'Prediction failed. Please try again.'
        setError(typeof msg === 'object' ? JSON.stringify(msg) : msg)
        return
      }

      if (!result.severity || result.confidence === undefined) {
        setError('Unexpected response from server. Check the backend logs.')
        console.error('Unexpected API response:', result)
        return
      }

      setPrediction(result)

    } catch (err) {
      setError('Could not reach the backend. Make sure it is running on port 8000.')
      console.error(err)
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
    setError(null)                              
  }

  const isHighSeverity = prediction?.severity?.toLowerCase().includes('high')

  return (
    <div className="predict-page">

      <div className="predict-bg-wash" />

      <div className="predict-container">

        <button onClick={() => navigate('/')} className="predict-back reveal">
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
              <h1 className="predict-card-title">Safety Incident Prediction</h1>
              <p className="predict-card-subtitle">
                Enter workplace incident details to predict severity risk
              </p>
            </div>
          </div>

          <div className="predict-card-body">

            {/*Error banner*/}
            {error && (
              <div className="predict-error-banner">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {!prediction ? (

              <form onSubmit={handleSubmit} className="predict-form">

                {/* Workplace Info */}
                <div className="predict-form-group">
                  <div className="predict-group-label">
                    <span className="section-overline">Workplace Information</span>
                  </div>

                  <div className="predict-form-grid">

                    <div className="predict-field">
                      <label className="predict-label"><Building2 size={14} /> Industry Sector</label>
                      <select
                        required
                        value={formData.industrySector}
                        onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                        className="predict-select"
                      >
                        <option value="">Select Industry Sector</option>
                        {industrySectors.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="predict-field">
                      <label className="predict-label"><Users size={14} /> Employee Type</label>
                      <select
                        required
                        value={formData.employeeType}
                        onChange={(e) => setFormData({ ...formData, employeeType: e.target.value })}
                        className="predict-select"
                      >
                        <option value="">Select Employee Type</option>
                        {employeeTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="predict-field">
                      <label className="predict-label"><MapPin size={14} /> Country</label>
                      <select
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="predict-select"
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="predict-field">
                      <label className="predict-label"><Factory size={14} /> Local / Plant</label>
                      <select
                        required
                        value={formData.localPlant}
                        onChange={(e) => setFormData({ ...formData, localPlant: e.target.value })}
                        className="predict-select"
                      >
                        <option value="">Select Local Plant</option>
                        {localPlants.map((p) => <option key={p} value={p}>{p}</option>)}
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
                    <label className="predict-label"><Zap size={14} /> Critical Risk</label>
                    <select
                      required
                      value={formData.criticalRisk}
                      onChange={(e) => setFormData({ ...formData, criticalRisk: e.target.value })}
                      className="predict-select"
                    >
                      <option value="">Select Critical Risk</option>
                      {criticalRisks.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div className="predict-actions">
                  <button type="submit" disabled={isSubmitting} className="btn-primary predict-submit">
                    {isSubmitting ? <><span className="predict-spinner" /> Analyzing…</> : 'Predict Severity'}
                  </button>
                  <button type="button" onClick={handleReset} className="btn-secondary predict-reset">
                    Reset
                  </button>
                </div>

              </form>

            ) : (

              <div className="predict-results reveal">

                {/* Result Hero */}
                <div className="predict-result-hero">
                  <div className={`predict-result-icon ${isHighSeverity ? 'predict-result-icon--danger' : 'predict-result-icon--safe'}`}>
                    {isHighSeverity ? <AlertCircle size={32} /> : <CheckCircle size={32} />}
                  </div>

                  <h3 className="predict-result-title">Prediction Result</h3>

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
                  <h4 className="predict-recommendation-title">Safety Recommendation</h4>
                  <p className="predict-recommendation-text">{prediction.recommendation}</p>
                </div>

                {/* Input Summary */}
                <div className="predict-summary">
                  <h4 className="predict-summary-title">Input Summary</h4>
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

                <div className="predict-actions">
                  <button onClick={handleReset} className="btn-primary predict-submit">
                    New Prediction
                  </button>
                  <button onClick={() => navigate('/')} className="btn-secondary predict-reset">
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