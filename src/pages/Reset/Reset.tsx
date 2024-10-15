import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Reset.css';

// Define the Reset component for password reset functionality
const Reset: React.FC = () => {
    // Hook for programmatic navigation
    const navigate = useNavigate();
    
    // Ref for the form container to enable scrolling
    const formRef = useRef<HTMLDivElement>(null);
    
    // State to manage form data
    const [formData, setFormData] = useState({
        identifier: '',        // User identifier (username/email/phone)
        verificationCode: '',  // Verification code
        newPassword: '',       // New password
    });

    // Handle changes in form inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Password reset submitted', formData);
        // TODO: Implement password reset logic here
        // This would typically involve sending the data to your backend
    };

    // Function to send verification code
    const sendVerificationCode = () => {
        console.log('Verification code sent');
        // TODO: Implement send verification code logic here
        // This would typically involve sending a request to your backend to generate and send a code
    };

    // Effect to scroll to the bottom of the form when data changes
    useEffect(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [formData]);

    return (
        <div className="reset-password-container">
            <div ref={formRef} className="form-container">
                {/* Return button to go back to login page */}
                <Button
                    onClick={() => navigate('/login')}
                    variant="contained"
                    color="success"
                    startIcon={<FaArrowLeft />}
                    className="return-button"
                >
                    Return
                </Button>

                {/* Heading for the reset password form */}
                <h3 className="heading">Reset the Password</h3>

                {/* Reset password form */}
                <form onSubmit={handleSubmit} className="reset-password-form">
                    {/* Input for user identifier */}
                    <input
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder="Username/Email/Phone Number"
                        className="input"
                    />
                    
                    {/* Verification code input and send button */}
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
                    
                    {/* Input for new password */}
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Reset the password"
                        className="input"
                    />
                    
                    {/* Submit button to confirm password reset */}
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
                
                {/* Button to navigate to registration page */}
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