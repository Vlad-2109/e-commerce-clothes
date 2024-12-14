import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Layout } from '../components/Layout';
import { List } from '../pages/list/List';
import { Orders } from '../pages/orders/Orders';
import { Add } from '../pages/add/Add';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'add', element: <Add /> },
      { path: 'list', element: <List /> },
      { path: 'orders', element: <Orders /> },
    ],
  },
]);
