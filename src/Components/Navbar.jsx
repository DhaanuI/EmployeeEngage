import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <img src="" alt="Logo" style={styles.logo} />
            </div>
            <div style={styles.appName}>
                <Link to="/" style={styles.link}>
                    Your App Name
                </Link>
            </div>
            <div style={styles.loginContainer}>
                <Link to="/login" style={styles.link}>
                    Login
                </Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
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
    },
};

export default Navbar;
