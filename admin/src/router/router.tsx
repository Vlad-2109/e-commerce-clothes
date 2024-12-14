import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Layout } from '../components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // { path: 'collection', element: <Collection /> },
    ],
  },
]);
