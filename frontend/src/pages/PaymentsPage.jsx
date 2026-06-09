import { Table, Tag, Typography, Statistic, Row, Col, Card } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

import { useGetPaymentsQuery } from "../features/payments/paymentsApi";

const { Title } = Typography;

const statusColor = {
  completed: "success",
  pending: "warning",
  failed: "error",
};
const statusLabel = {
  completed: "Bajarildi",
  pending: "Kutilmoqda",
  failed: "Xato",
};

const PaymentsPage = () => {
  const { data, isLoading } = useGetPaymentsQuery();
  const payments = data?.data || [];

  const total = payments
    .filter((p) => p.status === "completed")
    .reduce((s, p) => s + p.amount, 0);

  const pending = payments.filter((p) => p.status === "pending").length;

  const columns = [
    { title: "№", key: "index", width: 60, render: (_, __, i) => i + 1 },
    { title: "Tavsif", dataIndex: "description", key: "description" },
    {
      title: "Miqdor",
      dataIndex: "amount",
      key: "amount",
      render: (v, r) => `${v.toLocaleString()} ${r.currency}`,
    },
    { title: "Sana", dataIndex: "date", key: "date" },
    {
      title: "Holati",
      dataIndex: "status",
      key: "status",
      render: (v) => <Tag color={statusColor[v]}>{statusLabel[v]}</Tag>,
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 24,
        }}
      >
        <CreditCardOutlined style={{ fontSize: 22, color: "#1677ff" }} />
        <Title level={4} style={{ margin: 0 }}>
          To'lovlar
        </Title>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Jami bajarilgan (UZS)"
              value={total}
              formatter={(v) => v.toLocaleString()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Kutilayotgan to'lovlar"
              value={pending}
              suffix="ta"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Jami to'lovlar"
              value={payments.length}
              suffix="ta"
            />
          </Card>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={payments}
        rowKey="id"
        loading={isLoading}
        pagination={false}
        scroll={{ x: 500 }}
      />
    </>
  );
};

export default PaymentsPage;
