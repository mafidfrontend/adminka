import React from "react";
import { Button, Drawer, Form, message, Select } from "antd";
import api from "../api/fetch";

function AddStocksDrawer({ drawerOpen, setDrawerOpen, kitobxon }) {
    const options = kitobxon.items.map((kitob) => {
        return { ...kitob, label: kitob.book.name, value: kitob.bookId };
    });
    console.log(kitobxon);
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
                        .post("/api/stocks", values)
                        .then(() => {
                            setDrawerOpen(false);
                            message.success("Qo'shildi");
                        });
                }}
            >
                <Form.Item label="Kitob" name={"bookId"}>
                    <Select options={options} />
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

export default AddStocksDrawer;
