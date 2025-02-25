import { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function ProductPage() {
    const [products, setProducts] = useState();
    useEffect(() => {
        axios.get("https://67458ca9512ddbd807f88427.mockapi.io/products")
            .then((response) => setProducts(response.data));
    }, []);
    if (!products) return <div className="flex justify-center h-full items-center w-full"><Spin indicator={<LoadingOutlined spin />} size="large" /></div>;

    return (
        <div className="p-6 w-full">
            <h2 className="text-2xl font-bold mb-4">Products Page</h2>
            <Table dataSource={products} columns={[
                { title: "ID", dataIndex: "id" },
                { title: "Nomi", dataIndex: "name", render: (name) => <div>{name.toUpperCase()}</div> },
                { title: "Rasm", dataIndex: "image", render: (image) => <img src={image} className="h-10" alt="" /> },
            ]} />
        </div>
    );
}
export default ProductPage;