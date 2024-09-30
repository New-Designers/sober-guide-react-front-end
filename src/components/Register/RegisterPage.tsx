import React, { useState } from 'react';
import { FaArrowLeft, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registration submitted');
    };

    const sendVerificationCode = () => {
        console.log('Verification code sent');
    };

    const handleReturn = () => {
        navigate('/login');
    };

    return (
        <div className="map-container" style={styles.container}>
            <div style={styles.formContainer}>
                <button onClick={handleReturn} style={styles.returnButton}>
                    <FaArrowLeft /> Return
                </button>

                <h3 style={styles.heading}>
                    Join The <span style={styles.brandName}>Sober Guide</span>
                </h3>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        style={styles.input}
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        style={styles.input}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        style={styles.input}
                    />
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        style={styles.input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        style={styles.input}
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        style={styles.input}
                    />
                    <div style={styles.verificationContainer}>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Verify the Email"
                            style={{ ...styles.input, flex: 1, marginRight: '10px' }}
                        />
                        <button type="button" onClick={sendVerificationCode} style={styles.button}>
                            <FaPaperPlane /> Send
                        </button>
                    </div>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            style={styles.checkbox}
                        />
                        I agree to and abide by the user agreement
                    </label>
                    <button type="submit" style={styles.button}>
                        <FaCheck /> Create
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundImage: "url('assets/images/sober.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '150px',
    },
    formContainer: {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    returnButton: {
        display: 'inline-block',
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        marginBottom: '20px',
        cursor: 'pointer',
        fontSize: '1em',
    },
    heading: {
        textAlign: 'center' as const,
        marginBottom: '20px',
        color: 'white',
        fontSize: '1.5em',
    },
    brandName: {
        color: '#4CAF50',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        fontSize: '1em',
    },
    verificationContainer: {
        display: 'flex',
        marginBottom: '10px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        color: 'white',
        fontSize: '0.9em',
    },
    checkbox: {
        marginRight: '10px',
    },
};

export default RegisterPage;