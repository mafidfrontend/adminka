import { Button } from "antd";
import useAuthStore from "../myStore";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";

function Navbar({ setCollapsed, collapsed }) {
    const stateAuth = useAuthStore();
    return (
        <nav className="flex w-full items-center gap-2 p-5 justify-between  bg-slate-800 text-white">
            <div className="flex gap-4 items-center">
                <Button type="primary" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <p className="text-lg font-semibold">Logo</p>
            </div>
            <p>
                <UserOutlined />
                Kitobxon: {stateAuth.user?.username || "User"}
            </p>
            <Button
                onClick={() => {
                    stateAuth.logout();
                }}
            >
                Ortga
            </Button>
        </nav>
    );
}
export default Navbar;
