import { useState } from 'react'
import './LoginPage.scss'
import { useNavigate } from 'react-router';
import axios from 'axios';

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '' ,header: ''});
    const navigate = useNavigate();

    

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    

    const navigateToSignUp=()=> {
        navigate("/signup");
    }

    const navigateToUserPage = (userId: number, access_token: string) => {  
        navigate(`/user/${userId}`,{state:{Id:userId, Token:access_token}});
    }

    const handleLogin = async (e: { preventDefault: () => void; }) => {

        e.preventDefault();

        try {
            const response=await axios.post(import.meta.env.VITE_LOGIN, {
                email: email,
                password: password,
            });
            setPassword('');
            setEmail('');

            setAlert({ type: 'success', message: 'Login was successful!', header:'Success!' });
            setTimeout(() => {
                setAlert({ type: '', message: '' ,header:''});
                navigateToUserPage(response.data.id,response.data.access_token);
            }, 2000);
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
                        <div className="card Card">
                            <div className='card-header'>
                                <h3 className='card-title text-center'>Login</h3>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleLogin}>
                                    <div className='input-group mb-3'>
                                        <span className="input-group-text" id="basic-addon1">@:</span>
                                        <input type='email' value={email} className='form-control' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className='input-group mb-3'>
                                        <span className="input-group-text" id="basic-addon1">P:</span>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className='form-control'
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="input-group-text" id="basic-addon1">
                                            <input
                                                className="form-check-input mt-0"
                                                type="checkbox"
                                                value={password}
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
                                        <button type='button' className='btn btn-outline-success w-100' onClick={navigateToSignUp}> Sign Up </button>
                                    </div>
                                </form>

                                

                            </div>
                        </div>
                    </div>

            </div>
        </div>
    );
}
