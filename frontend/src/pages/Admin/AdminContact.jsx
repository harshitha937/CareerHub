// pages/Admin/AdminContact.jsx
import { useEffect, useState } from 'react';
import { Table, message, Card } from 'antd';
import { getAllContacts } from '../../services/contactService';

export default function AdminContact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getAllContacts();
      console.log('Fetched contacts:', data);
      setMessages(data.contacts); // ✅ Fix: access the `contacts` key
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  fetchContacts();
}, []);



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Submitted At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div className="p-6">
      <Card title="Contact Messages">
        <Table
          dataSource={messages}
          columns={columns}
          rowKey="_id"
          loading={loading}
          bordered
        />
      </Card>
    </div>
  );
}
