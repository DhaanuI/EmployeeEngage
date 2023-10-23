import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserAccount.css'
import { useAuth } from '../AuthContext';
import { BACKEND_URL } from '../config';

const Employee = () => {
    const { isLoggedIn, isEmployee } = useAuth();
    const [organisationSurveys, setOrganisationSurveys] = useState([]);

    // const [commentText, setCommentText] = useState('');

    const [employeeDetails, setEmployeeDetails] = useState({
        _id :'1234',
        name: 'Employee Name',
        email: 'employee@example.com',
        picture: 'path-to-picture.jpg',
        joiningDate: new Date(),
        achievements: ['Achievement 1', 'Achievement 2'],
        tasks: [],
        completedTasks: [],
    });

    const [commentTextArray, setCommentTextArray] = useState(new Array(organisationSurveys.length).fill(''));


    useEffect(() => {
        if (!isLoggedIn) {
            alert('You are not logged in. Please log in to access this page.');
            window.location.href = "/login"
            return;
        }

        if (isEmployee == "true") {

            fetchEmployeeDetails(localStorage.getItem("userId"));
        }
        else {

            fetchEmployeeDetails(localStorage.getItem("selectedEmployeeId"));
        }

    }, []);

    const fetchEmployeeDetails = async (id) => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}api/employee/${id}`
            );

            setEmployeeDetails(response.data.employee);

            fetchOrganisationSurveys(response.data.employee.organisation);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };


    const fetchOrganisationSurveys = async (id) => {
        try {
            const response = await axios.get(`${BACKEND_URL}api/organisation/${id}/survey`);

            setOrganisationSurveys(response.data.data);
        } catch (error) {
            console.error('Error fetching organisation surveys:', error);

        }
    };

    const markTaskCompleted = async (id) => {
        if (isEmployee !== 'true') {
            return alert("Only Employee can submit this request")
        }
        try {
            const response = await axios.patch(`${BACKEND_URL}api/employee/tasks/${id}/mark-complete`);

            if (response.data.success) {
                fetchEmployeeDetails(localStorage.getItem("userId"));
            } else {
                console.error('Failed to mark task as completed:', response.data.message);
            }
        } catch (error) {
            console.error('Error marking task as completed:', error);
        }
    };

    const submitComments = async (surveyId, commentText) => {

        if (!commentText) return alert("Comments cannot be empty")
        console.log(employeeDetails)
        if (isEmployee !== 'true') {
            return alert("Only Employee can submit this request")
        }

        try {
           const res=  await axios.post(`${BACKEND_URL}api/organisation/surveys/${surveyId}/comments`, {
                employeeId: employeeDetails._id,
                text: commentText,
            });
            console.log(res)
            const newArray = [...commentTextArray];
            const index = organisationSurveys.findIndex(survey => survey._id === surveyId);
            newArray[index] = '';
            setCommentTextArray(newArray);
        } catch (error) {
            console.error('Error submitting comments:', error);

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

                    <div style={{ overflowY: 'auto', height: '52vh' }}>
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
                                                <div>
                                                    <button style={{ backgroundColor: '#00acd8', color: 'white' }} onClick={() => markTaskCompleted(task._id)}>
                                                        Mark as Completed
                                                    </button>

                                                </div>
                                            )}
                                        </li>
                                    ))
                            )}
                        </ul>

                    </div>
                </div>
            </div>

            <br />

            <div style={{ border: '1px solid #e0d7d7', width: '90%', textAlign: 'center', marginLeft: '60px' }}></div>

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

            <div style={{ paddingLeft: '50px' }}>
                <h2 style={{ color: '#00acd8' }}>Organisation Surveys</h2>
                <br />

                <div style={{ overflowY: 'auto', height: '60vh' }}>
                    <ul>
                        {organisationSurveys.length === 0 ? (
                            <li>No surveys available</li>
                        ) : (
                            organisationSurveys.map((survey, index) => (
                                <li key={index}>
                                    <strong>Title:</strong> {survey.title}<br />
                                    <strong>Description:</strong> {survey.description}<br />

                                    {survey.comments && survey.comments.find(comment => comment.employee === employeeDetails._id) ? (
                                        <p>You have already submitted comments.</p>
                                    ) : (
                                        <>
                                            <div style={{ display: 'flex', gap: '20px' }}>
                                                <textarea
                                                    placeholder="Your comments..."
                                                    value={commentTextArray[index]}
                                                    onChange={(e) => {
                                                        const newArray = [...commentTextArray];
                                                        newArray[index] = e.target.value;
                                                        setCommentTextArray(newArray);
                                                    }}
                                                ></textarea>
                                                <button className='submitSurveyButton' onClick={() => submitComments(survey._id, commentTextArray[index])}>Submit</button>
                                            </div>
                                        </>
                                    )}
                                    <br /> <br />
                                </li>
                            ))
                        )}
                    </ul>
                </div>

            </div>
        </div>

    );
};

export default Employee;



