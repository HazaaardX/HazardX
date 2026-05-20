import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg-wash" aria-hidden="true" />

      <div className="hero-inner">
        <div className="reveal">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Powered by Advanced Machine Learning</span>
          </div>
        </div>

        <h1 className="hero-title reveal reveal-d1">
          Predict Workplace Accidents{' '}
          <span className="hero-title-em">Before They Happen</span>
        </h1>

        <p className="hero-subtitle reveal reveal-d2">
          Leverage historical safety data and cutting-edge AI to analyze patterns,
          predict accident severity, and create safer workplaces for everyone.
        </p>

        <div className="hero-actions reveal reveal-d3">
          <button
            className="btn-primary"
            onClick={() => navigate('/predict')}
          >
            To the Model
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
          <a className="btn-secondary" href="#features">Learn More</a>
        </div>

        <div className="hero-stats reveal reveal-d4">
          <div className="hero-stat">
            <div className="hero-stat-value">87%</div>
            <div className="hero-stat-label">Reduction in severe accidents</div>
          </div>

          <div className="hero-stat">
            <div className="hero-stat-value">95%</div>
            <div className="hero-stat-label">Prediction accuracy</div>
          </div>

          <div className="hero-stat">
            <div className="hero-stat-value">10M+</div>
            <div className="hero-stat-label">Data points analyzed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
