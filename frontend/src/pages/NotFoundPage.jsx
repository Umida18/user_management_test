import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Kechirasiz, siz qidirayotgan sahifa topilmadi."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Bosh sahifaga
        </Button>
      }
    />
  );
};

export default NotFoundPage;
