import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Categories from "./pages/RentPage";
import LoginPage from "./pages/LoginPage";
import useAuthStore from "./myStore";
import UsersPage from "./pages/UsersPage";
import MyBooks from "./pages/MyBooks";

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const stateAuth = useAuthStore();

    return (
        <>
            {stateAuth.token ? (
                <div className="flex h-screen bg-gray-100">
                    <div className="flex flex-col w-screen">
                        <Navbar
                            collapsed={collapsed}
                            setCollapsed={setCollapsed}
                        />
                        <main className="flex h-full shadow-md rounded-lg">
                            <Sidebar collapsed={collapsed} />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/products"
                                    element={<ProductPage />}
                                />
                                <Route
                                    path="/categories"
                                    element={<Categories />}
                                />
                                <Route path="/users" element={<UsersPage />} />
                                <Route path="/mybooks" element={<MyBooks />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            ) : (
                <LoginPage />
            )}
        </>
    );
}

export default App;
