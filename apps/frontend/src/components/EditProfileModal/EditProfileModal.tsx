import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import svg from '../../../public/defaultppicture.svg';
import './EdipProfileModal.scss';

interface EditProfileModalProps {
  username: string;
  email: string;
  show: boolean;
  onHide: () => void;
  access_token: string;
  image: string;
  id: number;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  username,
  email,
  image,
  show,
  onHide,
  access_token,
  id
}) => {
  const [previewImage, setPreviewImage] = useState<string>();
  const [localEmail, setLocalEmail] = useState<string>('');
  const [localUsername, setLocalUsername] = useState<string>('');
  const [alert, setAlert] = useState({ type: '', message: '', header: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setLocalEmail(email);
    setLocalUsername(username);
    setPreviewImage(image);
  }, [email, username, image]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (files.length > 0) {
      console.log(files);
      const data = new FileReader();
      data.addEventListener('load', () => {
        setPreviewImage(data.result!.toString());
      });

      data.readAsDataURL(files[0]);
    }
  };

  const sendUpdate = async () => {
    try {
      await axios.put(
        import.meta.env.VITE_MEUPDATE,
        {
          image: previewImage,
          username: localUsername,
          email: localEmail,
          id: id
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );
      setAlert({ type: 'success', message: 'Update was successful!', header: 'Success!' });
      setTimeout(() => {
        setAlert({ type: '', message: '', header: '' });
        onHide();
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = 'Error Code:' + error.response?.data.statusCode;
        const errorMessage =
          error.response?.data.message && Array.isArray(error.response.data.message)
            ? error.response.data.message.join('\n')
            : error.response?.data.message;

        setAlert({ type: 'danger', message: errorMessage, header: errorCode });
      } else {
        console.error('Unknown error during sign up', error);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (email == localEmail && username == localUsername && image == previewImage) {
      onHide();
    } else {
      await sendUpdate();
    }
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-fullscreen">
        {/* Bootstrap Alert */}
        {alert.type && alert.message && (
          <div className={`alert alert-${alert.type}`} role="alert">
            <h4 className="alert-heading">{alert.header}</h4>
            {alert.message}
          </div>
        )}
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title">Edit Profile</h5>
            <button type="button" className="close" onClick={onHide}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body ">
            <div className="d-flex justify-content-center">
              <label htmlFor="imageInput">Profile Image:</label>
              <input type="file" id="imageInput" onChange={handleImageChange} accept="image/*" />
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <img
                src={previewImage != '' ? previewImage : svg}
                alt="Selected"
                className="img-fluid imageprev"
              />
            </div>
            <div className="mt-3 d-flex flex-column align-items-center">
              <div className="input-group mb-3 w-50">
                <span className="input-group-text" id="basic-addon1">
                  u:
                </span>
                <input
                  type="text"
                  value={localUsername}
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setLocalUsername(e.target.value)}
                />
              </div>
              <div className="input-group mb-3 w-50">
                <span className="input-group-text" id="basic-addon2">
                  @:
                </span>
                <input
                  type="text"
                  value={localEmail}
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setLocalEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-3 w-50">
                <span className="input-group-text" id="basic-addon1">
                  P:
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
