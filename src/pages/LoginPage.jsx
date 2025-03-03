import { Button, Card, Form, Input, message } from "antd";
import { useState } from "react";
import useAuthStore from "../myStore";
import api from "../api/fetch";

function LoginPage() {
    const stateAuth = useAuthStore();
    const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="flex items-center justify-center h-screen w-full">
                <Card className="shadow-lg w-96 shadow-black">
                    <Form
                        onFinish={(values) => {
                            setLoading(true);
                            api
                                .post(
                                    "/auth/signin",
                                    values
                                )
                                .then((res) => {
                                    stateAuth.setAuth({
                                        token: res.data.token,
                                        user: res.data.user,
                                    });
                                    setLoading(false);
                                    localStorage.setItem("auth", JSON.stringify(res.data))
                                    message.success("Success");
                                });
                        }}
                    >
                        <Form.Item
                            label="Login"
                            name="username"
                            layout="vertical"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your login!",
                                },
                                {
                                    min: 3,
                                    message: "Please minimum 3 character",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            layout="vertical"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                loading={loading}
                                type="primary"
                                block
                                htmlType="submit"
                            >
                                Kirish
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
}

export default LoginPage;
