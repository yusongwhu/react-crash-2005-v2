import React from 'react'
import Modal, { setAppElement } from 'react-modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdHeight } from 'react-icons/md';

// Set app element for accessibility
Modal.setAppElement('#root');

const EditJobModal = ({isShowButton, job, fetchJobs}) => {

    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    };

    const initForm = () => {
        setTitle(job.title);
        setType(job.type);
        setLocation(job.location);
        setDescription(job.description);
        setSalary(job.salary);
        setCompanyName(job.company.name);
        setCompanyDescription(job.company.description);
        setContactEmail(job.company.contactEmail);
        setContactPhone(job.company.contactPhone);
    };
    
    const showClass = isShowButton
      ? ''
      : 'invisible';

    const [title, setTitle] = useState(job.title);
    const [type, setType] = useState(job.type);
    const [location, setLocation] = useState(job.location);
    const [description, setDescription] = useState(job.description);
    const [salary, setSalary] = useState(job.salary);
    const [companyName, setCompanyName] = useState(job.company.name);
    const [companyDescription, setCompanyDescription] = useState(
        job.company.description
    );
    const [contactEmail, setContactEmail] = useState(job.company.contactEmail);
    const [contactPhone, setContactPhone] = useState(job.company.contactPhone);

    // Update Job
    const updateJob = async (job) => {
        const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
        });
        return;
    };

    const submitForm = (e) => {
        e.preventDefault();

        setShowModal(false);

        let id = job.id;

        const updatedJob = {
                id,
                title,
                type,
                location,
                description,
                salary,
                company: {
                    name: companyName,
                    description: companyDescription,
                    contactEmail,
                    contactPhone,
                },
            };

        updateJob(updatedJob);

        toast.success('Job Updated Successfully');

        fetchJobs();
    };

    const customStyles = {
        content: {
            width: '700px', // Set the desired width
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <>
            <button
                className={`${showClass} h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm mb-4`}
                type='button'
                onClick={() => {
                    initForm();
                    setShowModal(true);
                }  
              }
              >
                Edit Job
              </button>
            <Modal isOpen={ showModal }
            onRequestClose={ closeModal }
            contentLabel="Job Details"
            style={customStyles}
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
            >
                
            <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <h2 className="text-2xl font-bold mb-1">Edit Job</h2>
                <section className='bg-indigo-50'>
                    <div className='container m-auto max-w-2xl'>
                        <div className='bg-white px-6 py-8 shadow-md rounded-md border m-4 md:m-0'>
                        <form onSubmit={submitForm}>
                            <div className='mb-1'>
                            <label
                                htmlFor='type'
                                className='block text-gray-700 font-bold mb-2'
                            >
                                Job Type
                            </label>
                            <select
                                id='type'
                                name='type'
                                className='border rounded w-full py-2 px-3'
                                required
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value='Full-Time'>Full-Time</option>
                                <option value='Part-Time'>Part-Time</option>
                                <option value='Remote'>Remote</option>
                                <option value='Internship'>Internship</option>
                            </select>
                            </div>

                            <div className='mb-1'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Job Listing Name
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='eg. Beautiful Apartment In Miami'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            </div>
                            <div className='mb-1'>
                            <label
                                htmlFor='description'
                                className='block text-gray-700 font-bold mb-2'
                            >
                                Description
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                className='border rounded w-full py-2 px-3'
                                rows='4'
                                placeholder='Add any job duties, expectations, requirements, etc'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            </div>

                            <div className='mb-1'>
                            <label
                                htmlFor='type'
                                className='block text-gray-700 font-bold mb-2'
                            >
                                Salary
                            </label>
                            <select
                                id='salary'
                                name='salary'
                                className='border rounded w-full py-2 px-3'
                                required
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            >
                                <option value='Under $50K'>Under $50K</option>
                                <option value='$50K - 60K'>$50K - $60K</option>
                                <option value='$60K - 70K'>$60K - $70K</option>
                                <option value='$70K - 80K'>$70K - $80K</option>
                                <option value='$80K - 90K'>$80K - $90K</option>
                                <option value='$90K - 100K'>$90K - $100K</option>
                                <option value='$100K - 125K'>$100K - $125K</option>
                                <option value='$125K - 150K'>$125K - $150K</option>
                                <option value='$150K - 175K'>$150K - $175K</option>
                                <option value='$175K - 200K'>$175K - $200K</option>
                                <option value='Over $200K'>Over $200K</option>
                            </select>
                            </div>

                            <div className='mb-1'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Location
                            </label>
                            <input
                                type='text'
                                id='location'
                                name='location'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Company Location'
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            </div>

                            <h3 className='text-2xl mb-5'>Company Info</h3>

                            <div className='mb-1'>
                            <label
                                htmlFor='company'
                                className='block text-gray-700 font-bold mb-2'
                            >
                                Company Name
                            </label>
                            <input
                                type='text'
                                id='company'
                                name='company'
                                className='border rounded w-full py-2 px-3'
                                placeholder='Company Name'
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            </div>

                            <div className='mb-1'>
                            <label
                                htmlFor='company_description'
                                className='block text-gray-700 font-bold mb-2'
                            >
                                Company Description
                            </label>
                            <textarea
                                id='company_description'
                                name='company_description'
                                className='border rounded w-full py-2 px-3'
                                rows='4'
                                placeholder='What does your company do?'
                                value={companyDescription}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                            ></textarea>
                            </div>

                            <div className='mb-1'>
                            <label
                                htmlFor='contact_email'
                                className='block text-gray-700 font-bold mb-2'
                            >
                                Contact Email
                            </label>
                            <input
                                type='email'
                                id='contact_email'
                                name='contact_email'
                                className='border rounded w-full py-2 px-3'
                                placeholder='Email address for applicants'
                                required
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                            />
                            </div>
                            <div className='mb-1'>
                            <label
                                htmlFor='contact_phone'
                                className='block text-gray-700 font-bold mb-2'
                            >
                                Contact Phone
                            </label>
                            <input
                                type='tel'
                                id='contact_phone'
                                name='contact_phone'
                                className='border rounded w-full py-2 px-3'
                                placeholder='Optional phone for applicants'
                                value={contactPhone}
                                onChange={(e) => setContactPhone(e.target.value)}
                            />
                            </div>

                            <div>
                            <button
                                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2'
                                type='submit'
                            >
                                Update Job
                            </button>
                            <button
                            onClick={closeModal}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Close
                        </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </section>
            </div>
            </Modal>
        </>
        
        
    )
}

export default EditJobModal
