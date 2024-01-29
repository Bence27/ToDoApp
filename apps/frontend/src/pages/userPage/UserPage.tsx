import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { UserModel } from '../../models/user.model';
import svg from '../../../public/defaultppicture.svg';
import './UserPage.scss';
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal';
import { DeleteUserModal } from '../../components/DeleteUserModal/DeleteUserModal';
import { AddNewToDo } from '../../components/AddNewToDo/AddNewToDo';
import { ToDoModel } from '../../models/todo.model';
import { EditToDo } from '../../components/EditToDo/EditToDo';

export const UserPage = () => {
  const { state } = useLocation();
  const accessToken = state?.Token;
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserModel>();
  const [todoData, setToDoData] = useState<ToDoModel[]>();
  const [selectedTodoItem, setSelectedTodoItem] = useState(3);

  const navigateToLogin = () => {
    navigate('/login');
  };

  const getUserData = async (accessToken: string) => {
    try {
      const response = await axios.get(import.meta.env.VITE_ME, {
        headers: {
          Authorization: `Bearer ${accessToken}`
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

  const getToDoData = async (accessToken: string) => {
    try {
      const response = await axios.get(import.meta.env.VITE_TODOSGET, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setToDoData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo data', error);
      navigateToLogin();
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
         await getUserData(accessToken);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
         await getToDoData(accessToken);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, [accessToken]);

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
  const [showAddNewToDoModal, setShowAddNewToDoModal] = useState(false);
  const [showToDoEditMoidal, setShowToDoEditMoidal] = useState(false);

  const handleEditToDoClick = (selectedTodoItem: number) => {
    setSelectedTodoItem(selectedTodoItem);
    setShowToDoEditMoidal(true);
  };

  const handleCloseEitToDoModal = () => {
    setShowToDoEditMoidal(false);
    getToDoData(accessToken);
  };

  const handleEditProfileClick = () => {
    setShowEditProfileModal(true);
  };

  const handleCloseEditProfileModal = () => {
    setShowEditProfileModal(false);
    getUserData(accessToken);
  };

  const handleDeleteProfileClick = () => {
    setShowDeleteProfileModal(true);
  };

  const handleCloseDeleteProfileModal = () => {
    setShowDeleteProfileModal(false);
  };

  const handleAddNewToDoModalClick = () => {
    setShowAddNewToDoModal(true);
  };

  const handleCloseAddNewToDoModal = () => {
    setShowAddNewToDoModal(false);
    getToDoData(accessToken);
  };

  return (
    <div className="Container">
      <div className="container-fluid Container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="card Card">
            <div className="card-header">
              <h3 className="card-title text-center">{userData?.username}</h3>
            </div>
            <img
              src={userData?.image != null && userData?.image != '' ? userData?.image : svg}
              alt=""
              className="card-img-top"
            />
            <div className="card-body">
              <p className="card-text text-center">Email: {userData?.email}</p>
              <ul className="list-group list-group-flush">
                {todoData?.map((item: ToDoModel, i: number) => (
                  <li
                    className="list-group-item text-center LiMod"
                    onClick={() => handleEditToDoClick(i)}
                    key={i}
                  >
                    ToDo#{i + 1} <br /> Title: {item.title} <br /> Expire At:{' '}
                    {new Date(item.expireAt).toLocaleString()} <br /> Click for more
                  </li>
                ))}
              </ul>
              <hr />
              <div className="row d-flex justify-content-center">
                <div className="col-12 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary customButton"
                    onClick={handleAddNewToDoModalClick}
                  >
                    + Add new ToDo
                  </button>
                </div>

                <div className="col-12 d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary customButton"
                    onClick={handleEditProfileClick}
                  >
                    &#9998; Edit profile
                  </button>
                </div>

                <div className="col-12 d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    className="btn btn-danger customButton"
                    onClick={handleDeleteProfileClick}
                  >
                    &#10005; Delete profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        username={userData?.username || ''}
        email={userData?.email || ''}
        show={showEditProfileModal}
        onHide={handleCloseEditProfileModal}
        access_token={accessToken}
        image={userData?.image || ''}
        id={userData?.id || -1}
      />
      <DeleteUserModal
        id={userData?.id || -1}
        onHide={handleCloseDeleteProfileModal}
        show={showDeleteProfileModal}
        access_token={accessToken}
      />
      <AddNewToDo
        userId={userData?.id || -1}
        onHide={handleCloseAddNewToDoModal}
        show={showAddNewToDoModal}
        access_token={accessToken}
      />
      <EditToDo
        show={showToDoEditMoidal}
        onHide={handleCloseEitToDoModal}
        access_token={accessToken}
        todo={todoData ? todoData[selectedTodoItem] : undefined}
      />
    </div>
  );
};
