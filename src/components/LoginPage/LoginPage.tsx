import React from 'react';
import './loginpage.css'; // Import your specific CSS file for the LoginPage

const LoginPage: React.FC = () => {
  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="text-center">
            <img src="assets/images/sobericon.png" alt="Sober Guide Icon" style={{ width: '20vh' }} />
          </div>
          
          <div className="card bg-transparent" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-2 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <form action="/login" method="POST">
                  <div className="form-outline form-white mb-4">
                    <input 
                      type="text" 
                      id="typeEmailX" 
                      name="username" 
                      className="form-control form-control-lg" 
                      placeholder="Username" 
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input 
                      type="password" 
                      id="typePasswordX" 
                      name="password" 
                      className="form-control form-control-lg" 
                      placeholder="Password" 
                    />
                  </div>
                  <button className="btn btn-custom-green btn-lg px-5 mb-3 w-100" type="submit">
                    Login
                  </button>
                </form>
                
                <a href="pages/register/register.html" className="btn btn-custom-green btn-lg px-5 mb-3 w-100" role="button">
                  Register
                </a>
                <div>
                  <a href="pages/register/reset.html" className="text-white-50 fw-bold">Forget password?</a>
                </div>
                <div className="d-flex justify-content-center text-center mt-2 pt-1">
                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="social-link">
                      <img src="assets/images/apple.png" alt="apple" className="social-icon" />
                    </a>
                    <a href="#!" className="social-link mx-3">
                      <img src="assets/images/google.png" alt="google" className="social-icon" />
                    </a>
                    <a href="#!" className="social-link">
                      <img src="assets/images/email.png" alt="email" className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
