import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  return (
    <div className="group cursor-pointer" onClick={() => onNavigate(`/product/${product.id}`)}>
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <span className="text-gray-900 font-semibold whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>
    </div>
  );
}
