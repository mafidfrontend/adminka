import React, { useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const [loginPage, setLoginPage] = useState(true);
    return (
        <div className="h-screen bg-gray-100">
            {loginPage ? (
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            ) : (
                <LoginPage />
            )}
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
            </Routes>
        </div>
    );
}

export default App;
