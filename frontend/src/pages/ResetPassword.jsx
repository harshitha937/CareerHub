import { Form, Input, Button, message } from 'antd'; 
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../services/authServices';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // ✅ Get token from URL

  const onFinish = async (values) => {
    console.log("Reset password request", {
    token,
    email: values.email,
    newPassword: values.newPassword,
  });
    try {
await resetPassword(token, values.newPassword);
// ✅ Include token
      message.success("Password changed successfully");
      navigate("/auth/login");
    } catch (err) {
       console.error("Reset error", err?.response?.data || err.message);
      message.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="newPassword" label="New Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
