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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Products</h2>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
