import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface FeaturedCarouselProps {
  products: Product[];
  onNavigate: (path: string) => void;
}

export default function FeaturedCarousel({ products, onNavigate }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [products.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];

  return (
    <section className="relative h-[70vh] min-h-[500px] bg-gradient-to-br from-[#1498d4] to-[#0d7ab8] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={currentProduct.image}
          alt={currentProduct.name}
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white">
          <div className="inline-block bg-[#fae714] text-gray-900 text-xs font-bold px-4 py-2 rounded-full mb-4">
            FEATURED
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            {currentProduct.name}
          </h2>
          <p className="text-xl md:text-2xl mb-2 text-gray-200">
            {currentProduct.category}
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-300 line-clamp-2">
            {currentProduct.description}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-4xl md:text-5xl font-bold text-[#fae714]">
              ${currentProduct.price.toFixed(2)}
            </span>
            <button
              onClick={() => onNavigate(`/product/${currentProduct.id}`)}
              className="bg-[#fae714] text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#e8d510] transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-[#fae714] w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
