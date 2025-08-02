import React, { useState } from 'react';
import { Tabs } from 'antd';
import AdminUsers from '../pages/Admin/AdminUsers';
import AdminJobs from '../pages/Admin/AdminJobs';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Tabs defaultActiveKey="users" onChange={(key) => setActiveTab(key)}>
        <Tabs.TabPane tab="Manage Users" key="users">
          <AdminUsers />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Manage Jobs" key="jobs">
          <AdminJobs />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
