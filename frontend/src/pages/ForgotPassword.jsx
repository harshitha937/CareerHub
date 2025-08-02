import { Form, Input, Button, message } from 'antd';
import { forgotPassword } from '../services/authServices';

export default function ForgotPassword() {
  const onFinish = async (values) => {
    try {
      await forgotPassword(values);
      message.success('Reset link sent to email');
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Send Reset Link</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
