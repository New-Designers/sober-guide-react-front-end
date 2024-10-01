import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

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

    const formRef = useRef<HTMLDivElement>(null);

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

    const scrollToBottom = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [firstName, lastName, email, phoneNumber, password, confirmPassword, verificationCode]);

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundImage: 'url("/assets/images/sober.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 50px 150px 50px',
            fontFamily: '"Courier New", Courier, monospace',
            overflowY: 'auto',
            marginTop:' -50px',
        }}>
            <div ref={formRef} style={{
                width: '100%',
                maxWidth: '414px',
                padding: '2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
                <Button
                    onClick={handleReturn}
                    variant="contained"
                    color="primary"
                    startIcon={<FaArrowLeft />}
                    style={{ marginBottom: '20px' }}
                >
                    Return
                </Button>

                <h3 style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: 'white',
                    fontSize: '1.5em',
                }}>
                    Join The <span style={{ color: '#4CAF50' }}>Sober Guide</span>
                </h3>

                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {[
                        { value: firstName, setter: setFirstName, placeholder: "First Name" },
                        { value: lastName, setter: setLastName, placeholder: "Last Name" },
                        { value: email, setter: setEmail, placeholder: "Email", type: "email" },
                        { value: phoneNumber, setter: setPhoneNumber, placeholder: "Phone Number", type: "tel" },
                        { value: password, setter: setPassword, placeholder: "Password", type: "password" },
                        { value: confirmPassword, setter: setConfirmPassword, placeholder: "Confirm Password", type: "password" },
                    ].map((input, index) => (
                        <input
                            key={index}
                            type={input.type || "text"}
                            value={input.value}
                            onChange={(e) => input.setter(e.target.value)}
                            placeholder={input.placeholder}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                fontSize: '1rem',
                            }}
                        />
                    ))}
                    <div style={{
                        display: 'flex',
                        marginBottom: '10px',
                    }}>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Verify the Email"
                            style={{
                                width: '100%',
                                marginRight: '10px',
                                padding: '0.75rem',
                                borderRadius: '5px',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                fontSize: '1rem',
                            }}
                        />
                        <Button
                            onClick={sendVerificationCode}
                            variant="contained"
                            color="primary"
                            startIcon={<FaPaperPlane />}
                        >
                            Send
                        </Button>
                    </div>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        color: 'white',
                        fontSize: '0.9em',
                    }}>
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            style={{ marginRight: '10px' }}
                        />
                        I agree to and abide by the user agreement
                    </label>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<FaCheck />}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;