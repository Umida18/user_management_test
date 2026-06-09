import { Row, Col, Card, Skeleton } from "antd";

const CardSkeleton = ({ count = 4 }) => {
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: count }).map((_, index) => (
        <Col xs={24} md={12} lg={6} key={index}>
          <Card>
            <Skeleton active paragraph={{ rows: 4 }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardSkeleton;
