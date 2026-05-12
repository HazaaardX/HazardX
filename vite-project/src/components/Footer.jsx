import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-xl text-white">HazardX</span>
            </div>
            <p className="text-gray-400 mb-4">
              Free ML-powered workplace safety analytics to predict and prevent accidents.
            </p>
          </div>

          <div>
            <h3 className="text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-400 transition">How It Works</a></li>
              <li><a href="#documentation" className="hover:text-blue-400 transition">Documentation</a></li>
              <li><a href="#case-studies" className="hover:text-blue-400 transition">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="#careers" className="hover:text-blue-400 transition">Careers</a></li>
              <li><a href="#blog" className="hover:text-blue-400 transition">Blog</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@hazardx.ai</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>123 Safety Street<br/>San Francisco, CA 94102</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 HazardX. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-blue-400 transition">Terms of Service</a>
            <a href="#security" className="hover:text-blue-400 transition">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer