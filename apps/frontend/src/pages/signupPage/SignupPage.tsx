import { useState } from 'react';
import './signupPage.scss'
import { useNavigate } from 'react-router';
import axios from 'axios';

export const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '' ,header: ''});

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();

    const navigateToLogin=()=> {
        navigate("/login");
    }

    const handleSignUp = async (e: { preventDefault: () => void; }) => {

        e.preventDefault();

        try {
             await axios.post(import.meta.env.VITE_SIGNUP, {
                username: username,
                email: email,
                password: password,
            });
            setUsername('');
            setPassword('');
            setEmail('');

            setAlert({ type: 'success', message: 'Sign up was successful!', header:'Success!' });
            setTimeout(() => {
                setAlert({ type: '', message: '' ,header:''});
                navigateToLogin();
            }, 5000);
        } catch (error) {
            
            if (axios.isAxiosError(error)) {
                const errorCode='Error Code:'+error.response?.data.statusCode;
                const errorMessage =
                    error.response?.data.message && Array.isArray(error.response.data.message)
                        ? error.response.data.message.join('\n')
                        : error.response?.data.message;

                setAlert({ type: 'danger', message:errorMessage ,header:errorCode});

            } else {
                console.error('Unknown error during sign up', error);
            }
        }
    };

    return (
    <div className='Container'>
        {/* Bootstrap Alert */}
        {alert.type && alert.message && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    <h4 className='alert-heading'>{alert.header}</h4>
                    {alert.message}
                </div>
            )}
        <div className='container-fluid Container mt-5'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-6 d-flex justify-content-center'>
                    <div className="card Card">
                        <div className='card-header'>
                            <h3 className='card-title text-center'>Sign up</h3>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSignUp}>
                                <div className='input-group mb-3 mt-3'>
                                    <span className="input-group-text" id="basic-addon1">U:</span>
                                    <input type='text' value={username} className='form-control' placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                            
                                <div className='input-group mb-3'>
                                    <span className="input-group-text" id="basic-addon1">@:</span>
                                    <input type='email' value={email} className='form-control' placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
                                </div>
                                <div className='input-group mb-3'>
                                    <span className="input-group-text" id="basic-addon1" >P:</span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className='form-control'
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
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
                                    <button type='submit' className='btn btn-outline-success w-100'> Sign Up </button>
                                </div>

                                <div className='input-group mb-3'>
                                    <p>Do you have an account?</p>
                                    <button type='button' className='btn btn-outline-info w-100' onClick={navigateToLogin}> Login </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};
