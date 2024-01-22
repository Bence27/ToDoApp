import { useState } from 'react'
import './LoginPage.scss'
import { useNavigate } from 'react-router';

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const navigateToSignUp=()=> {
        navigate("/signup");
    }

    return (
        <div className='container-fluid Container mt-5'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-6 d-flex justify-content-center'>
                    <div className="card Card">
                        <div className='card-header'>
                            <h3 className='card-title text-center'>Login</h3>
                        </div>
                        <div className='card-body'>
                            <div className='input-group mb-3'>
                                <span className="input-group-text" id="basic-addon1">@:</span>
                                <input type='email' className='form-control' placeholder="Email"/>
                            </div>
                            <div className='input-group mb-3'>
                                <span className="input-group-text" id="basic-addon1">P:</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder="Password"
                                />
                                <span className="input-group-text" id="basic-addon1">
                                    <input
                                        className="form-check-input mt-0"
                                        type="checkbox"
                                        value=""
                                        aria-label="Checkbox for following text input"
                                        onChange={handleCheckboxChange}
                                    />
                                </span>
                            </div>

                            <div className='input-group mb-3'>
                                <button type='submit' className='btn btn-outline-info w-100'> Login </button>
                            </div>

                            <div className='input-group mb-3'>
                                <p>Don't have an account? Create one!</p>
                                <button type='submit' className='btn btn-outline-success w-100' onClick={navigateToSignUp}> Sign Up </button>
                            </div>

                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
