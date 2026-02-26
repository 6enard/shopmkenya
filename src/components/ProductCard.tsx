import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  return (
    <div className="group cursor-pointer" onClick={() => onNavigate(`/product/${product.id}`)}>
      <div className="aspect-square bg-gray-50 overflow-hidden mb-6 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-light text-sm uppercase tracking-wider">Out of Stock</span>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-[#1498d4] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
            Featured
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-light text-black text-lg group-hover:text-[#1498d4] transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-xs uppercase tracking-wider text-gray-500">{product.category}</p>
          <span className="text-black font-normal">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
