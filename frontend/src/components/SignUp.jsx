import React from 'react';
import RegistrationForm from './UI/registrationForm';

const Signup = () => (
  <div className="container-fluid vh-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm border border-primary">
          <div className="card-body row p-5 justify-content-center">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Signup;
