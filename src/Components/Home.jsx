import React from 'react';
import Homeimage from '../Images/rewardian.jpg'
import Card1 from '../Images/employee-recognition-cards.webp'
import Card2 from '../Images/report.webp'

import Navbar from "./Navbar";

const Home = () => {
    const styles = {
        container: {
            position: 'relative',
            textAlign: 'center',
        },
        imageContainer: {
            overflow: 'hidden',
            height: 'calc(100% - 50px)',
        },
        image: {
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'brightness(0.5)'
        },
        overlay: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
        },
        overlayText: {
            margin: '10px',
            fontSize: '15px',
            lineHeight: '1.5',
            textAlign: 'left'
        },
        heading: {
            fontSize: '58px',
            textAlign: 'left'
        }
    };


    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <img
                    src={Homeimage}
                    alt="Homeimage"
                    style={styles.image}
                />
            </div>
            <div style={styles.overlay}>
                <h1 style={styles.heading}>
                    Motivate Employees. Celebrate People.
                </h1>
                <p style={styles.overlayText}>
                    EmployeeEngage App is an employee recognition and rewards platform which provides organizations of all sizes with simple, customizable solutions to engage and inspire employees to perform their best.
                </p>
            </div>
        </div>
    )
}

const Cards = () => {

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
        },
        leftContent: {
            flex: 1,
            marginRight: '20px',
        },
        rightContent: {
            flex: 1,
        },
        heading: {
            fontSize: '50px',
            marginBottom: '10px',
        },
        paragraph: {
            fontSize: '16px',
            lineHeight: '1.5',
        },
        image: {
            width: '100%',
            borderRadius: '8px',
        },
    };

    return (
        <div style={{padding:'30px'}}>
            <div style={styles.container}>
                <div style={styles.leftContent}>
                    <div>
                        <p style={styles.heading}>Boost Employee Engagement</p>
                        <p style={styles.paragraph}>
                            Simplified employee recognition leads to engaged employees, happier workplaces, and productive workdays.
                        </p>
                    </div>
                </div>
                <div style={styles.rightContent}>
                    <img
                        src={Card1}
                        alt="Card1"
                        style={styles.image}
                    />
                </div>
            </div>

            <div style={styles.container}>
                <div style={styles.leftContent}>
                    <img
                        src={Card2}
                        alt="Card2"
                        style={styles.image}
                    />
                </div>

                <div style={styles.rightContent}>
                    <div>
                        <p style={styles.heading}>Simplify Rewards & Recognition</p>
                        <p style={styles.paragraph}>
                            A streamlined platform makes tracking service anniversaries, birthdays, and recognition.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};





const LandingPage = () => {
    return (
        <div>
            <Home />
            <Cards />
        </div>
    );
};


export default LandingPage;
