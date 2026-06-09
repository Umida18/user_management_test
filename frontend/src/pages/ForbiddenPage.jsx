import { useNavigate } from "react-router-dom";

import { Result, Button } from "antd";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Kechirasiz, bu sahifaga kirish uchun ruxsatingiz yo'q."
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Orqaga qaytish
        </Button>
      }
    />
  );
};

export default ForbiddenPage;
