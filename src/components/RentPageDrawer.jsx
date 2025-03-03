import {
    Drawer,
    Form,
    Input,
    message,
    Button,
    Select,
    Flex,
    DatePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../api/fetch";

function RentPageDrawer({ drawerOpen, setDrawerOpen }) {
    const [users, setUsers] = useState();
    const [rents, setRents] = useState();

    useEffect(() => {
        api.get("/api/users").then((res) => {
            setUsers(res.data.items);
        });
    }, []);
    useEffect(() => {
        api.get("/api/stocks").then((res) => {
            // console.log(res.data.items);
            setRents(res.data.items);
        });
    }, []);
    if (!users && !rents) {
        return <></>;
    }
    const optionsUsers = users.map((item) => {
        return {
            ...item,
            label: `${item.firstName} ${item.lastName} - ${item.phone} - ${item.passportId}`,
            value: item.id,
        };
    });
    const optionsRents = rents.map((item) => {
        return {
            ...item,
            label: item.book.name,
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
                    api.post("/api/rents", values).then(() => {
                        console.log(values);
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
                        <Select options={optionsUsers} />
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
                <Flex className="justify-between">
                    <Form.Item
                        label="Kitob zaxirasi"
                        name="stockId"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className="w-[65%]"
                    >
                        <Select options={optionsRents} />
                    </Form.Item>
                    <Form.Item
                        label="ID"
                        name="stockId"
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
                <Flex className="justify-between">
                    <Form.Item className="w-[45%]" name={"leasedAt"} >
                        <DatePicker
                            
                            format={[
                                "DD/MM/YYYY"
                            ]}
                        />
                    </Form.Item>
                    <Form.Item className="w-[45%]" name={"returningDate"}>
                        <DatePicker
                        
                            format={[
                                "DD/MM/YYYY"
                            ]}
                        />
                    </Form.Item>
                </Flex>
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
