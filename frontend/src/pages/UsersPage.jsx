import { Table, Button, Space, Tag, Popconfirm, Typography, Input, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, KeyOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useGetUsersQuery, useDeleteUserMutation } from '../features/users/usersApi'
import AssignRolesModal from '../components/AssignRolesModal'

const { Title } = Typography

const roleColors = { ADMIN: 'red', PAYMENT: 'blue', REPORTS: 'green' }

const UsersPage = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useGetUsersQuery()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const [rolesModal, setRolesModal] = useState(null)
  const [search, setSearch] = useState('')

  const users = data?.data || []

  const filtered = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap()
      message.success('Foydalanuvchi o\'chirildi.')
    } catch (err) {
      message.error(err?.data?.message || 'O\'chirishda xatolik yuz berdi.')
    }
  }

  const columns = [
    {
      title: '№',
      key: 'index',
      width: 60,
      render: (_, __, i) => i + 1,
    },
    {
      title: 'Ism',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Familiya',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rollar',
      key: 'roles',
      render: (_, record) =>
        record.roles?.length > 0
          ? record.roles.map((r) => (
              <Tag key={r.id} color={roleColors[r.name] || 'default'}>{r.name}</Tag>
            ))
          : <Tag color="default">Rol yo'q</Tag>,
    },
    {
      title: 'Amallar',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate(`/users/${record.id}/edit`)}
          />
          <Button
            size="small"
            icon={<KeyOutlined />}
            onClick={() => setRolesModal(record)}
            title="Rollarni biriktirish"
          />
          <Popconfirm
            title="Foydalanuvchini o'chirish"
            description="Haqiqatan ham o'chirmoqchimisiz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ha"
            cancelText="Yo'q"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger icon={<DeleteOutlined />} loading={isDeleting} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <Title level={4} style={{ margin: 0 }}>Foydalanuvchilar ro'yxati</Title>
        <Space wrap>
          <Input
            placeholder="Qidirish..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 220 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/users/create')}>
            Yangi foydalanuvchi
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        scroll={{ x: 600 }}
      />

      {rolesModal && (
        <AssignRolesModal
          user={rolesModal}
          onClose={() => setRolesModal(null)}
        />
      )}
    </>
  )
}

export default UsersPage
