import logo from "../images/logonobackground.png";
import Copy from "./Copy";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="flex bg-red-700 gap-8 w-[100%] ps-14">
        <div className="w-[16rem]">
          <img src={logo} />
        </div>

        <div className="flex items-center justify-around ps-12">
          <div className="text-yellow-50 flex">
            <div className="w-[33%] px-5">
              <p className="text-2xl font-bold">Endereço</p>
              <p className="text-md">
                Av. Bento Ferraz de Campos, nº 1020 - Cornélio Procópio - PR -
                86300-000
              </p>
            </div>
            <div className="w-[33%] px-5">
              <p className="text-2xl font-bold">Contato</p>
              <p className="text-md">
                email: mjsa.sanches25@gmail.com
                <br />
                Cel: (43) 998068708<br/>
                Tel: (43) 3523-1000
              </p>
            </div>
            <div className="w-[33%] px-5">
              <p className="text-2xl font-bold">Horários</p>
              <p className="text-md">Aberto todos os dias:<br/> 11:00 - 23:00</p>
            </div>
          </div>
        </div>
      </footer>

      <footer>
        <div className="text-yellow-50 bg-red-700 flex flex-col justify-center text-center pb-8">
          <div className="pb-3 text-xl font-bold">
            <h3>Nos acompanhe pelas redes sociais:</h3>
          </div>
          <div className="">
            <ul className="flex justify-center gap-3 text-2xl">
              <li className="hover:text-yellow-200 cursor-pointer">
                <FaFacebook />
              </li>
              <li className="hover:text-yellow-200 cursor-pointer">
                <FaInstagram />
              </li>
              <li className="hover:text-yellow-200 cursor-pointer">
                <FaTwitter />
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <Copy />
      </footer>
    </>
  );
};

export default Footer;
