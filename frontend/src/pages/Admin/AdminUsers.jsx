import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm, Card } from 'antd';
import { getAllUsers, deleteUser } from '../../services/adminServices';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      message.error('Failed to fetch users');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success('User deleted');
      fetchUsers();
    } catch (err) {
      message.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span className={`px-2 py-1 rounded ${role === 'admin' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
          {role}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record._id)}>
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <Card
        title="All Registered Users"
        className="w-full max-w-5xl shadow-md"
        bodyStyle={{ padding: 0 }}
      >
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </div>
  );
};

export default AdminUsers;
