import { Database, Cpu, LineChart, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Database,
    title: 'Data Collection',
    description: 'Integrate your historical workplace safety records, incident reports, and environmental data.',
    step: '01'
  },
  {
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our machine learning models process millions of data points to identify patterns and risk factors.',
    step: '02'
  },
  {
    icon: LineChart,
    title: 'Prediction & Insights',
    description: 'Receive severity predictions, risk scores, and actionable safety recommendations.',
    step: '03'
  },
  {
    icon: CheckCircle,
    title: 'Prevention & Action',
    description: 'Implement targeted interventions to prevent accidents and improve workplace safety.',
    step: '04'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-overline">Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">
            From data to protection in four simple steps
          </p>
        </div>
      </div>

      <div className="how-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="how-step">
              <div className="how-step-number">{step.step}</div>
              <div className="how-step-icon">
                <Icon />
              </div>
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-desc">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}