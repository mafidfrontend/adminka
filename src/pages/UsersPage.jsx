import React, { useEffect, useState } from "react";
import {
    Button,
    Drawer,
    Form,
    Input,
    message,
    Radio,
    Spin,
    Table,
} from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

function UsersPage() {
    const [kitobxon, setKitobxon] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const token = JSON.parse(localStorage.getItem("auth"));
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10
    useEffect(() => {
        axios
            .get("https://library.softly.uz/api/users", {
                params: {
                    size: pageSize,
                    page: currentPage,
                },
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            })
            .then((response) => {
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
                            label="Ism"
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
                        <Form.Item label="Jinsi" required={true}>
                            <Radio.Group
                                options={[
                                    {
                                        label: "Erkak",
                                        value: "male",
                                    },
                                    {
                                        label: "Ayol",
                                        value: "female",
                                    },
                                ]}
                                optionType="button"
                                buttonStyle="solid"
                                block
                            />
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
                        total: kitobxon.totalCount
                    }}
                    onChange={(pagination) => {
                        setCurrentPage(pagination.current)
                    }}
                />
            </main>
        </div>
    );
}

export default UsersPage;
