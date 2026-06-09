import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useLoginMutation } from "../features/auth/authApi";
import { setCredentials } from "../features/auth/authSlice";
import { ROLES } from "../constants/roles";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const from = location.state?.from?.pathname || null;

  const onFinish = async (values) => {
    try {
      const res = await login(values).unwrap();
      dispatch(setCredentials({ token: res.data.token, user: res.data.user }));

      const roles = res.data.user?.roles || [];
      if (from) {
        navigate(from, { replace: true });
      } else if (roles.includes(ROLES.ADMIN)) {
        navigate("/users", { replace: true });
      } else if (roles.includes(ROLES.PAYMENT)) {
        navigate("/payments", { replace: true });
      } else if (roles.includes(ROLES.REPORTS)) {
        navigate("/reports", { replace: true });
      } else {
        navigate("/forbidden", { replace: true });
      }
    } catch {
      //error
    }
  };

  const errorMessage =
    error?.data?.message || "Tizimga kirishda xatolik yuz berdi.";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#001529",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: 12,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={3} style={{ marginBottom: 4 }}>
            Tizimga kirish
          </Title>
          <Text type="secondary">Email va parolingizni kiriting</Text>
        </div>

        {error && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email kiritilishi shart." },
              { type: "email", message: "Email noto'g'ri formatda." },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="example@gmail.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Parol"
            name="password"
            rules={[{ required: true, message: "Parol kiritilishi shart." }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Parolingiz"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isLoading}
            >
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
