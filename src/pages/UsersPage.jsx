import React, { useEffect, useState } from "react";
import { Button, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import api from "../api/fetch";
import UsersDrawer from "../components/UsersDrawer";

function UsersPage() {
    const [kitobxon, setKitobxon] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    useEffect(() => {
        api.get("/api/users", {
            params: {
                size: pageSize,
                page: currentPage,
            },
        }).then((response) => {
            setKitobxon(response.data);
        });
    }, [kitobxon, currentPage]);
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
                    <p>Users Page</p>
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
                <UsersDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
                <Table
                    columns={[
                        {
                            key: "id",
                            title: "ID",
                            dataIndex: "id",
                        },
                        {
                            key: "firstName",
                            title: "Ism",
                            dataIndex: "firstName",
                        },
                        {
                            key: "lastName",
                            title: "Familiya",
                            dataIndex: "lastName",
                        },
                        {
                            key: "phone",
                            title: "Telefon",
                            dataIndex: "phone",
                        },
                        {
                            key: "extraPhone",
                            title: "Qo'shimcha Telefon",
                            dataIndex: "extraPhone",
                        },
                        {
                            key: "passportId",
                            title: "Passport",
                            dataIndex: "passportId",
                        },
                        {
                            key: "status",
                            title: "Status",
                            dataIndex: "status",
                            render: (status) => {
                                status === 1 ? (
                                    <Button>active</Button>
                                ) : (
                                    <Button>blocked</Button>
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
