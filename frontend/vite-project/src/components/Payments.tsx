import { FaCcVisa, FaCcMastercard, FaCcDinersClub } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { MdOutlineSecurity, MdOutlineSecurityUpdateGood } from "react-icons/md";

const Payments = () => {
  return (
    <>
      <section className="bg-slate-50 h-[500px] pt-10">
        <div className="flex justify-center gap-20 py-10">
          <div>
            <h5 className="font-semibold text-lg text-yellow-500 pb-4">Formas de Pagamento</h5>
            <div className="flex items-center justify-around font-semibold text-yellow-700">
              <FaCcVisa size={25} />
              <FaCcMastercard size={25} />
              <FaPix size={25} />
              <FaCcDinersClub size={25} />
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-lg text-yellow-500 pb-4">Informações Protegidas</h5>
            <div className="flex items-center justify-center text-yellow-700 gap-4">
              <MdOutlineSecurity size={25} />
              <MdOutlineSecurityUpdateGood size={25} />
            </div>
          </div>
        </div>
        <hr/>

        <div className="flex justify-center w-[100%] pt-10">
          <h5 className="font-semibold text-lg text-yellow-500">Informações adicionais</h5>
        </div>
        <div className="flex justify-center w-[100%] pt-2">
          <small className="px-20 text-justify text-yellow-800">
            <b>Cartão de Crédito e Débito:</b> Esta é uma das opções mais populares. Os
            clientes podem pagar suas compras utilizando cartões de crédito,
            proporcionando praticidade e segurança. O processo é rápido, e os
            detalhes do cartão são geralmente criptografados para garantir a
            segurança das transações. <b>Pagamento na Entrega:</b> Alguns
            e-commerces de roupas oferecem a opção de pagamento na entrega.
            Nesse caso, o cliente paga pelo pedido no momento em que recebe a
            mercadoria. Essa opção é interessante para quem prefere conferir os
            produtos antes de efetuar o pagamento. 
            <b> Programas de Descontos:</b>E-commerces
            oferecem programas de fidelidade nos quais os clientes acumulam
            pontos a cada compra. Esses pontos podem ser trocados por descontos
            ou benefícios nas próximas compras, incentivando a fidelização. Por
            fim, <b>Pagamentos PIX:</b> Uma opção de pagamento em crescimento, o PIX oferece uma
            alternativa rápida e segura para clientes realizarem transações
            diretamente de suas contas bancárias.
          </small>
        </div>
      </section>
    </>
  );
};

export default Payments;