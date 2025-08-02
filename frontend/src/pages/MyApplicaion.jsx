import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MyApplication = () => {
  const { id } = useParams(); // Job ID from URL

  const [formData, setFormData] = useState({
    firstName: '',
    username: '',
    mobile: '',
    address: '',
    resume: null,
    documents: []
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else if (name === 'documents') {
      setFormData((prev) => ({ ...prev, documents: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Validate required file types if needed
    if (!formData.resume || !formData.resume.name.match(/\.(pdf|doc|docx)$/i)) {
      setError('Please upload a valid resume (PDF or DOC format).');
      setLoading(false);
      return;
    }

    const payload = new FormData();
    payload.append('jobId', id);
    payload.append('firstName', formData.firstName);
    payload.append('username', formData.username);
    payload.append('mobile', formData.mobile);
    payload.append('address', formData.address);
    payload.append('resume', formData.resume);
    formData.documents.forEach((doc) => payload.append('documents', doc));

    try {
      const res = await axios.post(
        'http://localhost:5000/applications/apply',
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      setMessage('✅ Application submitted successfully!');
      setFormData({
        firstName: '',
        username: '',
        mobile: '',
        address: '',
        resume: null,
        documents: []
      });
    }catch (err) {
  if (err.response) {
    console.error('❌ Backend responded with an error:', err.response.data);
    setError(err.response.data?.message || 'Something went wrong on server.');
  } else if (err.request) {
    console.error('❌ No response received from backend:', err.request);
    setError('No response from server. Please try again later.');
  } else {
    console.error('❌ Error during request setup:', err.message);
    setError('Error setting up request.');
  }
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Apply for This Job</h2>

      {message && <p className="mb-4 text-green-600 text-center">{message}</p>}
      {error && <p className="mb-4 text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="First Name"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          placeholder="Mobile Number"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <div>
          <label className="block mb-1 font-medium">Upload Resume (PDF/DOC)</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Additional Documents (optional)</label>
          <input
            type="file"
            name="documents"
            multiple
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default MyApplication;
