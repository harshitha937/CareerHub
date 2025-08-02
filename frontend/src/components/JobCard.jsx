import { Link } from 'react-router-dom';
import { Briefcase, MapPin } from 'lucide-react';

const JobCard = ({ job }) => (
  <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
    {job.image && (
      <img
        src={`http://localhost:5000/uploads/${job.image}`}
        alt={job.title}
        className="w-full h-48 object-cover"
        onError={(e) => (e.target.src = '/default-job.png')}
      />
    )}

    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h2>
      <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
        <Briefcase className="w-4 h-4" /> {job.company}
      </p>
      <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
        <MapPin className="w-4 h-4" /> {job.location}
      </p>

      {job.salary && (
        <p className="text-sm text-green-600 font-medium mb-2">💰 {job.salary}</p>
      )}

      <Link
        to={`/job/${job._id}`}
        className="inline-block mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default JobCard;
