import React, { useState } from 'react';
import './RegistrationForm.css'; 
const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    adults: '',
    children: '',
    checkInDate: '',
    checkOutDate: '',
    additionalMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="form-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <form className="form-horizontal" onSubmit={handleSubmit}>
              <div className="header">Registration</div>
              <div className="form-content">
                <h4 className="heading">Your Details</h4>
                <div className="form-group">
                  <div className="col-sm-6">
                    <label className="control-label" htmlFor="username"><i className="fa fa-user"></i></label>
                    <input
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="control-label" htmlFor="email"><i className="fa fa-envelope-o"></i></label>
                    <input
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Other form fields go here */}
                <div className="clearfix">
                  <button type="submit" className="btn btn-default">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
