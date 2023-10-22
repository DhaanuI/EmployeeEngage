import React from 'react';

const Footer = () => {
    const styles = {
        footer: {
            padding: '30px',
            textAlign: 'center',
            backgroundColor: 'rgb(41,49,32)',
        },
        copyright: {
            fontSize: '14px',
            color: 'white',
        }
    };

    return (
        <div style={styles.footer}>
            <p style={styles.copyright}>&copy; 2023 Employee Engage. All Rights Reserved.</p>
        </div>
    );
};

export default Footer;
