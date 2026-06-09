import { Tag, Typography, Card, Row, Col } from "antd";
import { BarChartOutlined } from "@ant-design/icons";

import { useGetReportsQuery } from "../features/reports/reportsApi";
import CardSkeleton from "../components/CardSkeleton";

const { Title } = Typography;

const ReportsPage = () => {
  const { data, isLoading } = useGetReportsQuery();
  const reports = data?.data || [];

  if (isLoading) {
    return <CardSkeleton count={4} />;
  }

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
        <BarChartOutlined style={{ fontSize: 22, color: "#366e1a" }} />
        <Title level={4} style={{ margin: 0 }}>
          Hisobotlar
        </Title>
      </div>

      <Row gutter={[16, 16]}>
        {reports.map((report) => (
          <Col xs={24} md={12} lg={6} key={report.id}>
            <Card title={report.title}>
              <p>
                <strong>Davr:</strong> {report.period}
              </p>

              {report.totalSales && (
                <p>
                  <strong>Jami savdo:</strong>{" "}
                  {report.totalSales.toLocaleString()}
                </p>
              )}

              {report.orders && (
                <p>
                  <strong>Buyurtmalar:</strong> {report.orders}
                </p>
              )}

              {report.activeUsers && (
                <p>
                  <strong>Faol foydalanuvchilar:</strong> {report.activeUsers}
                </p>
              )}

              {report.newUsers && (
                <p>
                  <strong>Yangi foydalanuvchilar:</strong> {report.newUsers}
                </p>
              )}

              {report.revenue && (
                <p>
                  <strong>Daromad:</strong> {report.revenue.toLocaleString()}
                </p>
              )}

              {report.expenses && (
                <p>
                  <strong>Xarajatlar:</strong>{" "}
                  {report.expenses.toLocaleString()}
                </p>
              )}

              {report.topProduct && (
                <p>
                  <strong>Top mahsulot:</strong> {report.topProduct}
                </p>
              )}

              {report.units && (
                <p>
                  <strong>Sotilgan birliklar:</strong> {report.units}
                </p>
              )}

              <Tag color={report.status === "ready" ? "green" : "orange"}>
                {report.status === "ready" ? "Tayyor" : "Jarayonda"}
              </Tag>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ReportsPage;
