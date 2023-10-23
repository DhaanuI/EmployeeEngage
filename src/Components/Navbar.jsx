import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const Navbar = () => {
    const { isLoggedIn, isEmployee, logout } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('userId');
        localStorage.removeItem('selectedEmployeeId');
        localStorage.removeItem('isEmployee');
        localStorage.removeItem('token');

        logout()
    };


    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <Link to="/" style={styles.link}>
                    <img src="https://png.pngtree.com/png-vector/20190429/ourmid/pngtree-employee-icon-vector-illustration-in-glyph-style-for-any-purpose-png-image_998315.jpg" alt="Logo" style={styles.logo} />
                </Link>
            </div>
            {/* <div style={styles.appName}>
                <Link to="/" style={styles.link}>
                    Employee Engage
                </Link>
            </div> */}
            <div style={styles.loginContainer}>
                {/* <Link to="/pricing" style={styles.link}>
                    Pricing
                </Link> */}
                {isLoggedIn ? (
                    <div>
                        <Link to="/feedback" style={styles.link} >
                            Give Feedback
                        </Link>
                        {isEmployee == "false" ? (
                            <Link to="/organisation/profile" style={styles.link} >
                                Account
                            </Link>
                        ) : (

                            <Link to="/employee/profile" style={styles.link} >
                                Account
                            </Link>
                        )}

                        < Link to="/login" style={styles.link} onClick={handleLogout}>
                            Logout
                        </Link>
                    </div>

                ) : (
                    <Link to="/login" style={styles.link}>
                        Login
                    </Link>
                )}
            </div>
        </nav >
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 120px',
        backgroundColor: '#333',
        color: 'white',

    },
    logoContainer: {
        marginRight: '10px',
    },
    logo: {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
    },
    appName: {
        flex: 1,
        textAlign: 'center',

    },
    loginContainer: {
        marginLeft: '10px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '20px'
    },
};

export default Navbar;
