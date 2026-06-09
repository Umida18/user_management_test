import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Alert,
  Spin,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from "../features/users/usersApi";

const { Title } = Typography;

const UserFormPage = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: userData, isLoading: isLoadingUser } = useGetUserByIdQuery(id, {
    skip: !isEdit,
  });
  const [createUser, { isLoading: isCreating, error: createError }] =
    useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserMutation();

  const error = createError || updateError;
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (userData?.data) {
      const u = userData.data;
      form.setFieldsValue({
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
      });
    }
  }, [userData, form]);

  const onFinish = async (values) => {
    try {
      const payload = { ...values };
      if (isEdit && !payload.password) delete payload.password;

      if (isEdit) {
        await updateUser({ id: Number(id), ...payload }).unwrap();
        message.success("Foydalanuvchi yangilandi.");
      } else {
        await createUser(payload).unwrap();
        message.success("Foydalanuvchi yaratildi.");
      }
      navigate("/users");
    } catch {
      message.error("Xatolik yuz berdi.");
    }
  };

  const errorMessage = error?.data?.message || "Xatolik yuz berdi.";

  if (isEdit && isLoadingUser) {
    return (
      <div style={{ textAlign: "center", padding: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/users")}
        style={{ marginBottom: 20 }}
      >
        Orqaga
      </Button>

      <Title level={4} style={{ marginBottom: 24 }}>
        {isEdit ? "Foydalanuvchini tahrirlash" : "Yangi foydalanuvchi yaratish"}
      </Title>

      {error && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Ism"
              name="firstName"
              rules={[
                { required: true, message: "Ism kiritilishi shart." },
                {
                  min: 2,
                  max: 50,
                  message: "Ism 2 dan 50 gacha belgidan iborat bo'lishi kerak.",
                },
                {
                  pattern: /^[a-zA-ZÀ-ÿа-яА-ЯёЁ]+$/,
                  message: "Ism faqat harflardan iborat bo'lishi kerak.",
                },
              ]}
            >
              <Input placeholder="Ismingiz" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Familiya"
              name="lastName"
              rules={[
                { required: true, message: "Familiya kiritilishi shart." },
                {
                  min: 2,
                  max: 50,
                  message:
                    "Familiya 2 dan 50 gacha belgidan iborat bo'lishi kerak.",
                },
                {
                  pattern: /^[a-zA-ZÀ-ÿа-яА-ЯёЁ]+$/,
                  message: "Familiya faqat harflardan iborat bo'lishi kerak.",
                },
              ]}
            >
              <Input placeholder="Familiyangiz" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email kiritilishi shart." },
                {
                  type: "email",
                  message:
                    "Email noto'g'ri formatda. Masalan: example@gmail.com",
                },
              ]}
            >
              <Input placeholder="example@gmail.com" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={isEdit ? "Yangi parol (ixtiyoriy)" : "Parol"}
              name="password"
              rules={
                isEdit
                  ? [
                      {
                        validator: (_, value) => {
                          if (!value) return Promise.resolve();
                          if (value.length < 8)
                            return Promise.reject(
                              "Parol kamida 8 ta belgidan iborat bo'lishi kerak.",
                            );
                          if (!/[A-Z]/.test(value))
                            return Promise.reject(
                              "Parolda kamida 1 ta katta harf (A-Z) bo'lishi kerak.",
                            );
                          if (!/[!#.@$%^&*]/.test(value))
                            return Promise.reject(
                              "Parolda kamida 1 ta maxsus belgi bo'lishi kerak.",
                            );
                          return Promise.resolve();
                        },
                      },
                    ]
                  : [
                      { required: true, message: "Parol kiritilishi shart." },
                      {
                        min: 8,
                        message:
                          "Parol kamida 8 belgidan iborat bo'lishi kerak.",
                      },
                      {
                        pattern: /[A-Z]/,
                        message:
                          "Parolda kamida 1 ta katta harf (A-Z) bo'lishi kerak.",
                      },
                      {
                        pattern: /[!#.@$%^&*]/,
                        message:
                          "Parolda kamida 1 ta maxsus belgi (!, #, ., ..) bo'lishi kerak.",
                      },
                    ]
              }
            >
              <Input.Password
                placeholder={
                  isEdit ? "O'zgartirmaslik uchun bo'sh qoldiring" : "Parol"
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item style={{ marginTop: 8 }}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {isEdit ? "Saqlash" : "Yaratish"}
              </Button>
              <Button
                style={{ marginLeft: 12 }}
                onClick={() => navigate("/users")}
              >
                Bekor qilish
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserFormPage;
