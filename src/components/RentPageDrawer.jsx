import { Drawer, Form, Input, message, Button, Select, Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function RentPageDrawer({ drawerOpen, setDrawerOpen, ijara }) {
    const token = JSON.parse(localStorage.getItem("auth"));
    const [users, setUsers] = useState()
    useEffect(() => {
        axios.get("https://library.softly.uz/api/users").then((res) => {
            setUsers(res.data.items)
        })
    },[])
    if(!users) {
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
                    console.log(values);
                    axios
                        .post(
                            "https://library.softly.uz/api/rents",
                            ...values,
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
