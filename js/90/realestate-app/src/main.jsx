import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Buy from "./Buy.jsx";
import Sell from "./Sell.jsx";
import SellerAgents from "./SellerAgents.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />}>
            <Route path=":agent" element={<SellerAgents />} />
          </Route>
        </Route>
        <Route path='*' element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
