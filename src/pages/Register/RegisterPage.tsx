import React, { useState } from 'react';
import { FaArrowLeft, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

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
        <div className="register-container">
            <div className="form-container">
                <button onClick={handleReturn} className="return-button">
                    <FaArrowLeft /> Return
                </button>

                <h3 className="heading">
                    Join The <span className="brand-name">Sober Guide</span>
                </h3>

                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="input"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="input"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input"
                    />
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        className="input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="input"
                    />
                    <div className="verification-container">
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Verify the Email"
                            className="input verification-input"
                        />
                        <button type="button" onClick={sendVerificationCode} className="button">
                            <FaPaperPlane /> Send
                        </button>
                    </div>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="checkbox"
                        />
                        I agree to and abide by the user agreement
                    </label>
                    <button type="submit" className="button">
                        <FaCheck /> Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;