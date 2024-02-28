import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

type QuantityProps = {
  onQuantityChange: (quantity: number) => void;
}

const Quantity = ({onQuantityChange}: QuantityProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [moreUnities, setMoreUnities] = useState(false);
  const [isSelectedQuantity, setSelectedQuantity] = useState(1);
  const [inputQuantity, setInputQuantity] = useState("");

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMoreUnities = () => {
    setMoreUnities(!moreUnities);
  };

  const handleQuantity = (quantity: number) => {
    setSelectedQuantity(quantity);
    setShowMenu(false);
    onQuantityChange(quantity);
  };

  const handlePersonalizeQuantity = () => {
    setSelectedQuantity(Number(inputQuantity));
    setShowMenu(false);
    onQuantityChange(Number(inputQuantity));
  };

  return (
    <button onClick={handleShowMenu}>
      <div className="flex items-center text-md text-gray-800">
        <h2>Quantidade(s): {isSelectedQuantity}</h2>
        <IoMdArrowDropdown />
      </div>

      {showMenu && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul
            className="text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {[1, 2, 3, 4, 5].map((quantity) => (
              <li
                key={quantity}
                onClick={() => handleQuantity(quantity)}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <h2>{quantity}</h2>
              </li>
            ))}
            <hr />
            {moreUnities ? (
              <div className="w-[100%] flex items-center">
                <input
                  type="text"
                  onChange={(e) => setInputQuantity(e.target.value)}
                  onClick={(event) => event.stopPropagation()}
                  className="py-2.5 w-[70%] rounded-s-lg ps-2"
                />
                <div
                  onClick={handlePersonalizeQuantity}
                  className="top-[13px] end-4 text-xs flex w[30%] bg-slate-900 p-3 rounded-e-lg text-slate-50"
                >
                  Aplicar
                </div>
              </div>
            ) : (
              <li
                onClick={(event) => {
                  handleMoreUnities();
                  event.stopPropagation();
                }}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <h2>Mais de 5 unidades...</h2>
              </li>
            )}
          </ul>
        </div>
      )}
    </button>
  );
};

export default Quantity;