import { Link } from "react-router-dom";

import picoles from "../images/picoles.jpg";
import iceCakes from "../images/icecake.jpg";
import massas from "../images/massas.webp";
import complementos from "../images/complementos.jpeg";
import Paletas from "../images/paletas.webp";
import bebidas from "../images/bebidas.png";

const Categories = () => {
  return (
    <>
    <div className="px-8 bg-slate-50">
      <div className="flex items-center justify-center pt-8 flex-wrap">
        <h2 className="font-bold text-yellow-500 text-3xl">NOSSOS PRODUTOS</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-2 ms-2 px-10 py-10">
        <div className="hover:opacity-80 cursor-pointer w-auto h-auto">
          <Link to="/picoles">
            <img
              src={picoles}
              className="h-[300px] rounded-lg shadow-md shadow-slate-300"
              alt="picoles"
            />
          </Link>
        </div>
        <div className="hover:opacity-80 cursor-pointer w-auto h-auto">
          <Link to="/icecakes">
            <img
              src={iceCakes}
              className="h-[300px] rounded-lg shadow-md shadow-slate-300"
              alt="iceCakes"
            />
          </Link>
        </div>
        <div className="hover:opacity-80 cursor-pointer w-auto h-auto">
          <Link to="/massas">
            <img
              src={massas}
              className="h-[300px] rounded-lg shadow-md shadow-slate-300"
              alt="massas"
            />
          </Link>
        </div>
        <div className="hover:opacity-80 cursor-pointer w-auto h-auto">
          <Link to="/complementos">
            <img
              src={complementos}
              className="h-[300px] rounded-lg shadow-md shadow-slate-300"
              alt="complementos"
            />
          </Link>
        </div>
        <div className="hover:opacity-80 cursor-pointer w-auto h-auto">
          <Link to="/paletasmexicanas">
            <img
              src={Paletas}
              className="h-[300px] rounded-lg shadow-md shadow-slate-300"
              alt="Paletas"
            />
          </Link>
        </div>
        <div className="hover:opacity-80 cursor-pointer w-auto h-auto">
          <Link to="/bebidas">
            <img
              src={bebidas}
              className="h-[300px] rounded-lg shadow-md shadow-slate-300"
              alt="bebidas"
            />
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Categories;
