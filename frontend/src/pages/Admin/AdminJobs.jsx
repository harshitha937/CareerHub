import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Upload,
  Spin,
  Card,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { getJobs, deleteJob, createJob } from '../../services/adminServices';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch {
      message.error('Could not load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      message.success('Job deleted');
      fetchJobs();
    } catch {
      message.error('Deletion failed');
    }
  };

  const handleAddJob = async (values) => {
    if (!file) {
      return message.error('Please upload an image');
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('company', values.company);
    formData.append('location', values.location);
    formData.append('description', values.description);
    formData.append('image', file);

    try {
      await createJob(formData);
      message.success('Job added');
      setIsModalVisible(false);
      form.resetFields();
      setFile(null);
      fetchJobs();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to add job');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm title="Delete job?" onConfirm={() => handleDelete(record._id)}>
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl">
        <Card
          title={
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">All Posted Jobs</span>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                Add Job
              </Button>
            </div>
          }
          className="shadow-md"
        >
          <Spin spinning={loading}>
            <Table dataSource={jobs} columns={columns} rowKey="_id" pagination={{ pageSize: 8 }} />
          </Spin>
        </Card>

        <Modal
          title="Add New Job"
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
            setFile(null);
          }}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={handleAddJob}>
            <Form.Item name="title" label="Job Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="company" label="Company" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="location" label="Location" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Image" required>
              <Upload
                beforeUpload={(file) => {
                  setFile(file);
                  return false;
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Choose Image</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminJobs;
