import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Collection } from '../pages/collection/Collection';
import { About } from '../pages/about/About';
import { Contact } from '../pages/contact/Contact';
import { Product } from '../pages/product/Product';
import { Cart } from '../pages/cart/Cart';
import { Login } from '../pages/login/Login';
import { PlaceOrder } from '../pages/place-order/PlaceOrder';
import { Orders } from '../pages/orders/Orders';
import { Layout } from '../components/Layout';
import { Verify } from '../pages/verify/Verify';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'collection', element: <Collection /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'product/:productId', element: <Product /> },
      { path: 'cart', element: <Cart /> },
      { path: 'login', element: <Login /> },
      { path: 'place-order', element: <PlaceOrder /> },
      { path: 'orders', element: <Orders /> },
      { path: 'verify', element: <Verify /> },
    ],
  },
]);
