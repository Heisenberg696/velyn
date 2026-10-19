import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from './components/Loading';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import CartSideBar from './components/CartSideBar';
import CartContent from './components/CartContent';
import SectionWrapper from './components/SectionWrapper';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';


function App() {

const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>

      <Loader loading={loading}/>

      {!loading &&
        <Router>
          <ScrollToTop />
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetails  />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>

          <CartSideBar>
            <CartContent variant='sidebar' showSummary = {false}/>
          </CartSideBar>

          <WhatsAppButton />

          <SectionWrapper variant="footer">
              <Footer />
          </SectionWrapper>
        </Router>}
    </>

  )
}

export default App
