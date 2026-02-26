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
    }, 6000);

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
    <section className="relative h-[80vh] min-h-[600px] bg-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={currentProduct.image}
          alt={currentProduct.name}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

      <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-end pb-20">
        <div className="max-w-2xl">
          <div className="inline-block bg-[#B0D80A] text-black text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 mb-6">
            Featured
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-white leading-[1.1] tracking-tight">
            {currentProduct.name}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 font-light max-w-xl">
            {currentProduct.description}
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate(`/product/${currentProduct.id}`)}
              className="bg-black text-white px-10 py-4 text-sm uppercase tracking-wider font-medium hover:bg-[#1498d4] hover:text-white transition-all duration-300"
            >
              Shop Now
            </button>
            <span className="text-2xl md:text-3xl font-light text-white">
              ${currentProduct.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#B0D80A] w-12'
                : 'bg-white/40 hover:bg-white/60 w-8'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
