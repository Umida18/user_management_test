import { Modal, Select, Form, Button, message, Alert } from "antd";
import { useGetRolesQuery } from "../features/roles/rolesApi";
import { useAssignRolesMutation } from "../features/users/usersApi";
import { ROLES } from "../constants/roles";

const AssignRolesModal = ({ user, onClose }) => {
  const [form] = Form.useForm();
  const { data: rolesData } = useGetRolesQuery();
  const [assignRoles, { isLoading, error }] = useAssignRolesMutation();

  const allRoles = (rolesData?.data || []).filter(
    (r) => r.name !== ROLES.ADMIN,
  );

  const initialRoleIds = user.roles
    ?.filter((r) => r.name !== ROLES.ADMIN)
    .map((r) => r.id);

  const onFinish = async ({ roleIds }) => {
    try {
      await assignRoles({ id: user.id, roleIds }).unwrap();
      message.success("Rollar muvaffaqiyatli biriktirildi.");
      onClose();
    } catch {
      message.error("Rollarni biriktirishda xatolik yuz berdi.");
    }
  };

  return (
    <Modal
      open
      title={`Rollarni biriktirish — ${user.firstName} ${user.lastName}`}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      {error && (
        <Alert
          message={error?.data?.message || "Xatolik yuz berdi."}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ roleIds: initialRoleIds }}
      >
        <Form.Item
          label="Rollar"
          name="roleIds"
          rules={[
            { required: true, message: "Kamida bitta rol tanlanishi kerak." },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Rollarni tanlang"
            options={allRoles.map((r) => ({ label: r.name, value: r.id }))}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Bekor qilish
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignRolesModal;
