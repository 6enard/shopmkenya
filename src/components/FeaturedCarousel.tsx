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
    <section className="relative h-[70vh] min-h-[500px] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={currentProduct.image}
          alt={currentProduct.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <div className="inline-block border border-white/40 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6">
            FEATURED
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight">
            {currentProduct.name}
          </h2>
          <p className="text-lg md:text-xl mb-3 text-white/80">
            {currentProduct.category}
          </p>
          <p className="text-base md:text-lg mb-8 text-white/70 line-clamp-2">
            {currentProduct.description}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-3xl md:text-4xl font-bold text-white">
              ${currentProduct.price.toFixed(2)}
            </span>
            <button
              onClick={() => onNavigate(`/product/${currentProduct.id}`)}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold text-base hover:bg-gray-100 transition-colors"
            >
              View Product
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
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
