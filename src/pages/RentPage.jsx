import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, message, Radio, Spin, Switch, Table } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

function Categories() {
    const [ijara, setIjara] = useState();
    const token = JSON.parse(localStorage.getItem("auth"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    useEffect(() => {
        axios
            .get("https://library.softly.uz/api/rents", {
                params: {
                    size: pageSize,
                    page: currentPage,
                },
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
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
                <Drawer
                    width={600}
                    destroyOnClose
                    title="Kitobxon Qo'shish"
                    closeIcon={null}
                    onClose={() => {
                        setDrawerOpen(false);
                    }}
                    open={drawerOpen}
                >
                    <Form
                        layout="vertical"
                        onFinish={(values) => {
                            axios
                                .post(
                                    "https://library.softly.uz/api/users",
                                    {
                                        ...values,
                                        phone: values.phone.toString(),
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token.token}`,
                                        },
                                    }
                                )
                                .then(() => {
                                    setDrawerOpen(false);
                                    message.success("Qo'shildi");
                                });
                        }}
                    >
                        <Form.Item
                            label="Kitobxon"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Kitob zaxirasi"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Familiya"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Telefon Raqam"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                block
                                type="primary"
                                htmlType="submit"
                                className="mt-10"
                            >
                                Yuborish
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
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
