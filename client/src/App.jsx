import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import OfficeCleaning from './pages/Services/OfficeCleaning'
import GymCleaning from './pages/Services/GymCleaning'
import ToiletCleaning from './pages/Services/ToiletCleaning'
import WindowCleaning from './pages/Services/WindowCleaning'
import KitchenCleaning from './pages/Services/KitchenCleaning'
import MarbleTileCleaning from './pages/Services/MarbleCleaning'
import Blogs from './pages/Blogs'
import BlogDetails from './pages/BlogDetails'
import Admin from './pages/Admin'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange'
import Footer from './components/Footer'
import EndOfLease from './pages/Services/EndOfLease'

const App = () => {
  return (
    <Router>
      <div>
        <ScrollToTopOnRouteChange />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/office-cleaning" element={<OfficeCleaning />} />
          <Route path="/services/gym-cleaning" element={<GymCleaning />} />
          <Route path="/services/toilet-cleaning" element={<ToiletCleaning />} />
          <Route path="/services/window-cleaning" element={<WindowCleaning />} />
          <Route path="/services/kitchen-cleaning" element={<KitchenCleaning />} />
          <Route path="/services/marble-tile-cleaning" element={<MarbleTileCleaning />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/services/end-of-lease" element={<EndOfLease />} />
        </Routes>
        <Footer />
        <ScrollToTop />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  )
}

export default App







