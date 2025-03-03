import { Button, Drawer, Form, Input, message, Radio } from "antd";
import React from "react";
import api from "../api/fetch";

function UsersDrawer({ drawerOpen, setDrawerOpen }) {
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
                    api.post("/api/users", {
                        ...values,
                        phone: values.phone.toString(),
                    }).then(() => {
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
    );
}

export default UsersDrawer;
