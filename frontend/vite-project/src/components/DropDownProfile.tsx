import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

type DropDownProfileProps = {
  handleShowMenu: () => void;
  handleSignOut: () => void;
  showMenu: boolean;
};

const DropDownProfile = ({
  handleShowMenu,
  showMenu,
  handleSignOut,
}: DropDownProfileProps) => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setEmail(user.email);
  }, [user.email]);

  if (!showMenu) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleShowMenu}
        className={`absolute right-6 top-[11%] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bem vindo,</div>
          <div className="font-medium truncate">{email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          <Link
            to="/dashboard"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Dashboard
          </Link>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={handleSignOut}
          >
            Sign out
          </a>
        </div>
      </button>
    </>
  );
};

export default DropDownProfile;
