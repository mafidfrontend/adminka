import { Drawer, Form, Input, message, Button, Select, Flex } from "antd";
import React, { useEffect, useState } from "react";
import api from "../api/fetch";

function RentPageDrawer({ drawerOpen, setDrawerOpen, ijara }) {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.get("/api/users").then((res) => {
            setUsers(res.data.items);
        });
    }, []);
    if (!users) {
        return <></>;
    }
    const options = users.map((item) => {
        return {
            ...item,
            label: `${item.firstName} ${item.lastName} - ${item.id}`,
            value: item.id,
        };
    });
    return (
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
                    api
                        .post("/api/rents", ...values)
                        .then(() => {
                            setDrawerOpen(false);
                            message.success("Qo'shildi");
                        });
                }}
            >
                <Flex className="justify-between">
                    <Form.Item
                        label="Kitobxon"
                        name={"userId"}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className="w-[65%]"
                    >
                        <Select options={options} />
                    </Form.Item>
                    <Form.Item
                        label="ID"
                        name={"userId"}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className="w-[30%]"
                    >
                        <Input />
                    </Form.Item>
                </Flex>
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
    );
}

export default RentPageDrawer;
