import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  onNavigate: (path: string) => void;
}

export default function Cart({ onNavigate }: CartProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag size={56} strokeWidth={1} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-light text-black mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 font-light">Add some products to get started</p>
          <button
            onClick={() => onNavigate('/')}
            className="bg-black text-white px-10 py-4 text-[11px] uppercase tracking-wider font-medium hover:bg-[#1498d4] transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-black tracking-tight">Cart</h1>
          <button
            onClick={clearCart}
            className="text-[11px] uppercase tracking-wider text-gray-500 hover:text-[#1498d4] transition-colors font-medium"
          >
            Clear cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <div
                key={item.product.id}
                className="bg-white border border-gray-100 p-6 flex flex-col sm:flex-row gap-6"
              >
                <div
                  className="w-full sm:w-32 h-48 sm:h-32 bg-gray-50 overflow-hidden flex-shrink-0 cursor-pointer"
                  onClick={() => onNavigate(`/product/${item.product.id}`)}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3
                        className="font-light text-black text-lg cursor-pointer hover:text-[#1498d4] transition-colors"
                        onClick={() => onNavigate(`/product/${item.product.id}`)}
                      >
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-[#1498d4] transition-colors"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-4">{item.product.category}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-[#1498d4] hover:text-[#1498d4] transition-colors"
                      >
                        <Minus size={12} strokeWidth={1.5} />
                      </button>
                      <span className="w-8 text-center font-light text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-[#1498d4] hover:text-[#1498d4] transition-colors"
                      >
                        <Plus size={12} strokeWidth={1.5} />
                      </button>
                    </div>

                    <p className="font-light text-black text-lg">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 sticky top-[120px]">
              <h2 className="text-xl font-light text-black mb-8 tracking-tight">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-700 font-light">
                  <span className="text-[13px]">Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-light">
                  <span className="text-[13px]">Shipping</span>
                  <span className="text-[13px]">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-black">
                  <span className="text-sm uppercase tracking-wider font-medium">Total</span>
                  <span className="text-lg font-light">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-5 px-6 text-[11px] uppercase tracking-wider font-medium hover:bg-[#1498d4] transition-all duration-300 mb-4">
                Proceed to Checkout
              </button>

              <button
                onClick={() => onNavigate('/')}
                className="w-full text-black py-4 px-6 text-[11px] uppercase tracking-wider font-medium border border-gray-300 hover:border-[#1498d4] hover:text-[#1498d4] transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
