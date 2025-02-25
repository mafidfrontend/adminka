import React, { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

function Categories() {
    const [products, setProducts] = useState();
    useEffect(() => {
        axios
            .get("https://67458ca9512ddbd807f88427.mockapi.io/categories")
            .then((response) => {
                setProducts(response.data);
            });
    }, []);
    if (!products) {
        return <div className="flex justify-center h-full items-center w-full"><Spin indicator={<LoadingOutlined spin />} size="large" /></div>;
    }
    return (
        <div className="flex h-full w-full">
            <main className="bg-slate-200 h-full w-full p-10">
                <div className="text-2xl font-bold mb-2">Category Page</div>
                <Table
                    dataSource={products}
                    columns={[
                        {
                            title: "ID",
                            dataIndex: "id",
                        },
                        {
                            title: "Nomi",
                            dataIndex: "title",
                            render: (name) => {
                                return <div>{name.toUpperCase()}</div>;
                            },
                        },
                        {
                            title: "Rasm",
                            dataIndex: "image",
                            render: (image) => {
                                return (
                                    <img src={image} className="h-10" alt="" />
                                );
                            },
                        },
                    ]}
                />
            </main>
        </div>
    );
}

export default Categories;
