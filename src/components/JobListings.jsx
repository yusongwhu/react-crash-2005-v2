import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';
import AddJobModal from './AddJobModal';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchJobs();
  }, []);

  let showAddJobButton = false;

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        <AddJobModal isShowButton={isHome ? false : true} fetchJobs={fetchJobs} />
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} fetchJobs={fetchJobs} />
            ))}
          </div>
        )}
      </div>
      
    </section>
  );
};
export default JobListings;
