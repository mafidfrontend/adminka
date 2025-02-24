import React, { useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";

function App() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="h-screen bg-gray-100">
            <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Routes>
                <Route path="/" element={<HomePage collapsed={collapsed} />} />
                <Route
                    path="/products"
                    element={<ProductPage collapsed={collapsed} />}
                />
                <Route
                    path="/categories"
                    element={<Categories collapsed={collapsed} />}
                />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
