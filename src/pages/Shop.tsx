import { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import FeaturedCarousel from '../components/FeaturedCarousel';
import productsData from '../data/products.json';

interface ShopProps {
  onNavigate: (path: string) => void;
}

export default function Shop({ onNavigate }: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const products = productsData as Product[];

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory, products]);

  const featuredProducts = useMemo(() => {
    return products.filter(p => p.featured);
  }, [products]);

  return (
    <div className="min-h-screen bg-white">
      <FeaturedCarousel products={featuredProducts} onNavigate={onNavigate} />

      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-black tracking-tight">Collection</h2>

          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 text-[11px] uppercase tracking-wider font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-500 text-base font-light">No products found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
