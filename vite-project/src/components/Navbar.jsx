import { Shield, Menu } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">HazardX</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Home</a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t">
            <div className="flex flex-col gap-3">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition py-2">Home</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition py-2">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition py-2">How It Works</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition py-2">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition py-2">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar