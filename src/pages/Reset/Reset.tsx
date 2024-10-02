import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Reset.css';

const Reset: React.FC = () => {
    const navigate = useNavigate();
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        identifier: '',
        verificationCode: '',
        newPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Password reset submitted', formData);
        // Implement password reset logic here
    };

    const sendVerificationCode = () => {
        console.log('Verification code sent');
        // Implement send verification code logic here
    };

    // Scroll function
    useEffect(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [formData]);

    return (
        <div className="reset-password-container">
            <div ref={formRef} className="form-container">
                <Button
                    onClick={() => navigate('/login')}
                    variant="contained"
                    color="success"
                    startIcon={<FaArrowLeft />}
                    className="return-button"
                >
                    Return
                </Button>

                <h3 className="heading">Reset the Password</h3>

                <form onSubmit={handleSubmit} className="reset-password-form">
                    <input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder="Username/Email/Phone Number"
                        className="input"
                    />
                    <div className="verification-container">
                        <input
                            type="text"
                            name="verificationCode"
                            value={formData.verificationCode}
                            onChange={handleChange}
                            placeholder="Verify the account"
                            className="input verification-input"
                        />
                        <Button
                            onClick={sendVerificationCode}
                            variant="contained"
                            color="success"
                            startIcon={<FaPaperPlane />}
                        >
                            Send
                        </Button>
                    </div>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Reset the password"
                        className="input"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        startIcon={<FaCheck />}
                        className="button"
                    >
                        Confirm
                    </Button>
                </form>
                <Button
                    onClick={() => navigate('/register')}
                    variant="text"
                    color="success"
                    fullWidth
                    className="create-account-button"
                >
                    Create a new account
                </Button>
            </div>
        </div>
    );
};

export default Reset;