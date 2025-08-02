import { useEffect, useState } from 'react';
import { getProfile } from '../services/authServices';
import { Card, Spin, message, Avatar, Tag } from 'antd';
import { UserOutlined, MailOutlined, CrownOutlined } from '@ant-design/icons';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then((res) => setUser(res.data))
      .catch(() => message.error('Failed to fetch profile'));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      {!user ? (
        <Spin size="large" />
      ) : (
        <Card
          title={
            <div className="flex items-center gap-4">
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <Tag color={user.isAdmin ? 'gold' : 'blue'}>
                  {user.isAdmin ? (
                    <>
                      <CrownOutlined /> Admin
                    </>
                  ) : (
                    'User'
                  )}
                </Tag>
              </div>
            </div>
          }
          className="w-full max-w-md shadow-2xl rounded-lg"
        >
          <div className="space-y-3 text-gray-700 text-sm">
            <p>
              <MailOutlined className="mr-2 text-blue-500" />
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <UserOutlined className="mr-2 text-blue-500" />
              <strong>Username:</strong> {user.username}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
