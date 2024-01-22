import { useNavigate } from "react-router-dom";
import './HomePage.scss'
import svg from '../../../public/todo.svg'

export const HomePage = () => {

    const navigate = useNavigate();

    const navigateToSignUp=()=> {
        navigate("/signup");
    }

    const navigateToLogin=()=> {
        navigate("/login");
    }


    return (
        <div className='container-fluid Container mt-5'>
            <div className='row d-flex justify-content-center'>
                    <img src={svg} className="img-thumbnail rotate"/>
            </div>

            <div className='row text-center mt-5'>
                <h1 className='welcome'>Welcome at ToDos!</h1>
            </div>

            <div className='row d-flex justify-content-center mt-5'>
                <div className='input-group mb-3 w-25 d-flex justify-content-end'>
                    <button type='submit' className='btn btn-success w-25' onClick={navigateToSignUp}> Sign Up </button>
                </div>

                <div className='input-group mb-3 w-25 d-flex justify-content-start'>
                    <button type='submit' className='btn btn-info w-25' onClick={navigateToLogin}> Login </button>
                </div>
            </div>

        </div>
    );

}
