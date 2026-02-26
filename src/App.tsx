import { CartProvider } from './context/CartContext';
import { useRouter, getProductIdFromRoute } from './hooks/useRouter';
import Header from './components/Header';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const { route, navigate } = useRouter();

  const renderPage = () => {
    if (route === '/' || route === '') {
      return <Shop onNavigate={navigate} />;
    }

    if (route.startsWith('/product/')) {
      const productId = getProductIdFromRoute(route);
      if (productId) {
        return <ProductDetail productId={productId} onNavigate={navigate} />;
      }
    }

    if (route === '/cart') {
      return <Cart onNavigate={navigate} />;
    }

    if (route === '/about') {
      return <About />;
    }

    if (route === '/contact') {
      return <Contact />;
    }

    return <Shop onNavigate={navigate} />;
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header onNavigate={navigate} currentRoute={route} />
        {renderPage()}
      </div>
    </CartProvider>
  );
}

export default App;
