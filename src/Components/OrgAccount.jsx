import { useState, useEffect } from 'react';
import axios from 'axios';
import './OrgAccount.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const EmployeeCard = ({ employee }) => {
    const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');

    const handleClick = () => {
        localStorage.setItem('selectedEmployeeId', employee._id);
    };

    const openAssignTaskModal = () => {
        setIsAssignTaskModalOpen(true);
    };

    const closeAssignTaskModal = () => {
        setIsAssignTaskModalOpen(false);
    };

    const handleAssignTask = async () => {
        const id = employee._id
        try {
            const response = await axios.post(
                `http://localhost:4500/api/employee/${id}/tasks/add-task`,
                {
                    title: taskTitle,
                    description: taskDescription,
                    deadline: taskDeadline,
                }
            );

            if (response.data.success) {
                alert('Task assigned successfully');
            } else {
                alert('Failed to assign task');
            }

            closeAssignTaskModal();
        } catch (error) {
            console.error('Error assigning task:', error);
            alert('Failed to assign task');
            closeAssignTaskModal();
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Link to={`/employee/profile`} onClick={handleClick} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="employee-card">
                    <img src={employee.picture} alt={employee.name} />
                    <h3>{employee.name}</h3>
                    <p>{employee.email}</p>
                    <p>Joining Date : {new Date(employee.joiningDate).toLocaleDateString()}</p>
                </div>
            </Link>
            <button onClick={openAssignTaskModal} style={{ marginTop: '10px' }} className='assignTask'>Assign Task</button>

            {isAssignTaskModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Assign Task</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="taskTitle">Title:</label>
                                <input
                                    type="text"
                                    id="taskTitle"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskDescription">Description:</label>
                                <textarea
                                    id="taskDescription"
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="taskDeadline">Deadline:</label>
                                <input
                                    type="date"
                                    id="taskDeadline"
                                    value={taskDeadline}
                                    onChange={(e) => setTaskDeadline(e.target.value)}
                                />
                            </div>
                            <button type="button" className='cancel' onClick={closeAssignTaskModal}>
                                Cancel
                            </button>
                            <button type="button" className='assignTask' style={{ marginLeft: '10px' }} onClick={handleAssignTask}>
                                Assign Task
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const Organisation = () => {
    const { isLoggedIn } = useAuth();

    const [organisationDetails, setOrganisationDetails] = useState({
        name: 'Your Organisation Name',
        description: 'Your Organisation Description',
        employees: [],
    });

    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [isCreateSurveyModalOpen, setIsCreateSurveyModalOpen] = useState(false);
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyDescription, setSurveyDescription] = useState('');
    // const [surveyFeedback, setSurveyFeedback] = useState('');

    const openCreateSurveyModal = () => {
        setIsCreateSurveyModalOpen(true);
    };

    const closeCreateSurveyModal = () => {
        setIsCreateSurveyModalOpen(false);
    };



    useEffect(() => {
        if (!isLoggedIn) {
            alert('You are not logged in. Please log in to access this page.');
            window.location.href = "/login"
            return;
        }
        fetchOrganisationDetails();
    }, []);

    const fetchOrganisationDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:4500/api/organisation/${localStorage.getItem("id")}`
            );
            setOrganisationDetails(response.data.organisation);
        } catch (error) {
            console.error('Error fetching organisation details:', error);
        }
    };

    const openAddEmployeeModal = () => {
        setIsAddEmployeeModalOpen(true);
    };

    const closeAddEmployeeModal = () => {
        setIsAddEmployeeModalOpen(false);
    };

    const handleAddEmployee = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4500/api/organisation/${localStorage.getItem("userId")}/add-employee`,
                {
                    name: employeeName,
                    email: employeeEmail,
                    organisation: localStorage.getItem("id")
                }
            );
            fetchOrganisationDetails();
            closeAddEmployeeModal();
        } catch (error) {
            console.error('Error adding employee:', error);
            // Handle error scenarios
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    var filteredEmployees;
    if (organisationDetails) {
        filteredEmployees = organisationDetails.employees.filter(employee =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }


    // for survey

    const handleCreateSurvey = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4500/api/organisation/${localStorage.getItem("id")}/create-survey`,
                {
                    title: surveyTitle,
                    description: surveyDescription
                }
            );
            console.log(response.data);
            closeCreateSurveyModal();
        } catch (error) {
            console.error('Error creating survey:', error);
        }
    };

    return (
        <div className='Org'>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '45px' }}>{organisationDetails.name}</h1>
                <p>{organisationDetails.description}</p>
                <button onClick={openAddEmployeeModal} className='addemployee'>Add Employee</button>
                <br /><br />
                <input
                    style={{ width: '300px' }}
                    type="text"
                    placeholder="Search Employees"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div style={{ position: 'absolute', top: '15%', right: '40px' }}>
                <button onClick={openCreateSurveyModal}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}>Create Survey</button>
            </div>


            <div className="employee-list">
                {filteredEmployees && filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee, index) => (
                        <div key={employee._id} className="employee-card-wrapper">
                            <EmployeeCard employee={employee} />
                        </div>
                    ))
                ) : (
                    <p>No matching employees found</p>
                )}
            </div>



            {isAddEmployeeModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add Employee</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="employeeName">Name:</label>
                                <input
                                    type="text"
                                    id="employeeName"
                                    value={employeeName}
                                    onChange={(e) => setEmployeeName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="employeeEmail">Email:</label>
                                <input
                                    type="email"
                                    id="employeeEmail"
                                    value={employeeEmail}
                                    onChange={(e) => setEmployeeEmail(e.target.value)}
                                />
                            </div>
                            <button type="button" style={{ marginRight: '20px' }} className='cancel' onClick={closeAddEmployeeModal}>
                                Cancel
                            </button>
                            <button type="button" className='addemployee' onClick={handleAddEmployee}>
                                Add Employee
                            </button>
                        </form>

                    </div>
                </div>
            )}

            {isCreateSurveyModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Create Survey</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="surveyTitle">Title:</label>
                                <input
                                    type="text"
                                    id="surveyTitle"
                                    value={surveyTitle}
                                    onChange={(e) => setSurveyTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surveyDescription">Description:</label>
                                <textarea
                                    id="surveyDescription"
                                    value={surveyDescription}
                                    onChange={(e) => setSurveyDescription(e.target.value)}
                                />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="surveyFeedback">What do you think about this?</label>
                                <textarea
                                    id="surveyFeedback"
                                    value={surveyFeedback}
                                    onChange={(e) => setSurveyFeedback(e.target.value)}
                                />
                            </div> */}
                            <button type="button" style={{ marginRight: '20px' }} className='cancel' onClick={closeCreateSurveyModal}>
                                Cancel
                            </button>
                            <button type="button" onClick={handleCreateSurvey}
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Create Survey
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Organisation;

