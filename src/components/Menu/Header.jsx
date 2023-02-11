import UserInfo from '../User/UserInfo';
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';

const Header = () => {

  const { loggedInUser } = useContext(UserContext);

  return (
    <>
      <div className={loggedInUser ? "userInfo" : "loginRegister"}>
        {
          loggedInUser ?
            <UserInfo /> :
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
        }
      </div>
      {
        loggedInUser ?
          <div className="addPost"></div>
          :
          <div className='info'>
            <p>Hello! Login and enjoy the discussion!</p>
          </div>
      }
    </>
  );
}

export default Header;