import { Database, Cpu, LineChart, CheckCircle } from 'lucide-react';

export function HowItWorks() {
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

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From data to protection in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-md h-full">
                  <div className="text-blue-200 text-6xl mb-4 opacity-30">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default HowItWorks