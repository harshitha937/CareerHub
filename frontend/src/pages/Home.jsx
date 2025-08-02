// src/pages/Home.jsx

import { useEffect, useState } from 'react';
import jobServices from '../services/jobServices.js';
import JobCard from '../components/JobCard';
import Contact from './Contact.jsx';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobServices.getJobs().then(setJobs);
  }, []);

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section id="home" className="bg-white py-20 text-center shadow-sm">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Find Your Dream Job</h1>
        <p className="text-lg text-gray-500 mb-6">Explore opportunities that match your skills and passion.</p>
        <a href="/auth/register" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Get Started
        </a>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Latest Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length ? jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          )) : <p className="text-center text-gray-500">No jobs found.</p>}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          CareerHub is a modern job portal built to bridge the gap between job seekers and recruiters.
          We aim to provide a seamless platform for discovering career opportunities and posting jobs easily.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
        <Contact />
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} CareerHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
