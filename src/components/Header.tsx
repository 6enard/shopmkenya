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
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-[88px]">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center hover:opacity-70 transition-opacity duration-200"
          >
            <img
              src="/studio-mkenya-LOGO.png"
              alt="Studio Mkenya"
              className="h-10 w-auto"
            />
          </button>

          <nav className="hidden md:flex items-center gap-12">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`text-[13px] uppercase tracking-wider font-medium transition-all duration-200 ${
                  currentRoute === item.path
                    ? 'text-black'
                    : 'text-gray-500 hover:text-[#1498d4]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/cart')}
              className="relative p-1 text-black hover:text-[#1498d4] transition-colors duration-200"
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B0D80A] text-black text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-black hover:text-[#1498d4] transition-colors"
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-6 border-t border-gray-100 mt-[-1px]">
            <div className="pt-6 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-[13px] uppercase tracking-wider font-medium transition-colors ${
                    currentRoute === item.path
                      ? 'text-black'
                      : 'text-gray-500 hover:text-[#1498d4]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
