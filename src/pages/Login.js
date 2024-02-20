import { useState } from "react";

const Login = ({setUser}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(userName + password);
    localStorage.setItem("user", userName);
    setUser(true)
  };
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div
        className="bg-darker flex items-center 
          justify-center flex-col px-6 xl:w-[30%] 
      lg:w-[40%] md:w-[50%] w-[70%] h-[80vh] rounded-3xl"
      >
        <input
          placeholder="User Name"
          name="username"
          type="text"
          value={userName}
          required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          className="bg-darkest placeholder:text-gray text-light 
           p-4 rounded-2xl mb-4 text-xl"
        />
        <input
          placeholder="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="bg-darkest placeholder:text-gray text-light 
          p-4 rounded-2xl mb-4 text-xl"
        />
        <button
          type="submit"
          onClick={(e) => {
            handleLogin(e);
          }}
          className="text-pink text-xl font-bold 
            bg-gradient-to-r from-pink to-purple 
            bg-clip-text text-transparent cursor-pointer
             transition duration-400 hover:opacity-75 "
        >
          Login
        </button>
      </div>
    </main>
  );
};
export default Login;
