import { UserModelAdmin } from '../../models/user.model';
import React, { useState } from 'react';
import svg from '../../../src/images/defaultppicture.svg';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { DeleteUserModal } from '../DeleteUserModal/DeleteUserModal';

interface AdminCardsProps {
  user: UserModelAdmin;
  email: string;
}

export const AdminCard: React.FC<AdminCardsProps> = ({ user, email }) => {
  const navigate = useNavigate();

  const navigateToUserPage = async (userId: number) => {
    const access_token_selectedUser = await getAccessToken(user.email);
    navigate(`/user/${userId}`, { state: { Token: access_token_selectedUser } });
  };

  const getAccessToken = async (email: string) => {
    try {
      const response = await axios.post(import.meta.env.VITE_ADMINACCESS, {
        email: email
      });
      setUserAccessToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Unknown error during adminaccess', error);
    }
  };

  const [userAccessToken, setUserAccessToken] = useState(getAccessToken(user.email));

  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  const handleDeleteProfileClick = () => {
    console.log(svg);
    setShowDeleteProfileModal(true);
  };

  const handleCloseDeleteProfileModal = () => {
    setShowDeleteProfileModal(false);
  };

  return (
    <div className="card">
      <img
        src={user.image && typeof user.image === 'string' && user.image !== '' ? user.image : svg}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title Card-title text-center">
          Username: {user.username} {user.email == email ? '(You)' : ''}
        </h5>
        <p className="card-text Card-text">Emal: {user.email}</p>
        <p className="card-text Card-text">Role: {user.isadmin ? 'admin' : 'user'}</p>
        <hr />
        <div className="d-flex justify-content-around">
          <button className="btn btn-danger" onClick={handleDeleteProfileClick}>
            Delete User
          </button>

          <button className="btn btn-primary" onClick={() => navigateToUserPage(user.id)}>
            Edit User
          </button>
        </div>
      </div>
      <DeleteUserModal
        id={user.id || -1}
        onHide={handleCloseDeleteProfileModal}
        show={showDeleteProfileModal}
        access_token={userAccessToken}
        admin={true}
      />
    </div>
  );
};
