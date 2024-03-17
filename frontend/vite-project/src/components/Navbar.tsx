import { IoMdArrowDropdown } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../images/logonobackground.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

import { useContext, useState, useEffect } from "react";
import DropDownProfile from "../components/DropDownProfile";
import DropDownProducts from "./DropDownProducts";

import { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  busca: string;
  setBusca: Dispatch<SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ busca, setBusca }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusca(event.target.value);
  };

  const location = useLocation();

  const { signOut, user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const [signedIn, setSignedIn] = useState(false);
  const Navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showMenuProducts, setShowMenuProducts] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleShowMenuProducts = () => {
    setShowMenuProducts(!showMenuProducts);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSignedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    signOut();
    setSignedIn(false);
    Navigate("/login");
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Navigate(`/searchitems?query=${busca}`);
  };

  const totalQuantity = cart.reduce(
    (total, item) => total + item.selectedQuantity,
    0
  );

  useEffect(() => {
    if (user && user.name) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [user]);
  return (
    <>
       <nav className={`${location.pathname === '/' ? 'fixed top-0 w-full z-10' : ''} flex items-center justify-between px-20 bg-red-700`}>
        <div>
          <ul className="flex gap-8 text-yellow-50 items-center">
            <div className="w-[6rem]">
              <img src={logo} />
            </div>

            <Link to="/" className="hover:text-yellow-200 cursor-pointer">
              Home
            </Link>
            <Link to="/about" className="hover:text-yellow-200 cursor-pointer">
              Sobre
            </Link>
            <li className="hover:text-yellow-200 cursor-pointer flex ">
              <div
                className="flex cursor-pointer transition-all duration-250 items-center"
                onClick={handleShowMenuProducts}
              >
                Produtos
                <IoMdArrowDropdown />
                <DropDownProducts
                  handleShowMenu={handleShowMenuProducts}
                  showMenuProducts={showMenuProducts}
                />
              </div>
            </li>

            <Link
              to="/contact"
              className="hover:text-yellow-200 cursor-pointer"
            >
              Contato
            </Link>
          </ul>
        </div>

        <div className="flex gap-4 ms-10">
          {[
            "/picoles",
            "/massas",
            "/icecakes",
            "/paletasmexicanas",
            "/bebidas",
            "/complementos",
            "/searchitems",
          ].includes(location.pathname) && (
            <div>
              <form className="max-w-md mx-auto" onSubmit={handleSearchSubmit}>
                <label className="mb-2 text-sm font-medium sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={busca}
                    onChange={handleSearchChange}
                    className="block bg-slate-50 text-slate-700 w-full p-2.5 rounded-lg ps-10 pe-10 text-sm"
                    placeholder="Search for products"
                    required
                  />
                  <button
                    type="submit"
                    className="text-yellow-50 absolute end-[0rem] bottom-[0rem] bg-red-600 hover:bg-red-500 p-2 rounded-e-md"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="text-slate-50 font-bold flex items-center">
            {signedIn ? (
              <div
                className="flex cursor-pointer transition-all duration-250 items-center z-10"
                onClick={handleShowMenu}
              >
                <MdAccountCircle size={25} />
                <p className="ms-1 text-md">{user.name}</p>
                <IoMdArrowDropdown />
                <DropDownProfile
                  handleShowMenu={handleShowMenu}
                  handleSignOut={handleSignOut}
                  showMenu={showMenu}
                />
                <br />
              </div>
            ) : (
              <Link to="/cart">
                <div className="flex items-center ms-5 relative">
                  <FaShoppingCart size={25} className="" />
                  <div className="absolute left-4 bottom-3 rounded-full px-[6px] bg-yellow-600 text-xs">
                    {totalQuantity}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
