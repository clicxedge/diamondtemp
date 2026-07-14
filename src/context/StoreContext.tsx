import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Product } from "../data/catalog";

type CartLine = { product: Product; qty: number };
type CartState = Record<string, CartLine>;
type WishState = Record<string, true>;

type StoreContextValue = {
  cart: CartState;
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  wish: WishState;
  wishCount: number;
  toggleWish: (p: Product) => void;
  isWished: (id: string) => boolean;
  toast: string;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "wd_cart_v1";
const WISH_KEY = "wd_wish_v1";

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(() => loadJSON(CART_KEY, {}));
  const [wish, setWish] = useState<WishState>(() => loadJSON(WISH_KEY, {}));
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wish));
  }, [wish]);

  const fireToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1600);
  }, []);

  const addToCart = useCallback((p: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev[p.id];
      return { ...prev, [p.id]: { product: p, qty: (existing?.qty ?? 0) + qty } };
    });
    setCartOpen(true);
    fireToast("Added to your bag");
  }, [fireToast]);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { ...prev[id], qty } };
    });
  }, []);

  const toggleWish = useCallback((p: Product) => {
    setWish((prev) => {
      const next = { ...prev };
      if (next[p.id]) {
        delete next[p.id];
        fireToast("Removed from wishlist");
      } else {
        next[p.id] = true;
        fireToast("Saved to wishlist");
      }
      return next;
    });
  }, [fireToast]);

  const isWished = useCallback((id: string) => !!wish[id], [wish]);

  const cartCount = useMemo(() => Object.values(cart).reduce((s, l) => s + l.qty, 0), [cart]);
  const cartTotal = useMemo(() => Object.values(cart).reduce((s, l) => s + l.qty * l.product.price, 0), [cart]);
  const wishCount = useMemo(() => Object.keys(wish).length, [wish]);

  const value: StoreContextValue = {
    cart, cartCount, cartTotal, cartOpen, setCartOpen,
    addToCart, removeFromCart, setQty,
    wish, wishCount, toggleWish, isWished, toast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
