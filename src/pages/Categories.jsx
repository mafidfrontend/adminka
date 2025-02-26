import React, { useEffect, useState } from "react";
import { Spin, Switch, Table } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

function Categories() {
    const [ijara, setIjara] = useState();
    useEffect(() => {
        axios
            .get("https://library.softly.uz/api/rents", {
                params: {
                    size: 20,
                    page: 1,
                },
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUyLCJsaWJyYXJpYW4iOnRydWUsImxpYnJhcnlJZCI6MiwibG9jYXRpb25JZCI6Miwib3duZXIiOmZhbHNlLCJtb2RlcmF0b3IiOmZhbHNlLCJleHAiOjE3NDE0MTE3NTgsImlhdCI6MTc0MDM3NDk1OH0.SN0npLh1eVuX9YZ8Q2nxQ8oPerdpwva6arXEaybc3lA",
                },
            })
            .then((response) => {
                setIjara(response.data.items);
            });
    }, []);
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
                <div className="text-2xl font-bold mb-2">Ijara Page</div>
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
                            title: 'Qaytarilgan sana',
                            dataIndex: "returningDate",
                            render: (value) => {
                                return new Date(value).toLocaleString("ru");
                            },
                        },
                        {
                            title: "Qaytarilgan",
                            dataIndex: "returnedAt",
                            render: (checked) => {
                                return <Switch checked={checked ? true : false} />
                            }
                        },
                        {
                            title: "Kutubxonachi",
                            dataIndex: "user",
                            render: (user) => {
                                return <div>{user.id}. {user.firstName}</div>
                            }
                        }
                    ]}
                    dataSource={ijara}
                />
            </main>
        </div>
    );
}

export default Categories;
