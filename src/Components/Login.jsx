import React, { useState } from 'react';
import axios from 'axios'
import './Login.css'; // Import your CSS file
import image from '../Images/login.jpg'
import { useAuth } from '../AuthContext';

// if organisation then id
// if employee then userId 

const Login = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

    const { isLoggedIn, login } = useAuth();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmployeeEmailChange = (e) => {
        setEmployeeEmail(e.target.value);
    };

    const handleEmployeeNameChange = (e) => {
        setEmployeeName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleEmployeeAction = async () => {
        try {
            if (isEmailSubmitted) {
                const response = await axios.post('http://localhost:4500/api/employee/verify-otp', {
                    name: employeeName,
                    email: employeeEmail,
                    otp,
                });
                console.log(response.data);
                login();
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isEmployee', true);
                setEmployeeEmail("")
                setEmployeeName("")
                window.location.href = '/employee/profile'
            } else {
                const response = await axios.post('http://localhost:4500/api/employee/send-otp', {
                    name: employeeName,
                    email: employeeEmail,
                });
                console.log(response.data);

                setIsEmailSubmitted(true);
            }

        } catch (error) {
            console.error(error.message);
        }
    };

    const handleOrgAction = async () => {
        try {

            const response = await axios.post('http://localhost:4500/api/organisation/login', {
                name,
                email,
                password
            });
            console.log(response.data);

            if (response.data.success) {
                alert("Login Successfull")
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isEmployee', false);
                login();
                setEmail("");
                setName("");
                setPassword("");
                window.location.href = '/organisation/profile'
            }
            else {
                alert(response.data.message)
            }


        } catch (error) {
            console.error(error.message);
        }
    };

    const styles = {
        container: {
            position: 'relative',
            textAlign: 'center',
            height: '100vh',
        },
        imageContainer: {
            overflow: 'hidden',
            height: '100%',
        },
        image: {
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'brightness(0.3)',
        },
        overlay: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
        },
        label: {
            textAlign: 'left'
        }
    };

    return (
        <div style={styles.container}>

            <div style={styles.imageContainer}>

                <img
                    src={image}
                    alt="Background"
                    style={styles.image}
                />
            </div>

            <div style={styles.overlay} className='login-container'>
                <h1>LOGIN</h1>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ width: '35%' }}>
                        <h1>Organisation</h1>
                        <br />
                        <div style={{ height: '250px' }}>
                            <div>
                                <label style={styles.label}>Name:</label>
                                <input type="text" value={name} onChange={handleNameChange} />

                                <label style={styles.label}>Email Address:</label>
                                <input type="email" value={email} onChange={handleEmailChange} />

                                <label style={styles.label}>Password:</label>
                                <input type="password" value={password} onChange={handlePasswordChange} />
                            </div>
                        </div>
                        <br />
                        <div>
                            <button onClick={handleOrgAction} style={{ marginRight: '20px' }}>
                                Login
                            </button>

                            {/* <button>
                                Login with Google
                            </button> */}
                        </div>
                    </div>

                    <div style={{ marginLeft: '100px', width: '35%' }}>
                        <h1>Employee</h1> <br />
                        <div style={{ height: '250px' }}>
                            {isEmailSubmitted ? (
                                <div>
                                    <label >Enter OTP:</label>
                                    <input type="text" value={otp} onChange={handleOtpChange} />
                                </div>
                            ) : (
                                <div>
                                    <label style={styles.label}>Name:</label>
                                    <input type="text" value={employeeName} onChange={handleEmployeeNameChange} />

                                    <label style={styles.label}>Email Address:</label>
                                    <input type="email" value={employeeEmail} onChange={handleEmployeeEmailChange} />
                                </div>
                            )}
                        </div>

                        <br />
                        <div>
                            <button onClick={handleEmployeeAction} style={{ marginRight: '20px' }}>
                                {isEmailSubmitted ? 'Login' : 'Continue'}
                            </button>

                            {/* <button>
                                Login with Google
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
