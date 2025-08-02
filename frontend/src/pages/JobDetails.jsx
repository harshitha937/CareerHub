import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobServices from '../services/jobServices.js';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await jobServices.getJobById(id);
        setJob(data);
      } catch (err) {
        console.error('Failed to fetch job', err);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-8 space-y-6">
        {/* Job Title */}
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>

        {/* Company & Location */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
            🏢 {job.company}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
            📍 {job.location}
          </span>
        </div>

        {/* Job Image */}
        {job.image && (
          <img
            src={`http://localhost:5000/uploads/${job.image}`}
            alt={job.title}
            className="w-full max-h-[300px] object-cover rounded-md"
            onError={(e) => (e.target.src = '/default-job.png')}
          />
        )}

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        {/* CTA */}
        <div className="text-right">
          <button
            onClick={() => navigate(`/apply/${job._id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
