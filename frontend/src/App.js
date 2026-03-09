import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/AuthPage/LoginPage/Login';
import HomePage from './components/Homepage/HomePage';
import Register from './components/AuthPage/RegisterPage/Register';
import CategoryPage from './components/Sections/CategoryPage/CategoryPage';
import Cartstate from './context/addToCart/cartstate';
import TrailRoomState from './context/trailRoom/trailRoomState';
import WishlistState from './context/addtoWishlist/wishlistState';
import Cart from './components/Sections/CartItems/Cart';
import Detailspage from './components/Sections/DetailsPage/Detailspage';
import VirtualTrailRoom from './components/Sections/VirtualRoom/VirtualTrailRoom';
import WishList from './components/Sections/WishList/WishList';
import Addproduct from './components/AddProducts/Addproduct';
import ProductManagement from './components/Admin/ProductManagement';
import Checkout from './components/checkout/Checkout';
import OrderSuccess from './components/checkout/OrderSuccess';
import OrderHistory from './components/OrderHistory/OrderHistory';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/features/ScrollToTop';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App bg-[#F8FAFC]">
      <Toaster position="bottom-right" reverseOrder={false} />
      <Cartstate>
        <TrailRoomState>
          <WishlistState>
            <BrowserRouter>
              <ScrollToTop />
              <Navbar />
              <div className="min-h-[80vh] pt-20 pb-10">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/category/:categoryName" element={<CategoryPage />} />
                  <Route path="/addToCart" element={<Cart />} />
                  <Route path="/productDetails/:id" element={<Detailspage />} />
                  <Route path="/virtual-trail-room" element={<VirtualTrailRoom />} />
                  <Route path="/wishlists" element={<WishList />} />
                  <Route path="/addProduct" element={<Addproduct />} />
                  <Route path="/manage-products" element={<ProductManagement />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success/:id" element={<OrderSuccess />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                </Routes>
              </div>
              <Footer />
            </BrowserRouter>
          </WishlistState>
        </TrailRoomState>
      </Cartstate>
    </div>
  );
}

export default App;
