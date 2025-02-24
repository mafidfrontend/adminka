import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ setCollapsed, collapsed }) {
    return (
        <nav className="bg-slate-800 h-16 text-white flex justify-between items-center p-2">
            <div className="flex gap-2 items-center">
                <Button
                    type="primary"
                    onClick={() => {
                        setCollapsed(!collapsed);
                    }}
                    style={{
                        marginBottom: 16,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <p>Logo</p>
            </div>
            <Link to={'/login'}>Login</Link>
        </nav>
    );
}

export default Navbar;
