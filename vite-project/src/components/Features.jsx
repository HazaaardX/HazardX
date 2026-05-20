import {
  AlertTriangle,
  BarChart4,
  Shield,
  Clock,
  FileText,
  Users
} from 'lucide-react';

const features = [
  {
    icon: AlertTriangle,
    title: 'Risk Assessment',
    description: 'Real-time risk scoring based on environmental factors, equipment status, and worker behaviors.',
  },
  {
    icon: BarChart4,
    title: 'Predictive Analytics',
    description: 'Advanced ML models analyze historical data to forecast accident likelihood and severity.',
  },
  {
    icon: Shield,
    title: 'Safety Insights',
    description: 'Actionable recommendations to prevent incidents before they occur.',
  },
  {
    icon: Clock,
    title: 'Early Warning System',
    description: 'Instant alerts when conditions indicate elevated risk of workplace accidents.',
  },
  {
    icon: FileText,
    title: 'Compliance Tracking',
    description: 'Monitor safety regulations compliance and generate automated reports.',
  },
  {
    icon: Users,
    title: 'Team Dashboard',
    description: 'Collaborative tools for safety managers, supervisors, and workers.',
  }
];

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-overline">Capabilities</span>
          <h2 className="section-title">Comprehensive Safety Intelligence</h2>
          <p className="section-desc">
            Our platform combines machine learning, data analytics, and safety expertise
            to deliver unprecedented workplace protection.
          </p>
        </div>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrap">
                <Icon />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}