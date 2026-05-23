import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
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

          body: JSON.stringify({
            country: formData.country,
            local: formData.localPlant,
            industrySector: formData.industrySector,
            employeeType: formData.employeeType,
            criticalRisk: formData.criticalRisk,
          }),
        }
      )

      const result = await response.json()

      setPrediction(result)

    } catch (error) {

      console.error(error)

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

  const getSeverityColor = (severity) => {

    if (
      severity.toLowerCase().includes('high')
    ) {
      return 'text-red-700 bg-red-100'
    }

    return 'text-green-700 bg-green-100'
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">

      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />

          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/*HEADER*/}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">

            <h1 className="text-3xl text-white">
              Safety Incident Prediction
            </h1>

            <p className="text-blue-100 mt-2">
              Enter workplace incident details
              to predict severity risk
            </p>

          </div>

          <div className="p-8">

            {!prediction ? (

              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >

                {/*WORKPLACE INFO*/}
                <div>

                  <h3 className="text-lg text-gray-900 mb-5">
                    Workplace Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/*INDUSTRY*/}
                    <div>

                      <label className="block mb-2 text-gray-700 font-medium">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                    {/*EMPLOYEE TYPE*/}
                    <div>

                      <label className="block mb-2 text-gray-700 font-medium">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                    {/*COUNTRY*/}
                    <div>

                      <label className="block mb-2 text-gray-700 font-medium">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                    {/*LOCAL PLANT*/}
                    <div>

                      <label className="block mb-2 text-gray-700 font-medium">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                {/*INCIDENT INFO*/}
                <div>

                  <h3 className="text-lg text-gray-900 mb-5">
                    Incident Information
                  </h3>

                  <div>

                    <label className="block mb-2 text-gray-700 font-medium">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                {/*BUTTONS*/}
                <div className="flex gap-4 pt-2">

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                  >
                    {isSubmitting
                      ? 'Analyzing'
                      : 'Predict Severity'}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    Reset
                  </button>

                </div>

              </form>

            ) : (

              <div className="space-y-6">

                {/*RESULT*/}
                <div className="text-center p-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">

                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">

                    {prediction.severity
                      .toLowerCase()
                      .includes('high') ? (

                      <AlertCircle className="w-10 h-10 text-red-600" />

                    ) : (

                      <CheckCircle className="w-10 h-10 text-green-600" />

                    )}

                  </div>

                  <h3 className="text-2xl mb-4 text-gray-900">
                    Prediction Result
                  </h3>

                  <div
                    className={`inline-block px-8 py-4 rounded-xl text-xl mt-4 font-semibold ${getSeverityColor(
                      prediction.severity
                    )}`}
                  >
                    {prediction.severity}
                  </div>

                  <div className="mt-6 text-gray-700 text-lg">

                    Confidence:{' '}

                    <span className="font-bold">
                      {prediction.confidence}%
                    </span>

                  </div>

                </div>

                {/*RECOMMENDATION*/}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">

                  <h4 className="font-semibold text-blue-900 mb-3 text-lg">
                    Safety Recommendation
                  </h4>

                  <p className="text-blue-800 leading-relaxed">
                    {prediction.recommendation}
                  </p>

                </div>

                {/*INPUT SUMMARY*/}
                <div className="bg-gray-50 border rounded-xl p-6">

                  <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                    Input Summary
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                      <span className="text-gray-500">
                        Industry:
                      </span>

                      <span className="ml-2 text-gray-900">
                        {formData.industrySector}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500">
                        Employee Type:
                      </span>

                      <span className="ml-2 text-gray-900">
                        {formData.employeeType}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500">
                        Critical Risk:
                      </span>

                      <span className="ml-2 text-gray-900">
                        {formData.criticalRisk}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500">
                        Country:
                      </span>

                      <span className="ml-2 text-gray-900">
                        {formData.country}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500">
                        Local Plant:
                      </span>

                      <span className="ml-2 text-gray-900">
                        {formData.localPlant}
                      </span>
                    </div>

                  </div>

                </div>

                {/*ACTION BUTTONS*/}
                <div className="flex gap-4">

                  <button
                    onClick={handleReset}
                    className="flex-1 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    New Prediction
                  </button>

                  <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
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