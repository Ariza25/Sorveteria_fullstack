import { Routes, Route, Link } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";

import { IoSettingsSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { FaCheck, FaChartBar, FaIceCream    } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";

import Settings from "../../components/dashboard/Settings";
import HistoricoDePedidos from "../../components/dashboard/HistoricoDePedidos";
import Delivery from "../../components/dashboard/Delivery";
import FecharPedidos from "../../components/dashboard/FecharPedidos";
import PedidosRecebidos from "../../components/dashboard/PedidosRecebidos";
import Grafico from "../../components/dashboard/Grafico";
import CadastrarProdutos from "../../components/dashboard/CadastrarProdutos";
import EditarProdutos from "../../components/dashboard/EditarProdutos";
import CreateCategoryAndSize from "../../components/dashboard/CreateCategoryAndSize";
import EditCategoryAndSize from "../../components/dashboard/EditCategoryAndSize";
import ReceivedContacts from "../../components/dashboard/ReceivedContacts";


const Dashboard = () => {
  const location = useLocation();

  if (location.pathname === '/dashboard') {
    return <Navigate to="/dashboard/pedidosemandamento" replace />;
  }

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
                to="pedidosrecebidos"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <MdShoppingCart size={25} className="me-4" />
                Pedidos Recebidos
              </Link>
              <Link
                to="delivery"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <MdShoppingCart size={25} className="me-4" />
                Delivery
              </Link>
              <Link
                to="fecharpedidos"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <MdShoppingCart size={20} /><FaCheck size={10}  className="me-2.5"/>
                Fechar Pedidos
              </Link>
              <Link
                to="historicodepedidos"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <MdShoppingCart size={20} /><FaCheck size={10}  className="me-2.5"/>
                Histórico de Pedidos
              </Link>
              <Link
                to="grafico"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <FaChartBar  size={25} className="me-4" />
                Análise de vendas
              </Link>
              <Link
                to="cadastrarprodutos"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <FaIceCream  size={25} className="me-4" />
                Cadastrar Produtos
              </Link>
              <Link
                to="editarprodutos"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <FaIceCream  size={25} className="me-4" />
                Editar Produtos
              </Link>
              <Link
                to="criarcategoriasetamanho"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <FaIceCream  size={25} className="me-4" />
                Criar Categorias e Tamanhos
              </Link>
              <Link
                to="editarcategoriasetamanho"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <FaIceCream  size={25} className="me-4" />
                Editar Categorias e Tamanhos
              </Link>
              <Link
                to="receviedcontacts"
                className="flex items-center hover:cursor-pointer hover:border-s-4 ps-6 h-[8vh]"
              >
                <IoMdContacts  size={25} className="me-4" />
                Contatos
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
            <Route path="pedidosrecebidos" element={<PedidosRecebidos />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="fecharpedidos" element={<FecharPedidos />} />
            <Route path="historicodepedidos" element={<HistoricoDePedidos />} />
            <Route path="grafico" element={<Grafico />} />
            <Route path="settings" element={<Settings />} />
            <Route path="cadastrarprodutos" element={<CadastrarProdutos />} />
            <Route path="editarprodutos" element={<EditarProdutos />} />
            <Route path="criarcategoriasetamanho" element={<CreateCategoryAndSize />} />
            <Route path="editarcategoriasetamanho" element={<EditCategoryAndSize />} />
            <Route path="receviedcontacts" element={<ReceivedContacts />} />
          </Routes>
        </section>
      </div>
    </>
  );
};

export default Dashboard;