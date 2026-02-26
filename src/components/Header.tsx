import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentRoute: string;
}

export default function Header({ onNavigate, currentRoute }: HeaderProps) {
  const { getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  const navItems = [
    { label: 'Shop', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="bg-gray-900 text-white py-2 px-4 text-center text-sm font-medium">
        Free shipping on orders over $100 | New arrivals weekly
      </div>

      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                src="/studio-mkenya-LOGO.png"
                alt="Studio Mkenya"
                className="h-12 w-auto"
              />
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`text-sm font-medium transition-colors ${
                    currentRoute === item.path
                      ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('/cart')}
                className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-gray-900"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-200">
              {navItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-base font-medium transition-colors ${
                    currentRoute === item.path
                      ? 'text-gray-900 bg-gray-50'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
