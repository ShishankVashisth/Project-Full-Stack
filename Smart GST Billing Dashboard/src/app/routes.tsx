import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import Products from './pages/Products';
import { CreateInvoice } from './pages/CreateInvoice';
import { Invoices } from './pages/Invoices';
import { InvoiceView } from './pages/InvoiceView';
import { LowStock } from './pages/LowStock';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'products', Component: Products },
      { path: 'create-invoice', Component: CreateInvoice },
      { path: 'invoices', Component: Invoices },
      { path: 'invoices/:id', Component: InvoiceView },
      { path: 'low-stock', Component: LowStock },
    ],
  },
]);