import { useLogin } from "../hooks/useLogin";
import Icons from "../../../assets/icons/Icons";

interface Props {
  onClose: () => void;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeAuth: () => void;
}

const LoginComponents = ({ onClose, setShowModalLogin, handleChangeAuth }: Props) => {
  const { login, error, handleLogin, handleLoginSubmit } = useLogin(setShowModalLogin);
  const { IoCloseSharp } = Icons();

  return (
    <div className="fixed top-0 flex justify-center items-center left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white px-10 py-10 rounded border shadow-lg relative" onClick={(event) => { event.stopPropagation() }}>
          <IoCloseSharp className="absolute top-3 right-3 text-xl cursor-pointer" onClick={onClose} />
          <h2 className="text-center text-[#0039FF] text-4xl font-black mb-10">
            PerPic
          </h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-8">
              <h2 className="font-bold mb-1">Name</h2>
              <input
                type="text"
                name="email"
                placeholder="username or email"
                className="border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                onChange={handleLogin}
              />
              <h2 className="font-bold mb-1">Password</h2>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                onChange={handleLogin}
              />
            </div>
            {!login.password ||
              (login.password.length < 8 && (
                <div>Password must be at least 8 characters long</div>
              )) ||
              error}
            <div className="mb-4">
              <button
                type="submit"
                className={`text-white bg-[#0059ff] w-full py-3 rounded font-bold`}
              >
                Login
              </button>
            </div>
            <div className="mt-10 text-center">
              <button type="button" className="text-gray-500" onClick={handleChangeAuth}>
                Don't have an account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponents;
