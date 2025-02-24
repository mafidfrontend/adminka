import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Table } from "antd";

function ProductPage({ collapsed }) {
    const [products, setProducts] = useState();
    useEffect(() => {
        axios
            .get("https://67458ca9512ddbd807f88427.mockapi.io/products")
            .then((response) => {
                setProducts(response.data);
            });
    }, []);
    if (!products) {
        return <div>loading ...</div>;
    }
    return (
        <div className="h-screen bg-gray-100">
            <div className="flex h-full">
                <Sidebar collapsed={collapsed} />
                <main className="bg-slate-200 h-full w-full">
                    <div className="text-2xl font-bold mb-2">Products Page</div>
                    <Table
                        dataSource={products}
                        columns={[
                            {
                                title: "ID",
                                dataIndex: "id",
                            },
                            {
                                title: "Nomi",
                                dataIndex: "name",
                                render: (name) => {
                                    return <div>{name.toUpperCase()}</div>;
                                },
                            },
                            {
                                title: "Rasm",
                                dataIndex: "image",
                                render: (image) => {
                                    return (
                                        <img
                                            src={image}
                                            className="h-10"
                                            alt=""
                                        />
                                    );
                                },
                            },
                        ]}
                    />
                </main>
            </div>
        </div>
    );
}

export default ProductPage;
