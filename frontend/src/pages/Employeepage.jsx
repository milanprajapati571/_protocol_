import React, { useState, useEffect } from 'react';
import Employeeheader from '../components/Employeeheader';
import { useAuthStore } from '../store/useAuthStore'; // Adjust the path as needed
import axios from 'axios';

const Employeepage = () => {
    const { authUser } = useAuthStore();
    const [activeSection, setActiveSection] = useState('info');
    const [employeeInfo, setEmployeeInfo] = useState(null);
    const [hrFeedback, setHrFeedback] = useState([]); // State to store HR feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch Employee Info (you might already have this or implement it now)
    useEffect(() => {
        const fetchEmployeeInfo = async () => {
            setLoading(true);
            setError(null);
            try {
                if (authUser?.userId) {
                    const response = await axios.get('/api/employee/info', {
                        headers: { 'X-User-ID': authUser.userId },
                    });
                    setEmployeeInfo(response.data);
                } else {
                    setError('Could not identify user.');
                }
            } catch (err) {
                setError('Failed to fetch employee information.');
                console.error('Error fetching employee info:', err);
            } finally {
                setLoading(false);
            }
        };

        if (activeSection === 'info') {
            fetchEmployeeInfo();
        }
    }, [activeSection, authUser]);

    // Fetch HR Feedback
    useEffect(() => {
        const fetchHRFeedback = async () => {
            setLoading(true);
            setError(null);
            try {
                if (authUser?.userId) {
                    const response = await axios.get('/api/employee/feedback', {
                        headers: { 'X-User-ID': authUser.userId },
                    });
                    setHrFeedback(response.data);
                } else {
                    setError('Could not identify user for feedback.');
                }
            } catch (err) {
                setError('Failed to fetch HR feedback.');
                console.error('Error fetching HR feedback:', err);
            } finally {
                setLoading(false);
            }
        };

        if (activeSection === 'feedback') {
            fetchHRFeedback();
        }
    }, [activeSection, authUser]);

    return (
        <div>
            {/* header */}
            <Employeeheader />

            {/* Body */}
            <div className="mt-16 p-4">
                <div className="flex gap-4 mb-4">
                    <button
                        className={`btn btn-primary ${activeSection === 'info' ? 'btn-active' : ''}`}
                        onClick={() => setActiveSection('info')}
                    >
                        Employee Info
                    </button>
                    <button
                        className={`btn btn-primary ${activeSection === 'feedback' ? 'btn-active' : ''}`}
                        onClick={() => setActiveSection('feedback')}
                    >
                        Feedback
                    </button>
                    <button
                        className={`btn btn-primary ${activeSection === 'peerFeedback' ? 'btn-active' : ''}`}
                        onClick={() => setActiveSection('peerFeedback')}
                    >
                        Peer Feedback
                    </button>
                </div>

                {loading && <div className="text-center py-4">Loading...</div>}
                {error && <div className="text-error text-center py-4">Error: {error}</div>}

                {activeSection === 'info' && employeeInfo && (
                    <div className="border p-4 rounded-md">
                        <h2>Employee Information</h2>
                        <p>Name: {employeeInfo.name}</p>
                        <p>Employee ID: {employeeInfo.employeeId}</p>
                        <p>Department: {employeeInfo.department}</p>
                        {/* Display other relevant employee details */}
                    </div>
                )}

                {activeSection === 'feedback' && hrFeedback.length > 0 && (
                    <div className="border p-4 rounded-md">
                        <h2>Your Feedback from HR</h2>
                        <ul>
                            {hrFeedback.map((feedback) => (
                                <li key={feedback.id} className="py-2 border-b last:border-b-0">
                                    <p className="font-semibold">Date: {new Date(feedback.created_at).toLocaleDateString()}</p>
                                    <p>{feedback.feedback_text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeSection === 'feedback' && hrFeedback.length === 0 && !loading && !error && (
                    <div className="border p-4 rounded-md">
                        <h2>Your Feedback from HR</h2>
                        <p>No feedback available from HR yet.</p>
                    </div>
                )}

                {activeSection === 'peerFeedback' && (
                    <div className="border p-4 rounded-md">
                        <h2>Give Feedback to a Peer</h2>
                        {/* UI for selecting a peer and submitting feedback will go here */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Employeepage;
// import React from 'react'
// import Employeeheader from '../components/Employeeheader'

// const Employeepage = () => {
//   return (
//     <div>      
//         {/* header */}
//         <Employeeheader/>

//         {/* now in body we will display employee info  */}
//         Employee page


//     </div>
//   )
// }

// export default Employeepage
