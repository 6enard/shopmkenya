import { useState } from 'react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

interface ProductDetailProps {
  productId: number;
  onNavigate: (path: string) => void;
}

export default function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  const products = productsData as Product[];
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-black mb-6">Product not found</h2>
          <button
            onClick={() => onNavigate('/')}
            className="text-gray-600 hover:text-black inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="text-sm uppercase tracking-wider">Back to shop</span>
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <button
          onClick={() => onNavigate('/')}
          className="text-gray-500 hover:text-black inline-flex items-center gap-2 mb-12 transition-colors duration-200"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[11px] uppercase tracking-wider font-medium">Back</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <div className="aspect-square bg-gray-50 overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-50 overflow-hidden border-2 transition-colors duration-200 ${
                      selectedImage === idx ? 'border-black' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8 lg:pt-8">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-4">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight leading-tight">{product.name}</h1>
              <p className="text-3xl font-light text-black">${product.price.toFixed(2)}</p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-700 leading-relaxed font-light text-[15px]">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-gray-200 pt-8">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Dimensions</p>
                <p className="font-light text-black">{product.dimensions}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Material</p>
                <p className="font-light text-black">{product.material}</p>
              </div>
            </div>

            {product.inStock ? (
              <div className="space-y-6 border-t border-gray-200 pt-8">
                <div className="flex items-center gap-6">
                  <span className="text-[11px] uppercase tracking-wider font-medium text-gray-700">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black transition-colors duration-200"
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="w-12 text-center font-light text-black">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-black transition-colors duration-200"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-5 px-8 text-[11px] uppercase tracking-wider font-medium hover:bg-[#B0D80A] hover:text-black transition-all duration-300"
                >
                  {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-8">
                <div className="bg-gray-100 text-gray-700 py-5 px-6 text-center text-[11px] uppercase tracking-wider font-medium">
                  Out of Stock
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
