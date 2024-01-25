import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { UserModel } from '../../models/user.model';
import svg from '../../../public/defaultppicture.svg'
import './UserPage.scss'

export const UserPage = () => {
  const { state } = useLocation();
  const accessToken = state?.Token;
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserModel>();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const getUserData = async (accessToken:string) => {
    try {
      const response = await axios.get(import.meta.env.VITE_ME, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      setUserData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data', error);
      navigateToLogin();
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(accessToken);
        console.log('User data:', userData);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, [accessToken]); 

  return (
    <div className='Container'>
        <div className='container-fluid Container mt-5'>
                <div className='row d-flex justify-content-center'>
                        <div className="card Card">
                            <div className='card-header'>
                                <h3 className='card-title text-center'>{userData?.username}</h3>
                            </div>
                            <img src={svg} alt=""  className='card-img-top'/>
                            <div className='card-body'>
                                <p className='card-text text-center'>Email: {userData?.email}</p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">An item</li>
                                    <li className="list-group-item">A second item</li>
                                    <li className="list-group-item">A third item</li>
                                </ul>
                                

                            </div>
                        </div>
                    </div>

            </div>

    </div>
  );
};