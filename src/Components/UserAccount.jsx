import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserAccount.css'
import { useAuth } from '../AuthContext';

const Employee = () => {
    const { isLoggedIn, isEmployee } = useAuth();


    const [employeeDetails, setEmployeeDetails] = useState({
        name: 'Employee Name',
        email: 'employee@example.com',
        picture: 'path-to-picture.jpg',
        joiningDate: new Date(),
        achievements: ['Achievement 1', 'Achievement 2'],
        tasks: [],
        completedTasks: [],
    });

    useEffect(() => {
        if (!isLoggedIn) {
            alert('You are not logged in. Please log in to access this page.');
            window.location.href = "/login"
            return;
        }
        console.log(isEmployee)
        if (isEmployee == "true") {
            console.log("if")
            fetchEmployeeDetails(localStorage.getItem("userId"));
        }
        else {
            console.log("else")
            fetchEmployeeDetails(localStorage.getItem("selectedEmployeeId"));
        }

    }, []);

    const fetchEmployeeDetails = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:4500/api/employee/${id}`
            );
            console.log(response)
            setEmployeeDetails(response.data.employee);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    const markTaskCompleted = async (id) => {
        console.log(id)
        try {
            const response = await axios.patch(`http://localhost:4500/api/employee/tasks/${id}/mark-complete`);
            console.log(response)
            if (response.data.success) {
                fetchEmployeeDetails();
            } else {
                console.error('Failed to mark task as completed:', response.data.message);
            }
        } catch (error) {
            console.error('Error marking task as completed:', error);
        }
    };


    return (
        <div>
            <h1 style={{ fontSize: '40px', textAlign: 'center', color: '#00acd8' }}>Employee Information</h1>
            <br />

            <div className='userInfoDiv'>
                <div style={{ textAlign: 'center', width: '50%' }}>
                    <h2>{employeeDetails.name}</h2>
                    <p>{employeeDetails.email}</p>
                    <img style={{ width: '400px', height: '300px', objectFit: 'contain' }} src={employeeDetails.picture} alt={employeeDetails.name} />
                </div>
                <hr />
                <div style={{ width: '50%', paddingLeft: '20px' }}>
                    <h2 style={{ color: '#425670' }}>Pending Tasks</h2>

                    <div style={{ overflowY: 'auto', height: '60vh' }}>
                        <ul>
                            {employeeDetails.tasks.length === 0 ? (
                                <li>No pending tasks</li>
                            ) : (
                                employeeDetails.tasks
                                    .filter(task => !task.completed)
                                    .map((task, index) => (
                                        <li style={{ marginBottom: '10px' }} key={index}>
                                            <h3>{task.title}</h3>
                                            {task.description}<br />
                                            <strong>Deadline:</strong> {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}<br />
                                            {!task.completed && (
                                                <button style={{ backgroundColor: '#00acd8', color: 'white' }} onClick={() => markTaskCompleted(task._id)}>
                                                    Mark as Completed
                                                </button>
                                            )}
                                        </li>
                                    ))
                            )}
                        </ul>

                    </div>
                </div>
            </div>

            <br />

            <div style={{ border: '1px solid #e0d7d7', width: '90%', textAlign: 'center', marginLeft: '60px' }}>

            </div>
            <br />
            <div className='userInfoDiv' >
                <div style={{ width: '50%', textAlign: 'center' }}>
                    <p>Joining Date: {new Date(employeeDetails.joiningDate).toLocaleDateString()}</p>
                    <br />
                    {employeeDetails.achievements.length > 0 && (
                        <>
                            <h3>Achievements</h3>
                            <ul>
                                {employeeDetails.achievements.map((achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    {employeeDetails.achievements.length === 0 && (
                        <div>
                            <p>No Achievements/Rewards yet!</p>
                            <p>Tip: Complete your tasks before the deadline to earn rewards.</p>
                        </div>
                    )}
                </div>


                <hr />
                <div style={{ width: '50%', paddingLeft: '20px' }}>
                    <h2 style={{ color: '#00acd8' }}>Completed Tasks</h2>
                    <br />
                    <div style={{ overflowY: 'auto', height: '60vh' }}>
                        <ul>
                            {employeeDetails.tasks.filter((task) => task.completed).length === 0 ? (
                                <li>No Tasks completed yet </li>
                            ) : (
                                employeeDetails.tasks
                                    .filter((task) => task.completed)
                                    .map((task, index) => (
                                        <li style={{ marginBottom: '10px' }} key={index}>
                                            <strong>Title:</strong> {task.title}<br />
                                            <strong>Description:</strong> {task.description}<br />
                                        </li>
                                    ))
                            )}
                        </ul>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Employee;



