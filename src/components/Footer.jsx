import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-800 to-red-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-orange-200">TasteHub</h3>
            <p className="text-orange-100 leading-relaxed">
              Discover authentic recipes from around the world. Join our
              community of food lovers and create delicious memories.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-orange-200 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-orange-200 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-orange-200 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-orange-200 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-200">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Cuisines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-200">
              Popular Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Vegetarian
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Quick & Easy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Desserts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Healthy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white transition-colors"
                >
                  Breakfast
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-200">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-orange-300" />
                <span className="text-orange-100">hello@tastehub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-orange-300" />
                <span className="text-orange-100"></span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-orange-300" />
                <span className="text-orange-100">India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-1 text-orange-200">
              <span>{Date.now}</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for food lovers</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-orange-200 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-orange-200 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-orange-200 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
