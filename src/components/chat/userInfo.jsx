import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../../state/user/actions';

export default function UserInfo(props) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeUser());
  };

  return (
    <div className="user-info">
      <img className="user-image" src="./assets/user.svg" alt="User image" />
      <span className="username">{user.username}</span>
      <button className="btn red icon-btn" onClick={handleClick}>
        <span className="icon power"></span>
      </button>
    </div>
  );
}
