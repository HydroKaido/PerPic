import Spinner from "../../../components/Spinner";
import { useRegister } from "../hooks/useRegister";

const RegisterComponents = () => {
  const { register, loading, error, handleRegister, handleRegisterSubmit } =
    useRegister();
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-screen flex items-center justify-center bg-[#EEEEEE]">
          <div className="max-w-md w-full space-y-8">
            <h2 className="text-center text-[#0039FF] text-4xl font-black">
              PerPic
            </h2>

            <div className="bg-white px-10 py-10 rounded border shadow-lg">
              <form action="" onSubmit={handleRegisterSubmit}>
                <div className="mb-8">
                  <h2 className="font-bold mb-1">Username</h2>
                  <input
                    type="text"
                    name="username"
                    className="border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    value={register.username}
                    onChange={handleRegister}
                  />
                  <h2 className="font-bold mb-1">Email</h2>
                  <input
                    type="gmail"
                    name="email"
                    className="border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    value={register.email}
                    onChange={handleRegister}
                  />
                  <h2 className="font-bold mb-1">Password</h2>
                  <input
                    type="password"
                    name="password"
                    className="border-2 rounded px-3 py-1 w-full mb-3 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                    value={register.password}
                    onChange={handleRegister}
                  />
                </div>
                <div className="text-red-500">
                  {!register.password ||
                    (register.password.length < 8 && (
                      <div>Password must be at least 8 characters long</div>
                    )) ||
                    error}
                </div>
                <button
                  type="submit"
                  className={`text-white bg-[#0059ff] w-full py-3 rounded font-bold `}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default RegisterComponents;
