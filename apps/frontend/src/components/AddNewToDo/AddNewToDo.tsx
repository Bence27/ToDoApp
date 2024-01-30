import React, { useState } from 'react';
import './AddNewToDo.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

interface AddNewToDoProps {
  userId: number;
  onHide: () => void;
  show: boolean;
  access_token: string;
  email: string;
}

export const AddNewToDo: React.FC<AddNewToDoProps> = ({
  userId,
  onHide,
  show,
  access_token,
  email
}) => {
  const [alert, setAlert] = useState({ type: '', message: '', header: '' });
  const [endDate, setEndDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateToDo = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_TODCREATE,
        {
          title: title,
          userId: userId,
          description: description,
          expireAt: endDate.toISOString(),
          email: email
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );
      setAlert({ type: 'success', message: 'Create was successful!', header: 'Success!' });
      setTimeout(() => {
        setAlert({ type: '', message: '', header: '' });
        onHide();
      }, 2000);
      setTitle('');
      setDescription('');
      setEndDate(new Date());
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
        <div className="modal-content modal-content-M">
          <div className="modal-header">
            <h5 className="modal-title">New ToDo</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body ">
            <div className="mt-3 d-flex flex-column align-items-center">
              <div className="input-group mb-3 w-50">
                <span className="input-group-text" id="basic-addon1">
                  T:
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ToDo Title"
                  aria-label="ToDoName"
                  aria-describedby="basic-addon1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input-group w-50 mb-3">
                <span className="input-group-text">ToDo Description</span>
                <textarea
                  className="form-control TextAreaCustom"
                  aria-label="With textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="input-group w-50 mb-3">
                <span className="input-group-text">D:</span>
                <DatePicker
                  showTimeSelect
                  className="form-control"
                  selected={endDate}
                  onChange={(date) => setEndDate(date || new Date())}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
            <button type="button" className="btn btn-success" onClick={handleCreateToDo}>
              Create New ToDo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
