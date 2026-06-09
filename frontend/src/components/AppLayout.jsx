import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Layout, Menu, Button, Avatar, Typography, Tag } from "antd";
import {
  UserOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { logout } from "../features/auth/authSlice";
import { useAuth } from "../hooks/useAuth";
import { useRole } from "../hooks/useRole";
import { ROLES } from "../constants/roles";

const { Sider, Content, Header } = Layout;
const { Text } = Typography;

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { hasRole } = useRole();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    hasRole(ROLES.ADMIN) && {
      key: "/users",
      icon: <TeamOutlined />,
      label: "Foydalanuvchilar",
    },
    hasRole(ROLES.PAYMENT) && {
      key: "/payments",
      icon: <CreditCardOutlined />,
      label: "To'lovlar",
    },
    hasRole(ROLES.REPORTS) && {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: "Hisobotlar",
    },
  ].filter(Boolean);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ background: "#001529" }}
      >
        <div style={{ padding: "24px 16px 16px", textAlign: "center" }}>
          <Avatar
            size={48}
            icon={<UserOutlined />}
            style={{ background: "#1677ff", marginBottom: 8 }}
          />
          <div>
            <Text
              style={{
                color: "#fff",
                display: "block",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={{ color: "#8c8c8c", fontSize: 11 }}>
              {user?.email}
            </Text>
          </div>
          <div
            style={{
              marginTop: 8,
              gap: 4,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {user?.roles?.map((role) => (
              <Tag
                key={role}
                color="blue"
                style={{ fontSize: 10, marginBottom: 2 }}
              >
                {role}
              </Tag>
            ))}
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />

        <div
          style={{
            position: "absolute",
            bottom: 16,
            width: "100%",
            padding: "0 16px",
          }}
        >
          <Button danger block icon={<LogoutOutlined />} onClick={handleLogout}>
            Chiqish
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 600, color: "#001529" }}>
            Boshqaruv paneli
          </Text>
        </Header>
        <Content
          style={{
            margin: 24,
            background: "#fff",
            borderRadius: 8,
            padding: 24,
            minHeight: 360,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
