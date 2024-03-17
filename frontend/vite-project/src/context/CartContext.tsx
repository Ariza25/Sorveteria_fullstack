import {
    createContext,
    FunctionComponent,
    useState,
    useContext,
    useEffect,
  } from "react";
  import { Product } from "../context/ProductContext";
  import { AuthContext } from "../context/AuthContext"
  import { toast } from "react-toastify";
  
  export interface SelectedProduct extends Product {
    selectedQuantity: number;
  }
  
  export interface CartQuantityProps {
    quantity: number;	
  }
  
  type CartContextType = {
    addToCart: (product: SelectedProduct) => void;
    removeFromCart: (productId: string) => void;
    selectedProduct: Product | null;
    selectProduct: (product: Product) => void;
    cart: SelectedProduct[];
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
  };
  export const CartContext = createContext({} as CartContextType);
  
  interface CartProviderProps {
    children: React.ReactNode;
  }
  
  export const CartProvider: FunctionComponent<CartProviderProps> = ({
    children,
  }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<SelectedProduct[]>([]);
    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState<string>("");

    const notifySuccess = () => toast.success("Product added successfully!",{
      autoClose: 1000
});
    const notifyError = () => toast.error("Product already on cart!",{
      autoClose: 1000
  });

  const notifyRemove = () => toast.success("Product removed successfully!",{
    autoClose: 1000
  });


  
    useEffect(() => {
      if (user) {
        setUserId(user.id);
        const storedProduct = localStorage.getItem(`selectedProduct-${user.id}`);
        const storedCart = localStorage.getItem(`cart-${user.id}`);
    
        if (storedProduct) {
          setSelectedProduct(JSON.parse(storedProduct));
        }
    
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } else {
        setSelectedProduct(null);
        setCart([]);
        localStorage.removeItem(`cart-${userId}`);
        localStorage.removeItem(`selectedProduct-${userId}`);
      }
    }, [user, userId]);
  
    const selectProduct = (product: Product) => {
      setSelectedProduct(product);
      localStorage.setItem(`selectedProduct-${userId}`, JSON.stringify(product));
    };
  
    const addToCart = (product: SelectedProduct) => {
      setCart(prevCart => {
        const existingProductIndex = prevCart.findIndex(p => p.id === product.id);
    
        if (existingProductIndex >= 0) {
          notifyError();
          return prevCart;
        } else {
          const newCart = [...prevCart, product];
          localStorage.setItem(`cart-${userId}`, JSON.stringify(newCart));
          notifySuccess();
          return newCart;
        }
      });
    };
  
    const updateQuantity = (productId: string, quantity: number) => {
      setCart(prevCart => {
        const newCart = prevCart.map(product => 
          product.id === productId 
            ? { ...product, selectedQuantity: quantity } 
            : product
        );
        localStorage.setItem(`cart-${userId}`, JSON.stringify(newCart));
        return newCart;
      });
    };
  
    const removeFromCart = (productId: string) => {
      setCart((currentCart) => {
        const newCart = currentCart.filter((product) => product.id !== productId);
        localStorage.setItem(`cart-${userId}`, JSON.stringify(newCart));
        notifyRemove();
        return newCart;
      });
    };

    const clearCart = () => {
      setCart([]);
      localStorage.removeItem(`cart-${userId}`);
    }
  
    return (
      <CartContext.Provider
        value={{
          selectedProduct,
          selectProduct,
          addToCart,
          removeFromCart,
          cart,
          updateQuantity,
          clearCart
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };