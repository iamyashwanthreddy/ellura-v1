import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

const Shop = lazy(() => import('./pages/shop/Shop'));
const Product = lazy(() => import('./pages/shop/Product'));
const Subscribe = lazy(() => import('./pages/Subscribe'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Science = lazy(() => import('./pages/Science'));
const OurStory = lazy(() => import('./pages/OurStory'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Learn = lazy(() => import('./pages/learn/Learn'));
const LearnArticle = lazy(() => import('./pages/learn/LearnArticle'));
const WhereToBuy = lazy(() => import('./pages/WhereToBuy'));
const Faq = lazy(() => import('./pages/Faq'));
const Support = lazy(() => import('./pages/Support'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const Cart = lazy(() => import('./pages/shop/Cart'));
const Checkout = lazy(() => import('./pages/shop/Checkout'));
const OrderConfirmed = lazy(() => import('./pages/shop/OrderConfirmed'));
const Account = lazy(() => import('./pages/Account'));
const Policy = lazy(() => import('./pages/policies/Policy'));
const NotFound = lazy(() => import('./pages/NotFound'));

const S = ({ children }: { children: ReactNode }) => <Suspense fallback={<div className="route-loading" aria-busy="true" />}>{children}</Suspense>;

/* Routes mirror the CSV sitemap (every row under /ellura). */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ellura" replace />} />
      <Route path="/ellura" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<S><Shop /></S>} />
        <Route path="products/:handle" element={<S><Product /></S>} />
        <Route path="subscribe" element={<S><Subscribe /></S>} />
        <Route path="how-it-works" element={<S><HowItWorks /></S>} />
        <Route path="science" element={<S><Science /></S>} />
        <Route path="our-story" element={<S><OurStory /></S>} />
        <Route path="reviews" element={<S><Reviews /></S>} />
        <Route path="learn" element={<S><Learn /></S>} />
        <Route path="learn/:slug" element={<S><LearnArticle /></S>} />
        <Route path="where-to-buy" element={<S><WhereToBuy /></S>} />
        <Route path="faq" element={<S><Faq /></S>} />
        <Route path="support" element={<S><Support /></S>} />
        <Route path="track-order" element={<S><TrackOrder /></S>} />
        <Route path="cart" element={<S><Cart /></S>} />
        <Route path="checkout" element={<S><Checkout /></S>} />
        <Route path="order-confirmed" element={<S><OrderConfirmed /></S>} />
        <Route path="account" element={<S><Account /></S>} />
        <Route path="policies/:policy" element={<S><Policy /></S>} />
        <Route path="*" element={<S><NotFound /></S>} />
      </Route>
      <Route path="*" element={<Layout />}>
        <Route path="*" element={<S><NotFound /></S>} />
      </Route>
    </Routes>
  );
}
