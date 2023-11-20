// ViewForms.js

import React, { useState, useEffect } from 'react';
import '../index.css';

const ViewForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/getForms');
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAccept = async (id) => {
    // Handle the logic for accepting the form
    console.log('Form accepted with id:', id);
  };

  const handleDecline = async (id) => {
    // Handle the logic for declining the form
    console.log('Form declined with id:', id);
  };

  return (
    <div className="view-form-container">
      <h1>Leave Responses</h1>
      <table className="view-form-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form._id}>
              <td>{form.empName}</td>
              <td>{form.leaveType}</td>
              <td>{form.startDate}</td>
              <td>{form.endDate}</td>
              <td>{form.reason}</td>
              <td>
                <button
                  className="view-form-accept"
                  onClick={() => handleAccept(form._id)}
                >
                  Accept
                </button>
                <button
                  className="view-form-decline"
                  onClick={() => handleDecline(form._id)}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewForms;
