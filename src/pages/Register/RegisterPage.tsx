import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './RegisterPage.css';

// Define the RegisterPage component
const RegisterPage: React.FC = () => {
    // Hook for programmatic navigation
    const navigate = useNavigate();
    
    // Ref for the form container to enable scrolling
    const formRef = useRef<HTMLDivElement>(null);
    
    // State to manage form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
        agreeTerms: false
    });

    // Handle changes in form inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registration submitted', formData);
        // Here you would typically send the data to your backend
    };

    // Function to send verification code
    const sendVerificationCode = () => {
        console.log('Verification code sent');
        // Here you would typically implement the logic to send a verification code
    };

    // Effect to scroll to the bottom of the form when data changes
    useEffect(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [formData]);

    return (
        <div className="register-container">
            <div ref={formRef} className="form-container">
                {/* Return button */}
                <Button
                    onClick={() => navigate('/login')}
                    variant="contained"
                    color="success"
                    startIcon={<FaArrowLeft />}
                    className="return-button"
                >
                    Return
                </Button>

                {/* Heading */}
                <h3 className="heading">
                    Join The <span className="brand-name">Sober Guide</span>
                </h3>

                {/* Registration form */}
                <form onSubmit={handleSubmit} className="register-form">
                    {/* Map through input fields */}
                    {[
                        { name: 'firstName', placeholder: "First Name" },
                        { name: 'lastName', placeholder: "Last Name" },
                        { name: 'email', placeholder: "Email", type: "email" },
                        { name: 'phoneNumber', placeholder: "Phone Number", type: "tel" },
                        { name: 'password', placeholder: "Password", type: "password" },
                        { name: 'confirmPassword', placeholder: "Confirm Password", type: "password" },
                    ].map((input) => (
                        <input
                            key={input.name}
                            type={input.type || "text"}
                            name={input.name}
                            value={formData[input.name as keyof typeof formData] as string}
                            onChange={handleChange}
                            placeholder={input.placeholder}
                            className="input"
                        />
                    ))}

                    {/* Verification code input and send button */}
                    <div className="verification-container">
                        <input
                            type="text"
                            name="verificationCode"
                            value={formData.verificationCode}
                            onChange={handleChange}
                            placeholder="Verify the Email"
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

                    {/* Terms agreement checkbox */}
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="checkbox"
                        />
                        I agree to and abide by the user agreement
                    </label>

                    {/* Submit button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        startIcon={<FaCheck />}
                        className="button"
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;