import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Card } from "antd"
import Input from "antd/es/input/Input"

function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <Card className="shadow-lg w-96 shadow-black">
          <Input size="large" className="mb-2" placeholder="Login" prefix={<UserOutlined />} />
          <Input size="large" className="mb-4" placeholder="Parol" prefix={<LockOutlined />} />
          <Button block type="primary" size="large" >Kirish</Button>
        </Card>
      </div>
    </>
  )
}

export default LoginPage