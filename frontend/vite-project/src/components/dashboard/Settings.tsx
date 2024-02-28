const Settings = () => {
    return (
      <div>
        <div>
          <h2 className="text-3xl font-semibold text-yellow-600 text-center mt-16">
            Recuperação de senha
          </h2>
        </div>
  
        <form className="max-w-sm mx-auto">
          <div className="">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              placeholder="name@email.com"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="shadow-sm bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repeat new password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="shadow-sm bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              required
            />
          </div>
  
          <button
            type="submit"
            className="w-[100%] text-white bg-red-700 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Change password
          </button>
        </form>
      </div>
    );
  };
  
  export default Settings;