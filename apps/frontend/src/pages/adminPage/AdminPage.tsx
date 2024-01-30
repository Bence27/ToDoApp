import { useEffect, useState } from 'react';
import { UserModelAdmin } from '../../models/user.model';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { AdminCard } from '../../components/AdminCard/AdminCard';
import './AdminPage.scss';

export const AdminPage = () => {
  const [usersData, setUsersData] = useState<UserModelAdmin[]>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const accessToken = state?.Token;
  const email = state?.Email;

  const navigateToLogin = () => {
    navigate('/login');
  };

  const getUsersData = async (accessToken: string) => {
    try {
      const response = await axios.get(import.meta.env.VITE_ALL, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUsersData(response.data);
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
        await getUsersData(accessToken);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div className="Container">
      <div className="container mt-3">
        <div className="row ">
          {usersData?.map((user) => (
            <div key={user.id} className="col-lg-6 mb-3 d-flex justify-content-center">
              <AdminCard user={user} email={email} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
