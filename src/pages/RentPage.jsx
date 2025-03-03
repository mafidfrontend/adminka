import React, { useEffect, useState } from "react";
import { Button, Spin, Switch, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import RentPageDrawer from "../components/RentPageDrawer";
import api from "../api/fetch";

function Categories() {
    const [ijara, setIjara] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    useEffect(() => {
        api
            .get("/api/rents", {
                params: {
                    size: pageSize,
                    page: currentPage,
                }
            })
            .then((response) => {
                setIjara(response.data);
            });
    }, [currentPage]);
    if (!ijara) {
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
                        onClick={() => {
                            setDrawerOpen(true);
                        }}
                        size="large"
                        type="primary"
                    >
                        + Qo'shish
                    </Button>
                </div>
                <RentPageDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} ijara={ijara} />
                <Table
                    columns={[
                        {
                            key: "id",
                            title: "ID",
                            dataIndex: "id",
                        },
                        {
                            key: "leasedAt",
                            title: "berilgan sana",
                            dataIndex: "leasedAt",
                            render: (value) => {
                                return new Date(value).toLocaleString("ru");
                            },
                        },
                        {
                            title: "Qaytarilgan sana",
                            dataIndex: "returningDate",
                            render: (value) => {
                                return new Date(value).toLocaleString("ru");
                            },
                        },
                        {
                            title: "Qaytarilgan",
                            dataIndex: "returnedAt",
                            render: (checked) => {
                                return (
                                    <Switch checked={checked ? true : false} />
                                );
                            },
                        },
                        {
                            title: "Kutubxonachi",
                            dataIndex: "user",
                            render: (user) => {
                                return (
                                    <div>
                                        {user.id}. {user.firstName}
                                    </div>
                                );
                            },
                        },
                    ]}
                    dataSource={ijara.items}
                    pagination={{
                        pageSize: pageSize,
                        current: currentPage,
                        total: ijara.totalCount,
                    }}
                    onChange={(pagination) => {
                        setCurrentPage(pagination);
                    }}
                />
            </main>
        </div>
    );
}

export default Categories;
