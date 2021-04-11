import Login from './Login';
import Chat from './chat';
import config from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../state/user/actions';

const { endpoint } = config;

export default function App(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async (username) => {
    const credentials = { username };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    };

    try {
      const response = await fetch(`${endpoint}/login`, options);
      if (!response.ok) {
        const data = await response.text();
        throw Error(data);
      }
      const user = await response.json();
      dispatch(addUser(user));
    } catch (error) {
      alert(error);
    }
  };

  return user ? <Chat user={user} endpoint={endpoint} /> : <Login onLogin={handleLogin} />;
}
