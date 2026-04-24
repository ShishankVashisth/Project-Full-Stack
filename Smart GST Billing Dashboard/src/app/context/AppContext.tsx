import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

// ---------------- API SETUP ----------------
const API = axios.create({
  baseURL: "http://localhost:8080"
});

// ---------------- TYPES ----------------
export interface Product {
  id: number;
  name: string;
  price: number;
  gstPercent: number;
  stockQuantity: number;
}

export interface InvoiceItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  gst: number;
  total: number;
}

export interface Invoice {
  invoiceId: number;
  buyerName: string;
  buyerGst: string;
  totalAmount: number;
  items: InvoiceItem[];
}

// ---------------- CONTEXT ----------------
interface AppContextType {
  products: Product[];
  invoices: Invoice[];

  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  getProducts: () => Promise<void>;
  searchProducts: (name: string) => Promise<void>;
  getLowStock: () => Promise<void>;

  createInvoice: (data: any) => Promise<void>;
  getInvoices: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ---------------- PROVIDER ----------------
export function AppProvider({ children }: { children: ReactNode }) {

  const [products, setProducts] = useState<Product[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // ---------------- PRODUCT APIs ----------------

  const getProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    await API.post("/products", product);
    await getProducts(); // refresh
  };

  const searchProducts = async (name: string) => {
    const res = await API.get(`/products/search?name=${name}`);
    setProducts(res.data);
  };

  const getLowStock = async () => {
    const res = await API.get("/products/low-stock");
    setProducts(res.data);
  };

  // ---------------- INVOICE APIs ----------------

  const createInvoice = async (invoiceData: any) => {
    const res = await API.post("/invoices", invoiceData);
    console.log("Invoice Created:", res.data);
  };

  const getInvoices = async () => {
    const res = await API.get("/invoices");
    setInvoices(res.data);
  };

  // ---------------- LOAD DATA INITIALLY ----------------

  useEffect(() => {
    getProducts();
    getInvoices();
  }, []);

  return (
    <AppContext.Provider value={{
      products,
      invoices,
      addProduct,
      getProducts,
      searchProducts,
      getLowStock,
      createInvoice,
      getInvoices
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ---------------- HOOK ----------------
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}