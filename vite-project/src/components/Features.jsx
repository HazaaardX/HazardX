import {
  AlertTriangle,
  BarChart4,
  Shield,
  Clock,
  FileText,
  Users
} from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: AlertTriangle,
      title: 'Risk Assessment',
      description: 'Real-time risk scoring based on environmental factors, equipment status, and worker behaviors.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: BarChart4,
      title: 'Predictive Analytics',
      description: 'Advanced ML models analyze historical data to forecast accident likelihood and severity.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Shield,
      title: 'Safety Insights',
      description: 'Actionable recommendations to prevent incidents before they occur.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Clock,
      title: 'Early Warning System',
      description: 'Instant alerts when conditions indicate elevated risk of workplace accidents.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: FileText,
      title: 'Compliance Tracking',
      description: 'Monitor safety regulations compliance and generate automated reports.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Users,
      title: 'Team Dashboard',
      description: 'Collaborative tools for safety managers, supervisors, and workers.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
            Comprehensive Safety Intelligence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines machine learning, data analytics, and safety expertise
            to deliver unprecedented workplace protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition"
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Features