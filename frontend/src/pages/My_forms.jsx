// src/pages/MyApplications.jsx
import { useEffect, useState } from 'react';
import applicationService from '../services/applicationServices';

const My_forms= () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationService.getMyApplications();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (applications.length === 0) return <p>No applications found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      {applications.map((app) => (
        <div key={app._id} className="border-b py-4">
          <h3 className="text-xl font-semibold">{app.job?.title}</h3>
          <p><strong>Company:</strong> {app.job?.company}</p>
          <p><strong>Location:</strong> {app.job?.location}</p>
          <p><strong>Status:</strong> Submitted</p>
          <p><strong>Resume:</strong> <a className="text-blue-600 underline" href={`http://localhost:5000/uploads/${app.resume}`} target="_blank" rel="noreferrer">View</a></p>
          {app.documents.length > 0 && (
            <div>
              <strong>Other Documents:</strong>
              <ul className="list-disc list-inside">
                {app.documents.map((doc, idx) => (
                  <li key={idx}>
                    <a className="text-blue-600 underline" href={`http://localhost:5000/uploads/${doc}`} target="_blank" rel="noreferrer">
                      {doc}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default My_forms;
