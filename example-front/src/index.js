import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Sales from './components/Sales';
import Products from './components/Products';
import Staff from './components/Staff';
import Cards from './components/Cards';
import MainPage from './components/MainPage';
import ShowSale from './components/ShowSale';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<MainPage />}/>
        <Route path="/dashboard" element={<Landing />}/>
        <Route path="/sales" element={<Sales />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/staff" element={<Staff />}/>
        <Route path="/cards" element={<Cards />}/>
        <Route path="/sales/:id" element={<ShowSale />}/>
      </Routes >
    </BrowserRouter>
);
