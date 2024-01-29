import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToDoModel } from '../../models/todo.model';

interface EditToDoProps {
  onHide: () => void;
  show: boolean;
  access_token: string;
  todo?: ToDoModel;
}

export const EditToDo: React.FC<EditToDoProps> = ({ onHide, show, access_token, todo }) => {
  const [alert, setAlert] = useState({ type: '', message: '', header: '' });
  const [localTitle, setLocalTitle] = useState('');
  const [localDescription, setLocalDescription] = useState('');
  const [locaExpireAt, setLocalExpireAt] = useState(new Date());
  const [localToDoId, setLocaToDoId] = useState(0);

  useEffect(() => {
    if (todo) {
      setLocalTitle(todo.title || '');
      setLocalDescription(todo.description || '');
      setLocalExpireAt(new Date(todo.expireAt) || new Date());
      setLocaToDoId(todo.id || 0);
    }
  }, [todo]);

  const sendUpdate = async () => {
    try {
      await axios.put(
        import.meta.env.VITE_TODOUPDATE,
        {
          title: localTitle,
          description: localDescription,
          expireAt: locaExpireAt.toISOString(),
          id: localToDoId
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
        setAlert({ type: 'danger', message: 'Something went wrong :(', header: '500' });
      }
    }
  };

  const handleSaveChanges = async () => {
    if (
      todo?.title == localTitle &&
      todo.description == localDescription &&
      todo.expireAt == locaExpireAt.toISOString()
    ) {
      onHide();
    } else {
      await sendUpdate();
    }
  };

  const handleDelete = async () => {
    try {
      await axios
        .delete(import.meta.env.VITE_TODODELETE, {
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          data: {
            id: localToDoId
          }
        })
        .then(onHide);
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
            <h5 className="modal-title">Edit ToDo</h5>
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
                  value={localTitle}
                  onChange={(e) => setLocalTitle(e.target.value)}
                />
              </div>
              <div className="input-group w-50 mb-3">
                <span className="input-group-text">ToDo Description</span>
                <textarea
                  className="form-control TextAreaCustom"
                  aria-label="With textarea"
                  value={localDescription}
                  onChange={(e) => setLocalDescription(e.target.value)}
                />
              </div>
              <div className="input-group w-50 mb-3">
                <span className="input-group-text">Expire At:</span>
                <DatePicker
                  showTimeSelect
                  className="form-control"
                  selected={locaExpireAt}
                  onChange={(date) => setLocalExpireAt(date || new Date())}
                  dateFormat="yyyy-MM-dd HH:mm:ss"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={onHide}>
                Close
              </button>
              <button type="button" className="btn btn-success me-2" onClick={handleSaveChanges}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
