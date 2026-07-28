import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );
}, [cartItems]);

  // Add product to cart
  const addToCart = (product, quantity = 1, color = null, size = null) => {
    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.color === color &&
        item.size === size
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity,
          color,
          size,
        },
      ]);
    }
  };

  // Remove item
  const removeFromCart = (id, color, size) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.color === color &&
            item.size === size
          )
      )
    );
  };

  // Update quantity
  const updateQuantity = (id, color, size, quantity) => {
    if (quantity <= 0) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Cart Total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Total Items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const clearCart = () => {
  setCartItems([]);
};

  return (
   <CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    totalItems,
    clearCart,
  }}
>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}