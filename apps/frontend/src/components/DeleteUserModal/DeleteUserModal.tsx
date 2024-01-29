import React, { useState } from 'react';
import axios from 'axios';
import './DeleteUserModal.scss';
import { useNavigate } from 'react-router';

interface DeleteUserModalProps {
  id: number;
  onHide: () => void;
  show: boolean;
  access_token: string;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  id,
  onHide,
  show,
  access_token
}) => {
  const [alert, setAlert] = useState({ type: '', message: '', header: '' });
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate('/signup');
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.classList.contains('modal')) {
      onHide();
    }
  };

  const handleDelete = async () => {
    try {
      await axios
        .delete(import.meta.env.VITE_MEDELETE, {
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          data: {
            id: id
          }
        })
        .then(navigateToSignUp);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = 'Error Code:' + error.response?.data.statusCode;
        const errorMessage =
          error.response?.data.message && Array.isArray(error.response.data.message)
            ? error.response.data.message.join('\n')
            : error.response?.data.message;

        setAlert({ type: 'danger', message: errorMessage, header: errorCode });
      } else {
        setAlert({ type: 'danger', message: 'Something went wrong :(', header: '500' });
      }
    }
  };

  return (
    <div
      className={`modal ${show ? 'show' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
      onClick={handleOverlayClick}
    >
      {/* Bootstrap Alert */}
      {alert.type && alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert">
          <h4 className="alert-heading">{alert.header}</h4>
          {alert.message}
        </div>
      )}
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title TitleModal">Delete User</h5>
            <button type="button" className="close" onClick={onHide}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>The deletion is final and irreversible</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
