import { Routes, Route, Link } from "react-router-dom";

import { IoSettingsSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { FaCheck, FaChartBar, FaCalendarAlt, FaIceCream    } from "react-icons/fa";

import Settings from "../../components/dashboard/Settings";
import PedidosFinalizados from "../../components/dashboard/PedidosFinalizados";
import PedidosEmAndamento from "../../components/dashboard/Pedidos";
import Grafico from "../../components/dashboard/Grafico";
import Calendario from '../../components/dashboard/Calendario'
import CadastrarProdutos from "../../components/dashboard/CadastrarProdutos";


const Dashboard = () => {
  return (
    <>
      <div className="flex h-[100%]">
        <aside className="w-[30%] bg-red-900 pb-10">
          <h2 className="text-center text-3xl text-slate-50 py-10">
            My account
          </h2>
          <div>
            <ul className="text-slate-50 text-md flex flex-col gap-4">
              <Link
                to="/pedidosemandamento"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <MdShoppingCart size={25} className="me-4" />
                Pedidos em Andamento
              </Link>
              <Link
                to="pedidosfinalizados"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <MdShoppingCart size={20} /><FaCheck size={10}  className="me-2.5"/>
                Pedidos Finalizados
              </Link>
              <Link
                to=""
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <FaChartBar  size={25} className="me-4" />
                Análise de vendas
              </Link>
              <Link
                to=""
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <FaCalendarAlt  size={25} className="me-4" />
                Calendário
              </Link>
              <Link
                to="cadastrarprodutos"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <FaIceCream  size={25} className="me-4" />
                Cadastrar Produtos
              </Link>
              <Link
                to="settings"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <IoSettingsSharp size={25} className="me-4" />
                Configurações
              </Link>
            </ul>
          </div>
        </aside>
        <section className="w-[70%] h-[100%]">
          <Routes>
            <Route path="pedidosemandamento" element={<PedidosEmAndamento />} />
            <Route path="pedidosfinalizados" element={<PedidosFinalizados />} />
            <Route path="grafico" element={<Grafico />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="settings" element={<Settings />} />
            <Route path="cadastrarprodutos" element={<CadastrarProdutos />} />
          </Routes>
        </section>
      </div>
    </>
  );
};

export default Dashboard;