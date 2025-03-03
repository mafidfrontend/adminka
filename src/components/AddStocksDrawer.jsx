import React from "react";
import { Button, Drawer, Form, message, Select } from "antd";
import axios from "axios";

function AddStocksDrawer({ drawerOpen, setDrawerOpen, kitobxon }) {
    const token = JSON.parse(localStorage.getItem("auth"));
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
                    axios
                        .post("https://library.softly.uz/api/stocks", values, {
                            headers: {
                                Authorization: `Bearer ${token.token}`,
                            },
                        })
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
