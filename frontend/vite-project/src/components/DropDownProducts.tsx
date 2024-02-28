import { Link } from "react-router-dom";

type DropDownProductsProps = {
  showMenuProducts: boolean;
  handleShowMenu: () => void;
};

const DropDownProducts = ({
  handleShowMenu,
  showMenuProducts,
}: DropDownProductsProps) => {
  if (!showMenuProducts) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleShowMenu}
        className={`absolute left-[15.5%] top-[12%] z-10 bg-white divide-y rounded-lg shadow w-44 dark:bg-slate-600`}
      >
        <div>
        <ul
          className="text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          <Link
            to="/picoles"
            className="block px-4 py-2 hover:bg-yellow-100 dark:hover:bg-slate-500 dark:hover:text-white hover:rounded-t-lg"
          >
            Picolés
          </Link>
          <Link
            to="/massas"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-500 dark:hover:text-white"
          >
            Massas
          </Link>
          <Link
            to="/icecakes"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-500 dark:hover:text-white"
          >
            Ice Cakes
          </Link>
          <Link
            to="/paletasmexicanas"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-500 dark:hover:text-white"
          >
            Paletas Mexicanas
          </Link>
          <Link
            to="/bebidas"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-500 dark:hover:text-white"
          >
            Bebidas
          </Link>
          <Link
            to="/complementos"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-500 dark:hover:text-white hover:rounded-b-lg"
          >
            Complementos
          </Link>
        </ul>
        </div>
      </button>
    </>
  );
};

export default DropDownProducts;
