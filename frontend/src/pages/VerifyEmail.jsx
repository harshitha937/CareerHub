import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../services/authServices';
import { message, Spin } from 'antd';

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      message.error('Invalid verification link.');
      return;
    }

    verifyEmail(token)
      .then(() => message.success('Email verified! Please log in.'))
      .catch(() => message.error('Verification failed or expired.'))
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading ? <Spin size="large" /> : <h2 className="text-lg">Redirecting or done!</h2>}
    </div>
  );
}
