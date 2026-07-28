import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";

import ProtectedRoute from "./components/ProtectedRoute";
import CategoryPage from "./pages/CategoryPage";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Login from "./pages/CustomerLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import Register from "./pages/Register";
import Account from "./pages/Account";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
        
<Routes>

  {/* Public Website */}
  <Route element={<MainLayout />}>

    <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
<Route path="/:category" element={<CategoryPage />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/wishlist" element={<Wishlist />} />

  </Route>

  {/* Authentication */}
<Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
  path="/account/register"
  element={<Register />}
/>

<Route
  path="/account"
  element={
    <ProtectedRoute>
      <Account />
    </ProtectedRoute>
  }
/>
 {/* Admin */}<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
>
    <Route index element={<Dashboard />} />
    <Route path="products" element={<Products />} />
    <Route path="orders" element={<AdminOrders />} />
</Route>
  <Route
  path="/order-success/:id"
  element={<OrderSuccess />}
/>

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

</Routes>
    
         <Toaster position="top-right" />
         </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;