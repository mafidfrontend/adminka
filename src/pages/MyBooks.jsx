import React, { useEffect, useState } from "react";
import { Button, Spin, Table } from "antd";
import axios from "axios";
import { CloseCircleTwoTone, LoadingOutlined } from "@ant-design/icons";
import AddStocksDrawer from "../components/AddStocksDrawer";

function UsersPage() {
    const [kitobxon, setKitobxon] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const token = JSON.parse(localStorage.getItem("auth"));
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    useEffect(() => {
        axios
            .get("https://library.softly.uz/api/stocks", {
                params: {
                    size: pageSize,
                    page: currentPage,
                },
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setKitobxon(response.data);
            });
    }, [drawerOpen, currentPage]);
    if (!kitobxon) {
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
                    <p>Kitoblarim</p>
                    <Button
                        onClick={() => {
                            setDrawerOpen(true);
                        }}
                        size="large"
                        type="primary"
                    >
                        + Qo'shish
                    </Button>
                </div>
                <AddStocksDrawer
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                    kitobxon={kitobxon}
                    setKitobxon={setKitobxon}
                />
                <Table
                    columns={[
                        {
                            key: "id",
                            title: "ID",
                            dataIndex: "id",
                        },
                        {
                            key: "name",
                            title: "Kitob",
                            dataIndex: "book",
                            render: (book) => {
                                return (
                                    <p>
                                        {book.id}: {book.name}
                                    </p>
                                );
                            },
                        },
                        {
                            key: "busy",
                            title: "Bandlik",
                            dataIndex: "busy",
                            render: (busy) => {
                                return busy ? (
                                    <CloseCircleTwoTone
                                        twoToneColor={"#52c41a"}
                                    />
                                ) : (
                                    <CloseCircleTwoTone
                                        twoToneColor={"#52c41a"}
                                    />
                                );
                            },
                        },
                    ]}
                    dataSource={kitobxon.items}
                    pagination={{
                        pageSize: pageSize,
                        current: currentPage,
                        total: kitobxon.totalCount,
                    }}
                    onChange={(pagination) => {
                        setCurrentPage(pagination.current);
                    }}
                />
            </main>
        </div>
    );
}

export default UsersPage;
