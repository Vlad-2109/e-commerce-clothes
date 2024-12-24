import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { List } from '../pages/list/List';
import { Orders } from '../pages/orders/Orders';
import { Add } from '../pages/add/Add';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/add" replace /> },
      { path: 'add', element: <Add /> },
      { path: 'list', element: <List /> },
      { path: 'orders', element: <Orders /> },
    ],
  },
]);
