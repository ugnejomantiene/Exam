import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const UserInfo = () => {

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const logOutUser = () => {
    setLoggedInUser(null);
    navigation('/');
  }

  return (
    <>
      <div className="UserInfo">
        <div className="logo">
          <p>The last fight...</p>
        </div>
        <div className="userF">
            <Link to="/">HOME</Link>
        </div>
        <div className="userBlock">
    
            <Link to="/newPost">Add new post</Link>
              <img
                src={loggedInUser.avatar}
                alt="user avatar"
              />
            <span className="Username">{loggedInUser.name}</span>
            <button onClick={() => logOutUser()}>LogOut</button>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default UserInfo;
