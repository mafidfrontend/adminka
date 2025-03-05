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

function RentPageDrawer({ drawerOpen, setDrawerOpen, selectedIjara }) {
    const [users, setUsers] = useState([]);
    const [rents, setRents] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        api.get("/api/users").then((res) => {
            setUsers(res.data.items);
        });
        api.get("/api/stocks").then((res) => {
            setRents(res.data.items);
        });
    }, []);

    useEffect(() => {
        if (selectedIjara) {
            form.setFieldsValue({
                userId: selectedIjara.user.id,
                stockId: selectedIjara.stockId,
                leasedAt: selectedIjara.leasedAt ? null : null,
                returningDate: selectedIjara.returningDate ? null : null,
            });
        } else {
            form.resetFields();
        }
    }, [selectedIjara, form]);

    const optionsUsers = users.map((item) => ({
        label: `${item.firstName} ${item.lastName} - ${item.phone} - ${item.passportId}`,
        value: item.id,
    }));

    const optionsRents = rents.map((item) => ({
        label: item.book.name,
        value: item.id,
    }));

    const handleSubmit = (values) => {
        if (selectedIjara) {
            api.put(`/api/rents/${selectedIjara.id}`, values).then(() => {
                message.success("Tahrirlandi");
                setDrawerOpen(false);
            });
        } else {
            api.post("/api/rents", values).then(() => {
                message.success("Qo'shildi");
                setDrawerOpen(false);
            });
        }
    };

    return (
        <Drawer
            width={600}
            destroyOnClose
            title={selectedIjara ? "Tahrirlash" : "Kitobxon Qo'shish"}
            closeIcon={null}
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
        >
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Flex className="justify-between">
                    <Form.Item
                        label="Kitobxon"
                        name="userId"
                        rules={[{ required: true }]}
                        className="w-[65%]"
                    >
                        <Select options={optionsUsers} />
                    </Form.Item>
                    <Form.Item
                        label="ID"
                        name="userId"
                        rules={[{ required: true }]}
                        className="w-[30%]"
                    >
                        <Input />
                    </Form.Item>
                </Flex>
                <Flex className="justify-between">
                    <Form.Item
                        label="Kitob zaxirasi"
                        name="stockId"
                        rules={[{ required: true }]}
                        className="w-[65%]"
                    >
                        <Select options={optionsRents} />
                    </Form.Item>
                    <Form.Item
                        label="ID"
                        name="stockId"
                        rules={[{ required: true }]}
                        className="w-[30%]"
                    >
                        <Input />
                    </Form.Item>
                </Flex>
                <Flex className="justify-between">
                    <Form.Item className="w-[45%]" name="leasedAt">
                        <DatePicker format={["DD/MM/YYYY"]} />
                    </Form.Item>
                    <Form.Item className="w-[45%]" name="returningDate">
                        <DatePicker format={["DD/MM/YYYY"]} />
                    </Form.Item>
                </Flex>
                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="mt-10"
                    >
                        {selectedIjara ? "Tahrirlash" : "Yuborish"}
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default RentPageDrawer;
