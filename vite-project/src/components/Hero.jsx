import { TrendingDown, BarChart3, Brain } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Hero() {

  const navigate = useNavigate()

  return (
    <section
      id="home"
      className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center max-w-3xl mx-auto mb-12">

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
            <Brain className="w-4 h-4" />

            <span className="text-sm">
              Powered by Machine Learning
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
            Predict Workplace Accidents

            <span className="block text-blue-600">
              Before They Happen
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Analyze industrial risk factors and identify
            high-severity workplace incidents using
            machine learning driven safety prediction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <button
              onClick={() => navigate('/predict')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Try Prediction Model
            </button>

            <a
              href="#features"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Learn More
            </a>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

          <div className="bg-white p-6 rounded-xl shadow-md">

            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingDown className="w-6 h-6 text-blue-600" />
            </div>

            <h3 className="mb-2 text-gray-900">
              Improved Risk Detection
            </h3>

            <p className="text-gray-600">
              Machine learning based identification
              of high-risk industrial incidents.
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">

            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>

            <h3 className="mb-2 text-gray-900">
              Real-Time Prediction
            </h3>

            <p className="text-gray-600">
              Analyze workplace risk factors and
              estimate accident severity instantly.
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">

            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>

            <h3 className="mb-2 text-gray-900">
              Random Forest Intelligence
            </h3>

            <p className="text-gray-600">
              Industrial safety insights powered
              by supervised machine learning models.
            </p>

          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero