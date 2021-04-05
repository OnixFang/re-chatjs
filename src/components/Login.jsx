import { useRef } from 'react';

export default function Login(props) {
  const username = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onLogin(username.current.value);
  };

  return (
    <div className="valign-wrapper">
      <div className="login">
        <h1 className="headline">Login</h1>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="username">Username</label>
          <input className="text-input" id="username" type="text" ref={username} required />
          <input className="btn" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}
