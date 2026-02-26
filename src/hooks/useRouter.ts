import { useState, useEffect } from 'react';

export function useRouter() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return { route, navigate };
}

export function getProductIdFromRoute(route: string): number | null {
  const match = route.match(/^\/product\/(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}
