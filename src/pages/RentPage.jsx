import React, { useEffect, useState } from "react";
import { Button, Spin, Switch, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import RentPageDrawer from "../components/RentPageDrawer";
import api from "../api/fetch";

function Categories() {
    const [ijara, setIjara] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedIjara, setSelectedIjara] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const pageSize = 10;

    const fetchData = async () => {
        try {
            const ijaraRes = await api.get("/api/rents", {
                params: { size: pageSize, page: currentPage },
            })            
            setIjara(ijaraRes.data);
    
            const bookRes = await api.get("/api/books")
            setBooks(bookRes.data.items);
        } catch (error) {
            console.log(error);            
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchData()
    }, [currentPage]);


    if (isLoading) {
        return (
            <div className="flex justify-center h-full items-center w-full">
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
        );
    }

    return (
        <div className="flex h-full w-full">
            <main className="bg-slate-200 h-full w-full p-10">
                <div className="text-2xl font-bold mb-2 flex justify-between">
                    <p>Ijara Page</p>
                    <Button
                        onClick={() => setDrawerOpen(true)}
                        size="large"
                        type="primary"
                    >
                        + Qo'shish
                    </Button>
                </div>

                <RentPageDrawer
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                    selectedIjara={selectedIjara}
                />

                <Table
                    columns={[
                        {
                            key: "id",
                            title: "ID",
                            dataIndex: "id",
                            render: (text, record) => (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        setSelectedIjara(record);
                                        setDrawerOpen(true);
                                    }}
                                >
                                    {text}
                                </Button>
                            ),
                        },
                        {
                            key: "leasedAt",
                            title: "Berilgan sana",
                            dataIndex: "leasedAt",
                            render: (value) =>
                                new Date(value).toLocaleString("ru"),
                        },
                        {
                            title: "Qaytarilgan sana",
                            dataIndex: "returningDate",
                            render: (value) =>
                                new Date(value).toLocaleString("ru"),
                        },
                        {
                            title: "Qaytarilgan",
                            dataIndex: "returnedAt",
                            render: (checked) => <Switch checked={!!checked} />,
                        },
                        {
                            title: "Kutubxonachi",
                            dataIndex: "user",
                            render: (user, record) => (
                                <Button
                                    type="link"
                                    onClick={() => {
                                        setSelectedIjara(record);
                                        setDrawerOpen(true);
                                    }}
                                >
                                    {user.id}. {user.firstName}
                                </Button>
                            ),
                        },
                        {
                            title: "Kitob",
                            dataIndex: "stock",
                            render: (stock) => {
                                const foundBook = books.find(book => book.id === stock.bookId);                                
                                return <p>{foundBook ? foundBook.name : "Topilmadi"}</p>;
                            }
                        }
                    ]}
                    dataSource={ijara.items}
                    pagination={{
                        pageSize: pageSize,
                        current: currentPage,
                        total: ijara.totalCount,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />
            </main>
        </div>
    );
}

export default Categories;
