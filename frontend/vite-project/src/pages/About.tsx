import sorv from "../images/sorv.jpg";
import imgAbout from "../images/contact2.webp";
import WhatsApp from "../components/WhatsApp";

const About = () => {
  return (
    <>
      <WhatsApp />
      <main className="flex gap-6 h-full py-10 relative">
        <img className="fixed -z-10 top-0 left-0" src={imgAbout} />

        <div className="px-20 flex gap-8 ">
          <div className="flex flex-col w-[50%] bg-slate-50 opacity-80 rounded-lg p-10">
            <h2 className="font-bold text-xl text-yellow-600">
              Sorveteria Carioca
            </h2>
            <h2 className="text-red-700 text-3xl font-bold">
              Aqui Você Encontra o Sorvete dos seus Sonhos
            </h2>
            <div className="pt-10">
              <p>
                A Sorveteria Carioca, estabelecida em 2010, é um verdadeiro
                paraíso para os amantes de sorvete. Localizada no coração de
                Cornélio Procópio, a Sorveteria Carioca é conhecida por seus
                sorvetes artesanais de alta qualidade, feitos com os
                ingredientes mais frescos e naturais.
              </p>
              <br />
              <p>
                Desde o início, a Sorveteria Carioca se comprometeu a trazer uma
                experiência única de sorvete para a região. Cada sabor é
                cuidadosamente criado para garantir uma explosão de sabor a cada
                mordida.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="w-[100%] rounded-lg">
              <img
                src={sorv}
                className="w-full h-[50vh] object-cover rounded-lg"
              />
            </div>

            <div className="flex gap-2 items-center justify-center bg-slate-50 opacity-80 rounded-lg p-4 mt-4">
              <div className="flex flex-col gap-2">
                <div className="bg-slate-200 rounded-lg py-8 px-12">
                  <h5 className="text-center font-semibold text-xl">
                    1 Sorveteria
                  </h5>
                </div>
                <div className="bg-slate-200 rounded-lg py-8 px-12">
                  <h5 className="text-center font-semibold text-xl">
                    10 colaboradores
                  </h5>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-slate-200 rounded-lg py-8 px-12">
                  <h5 className="text-center font-semibold text-xl">
                    +20 Parceiros
                  </h5>
                </div>
                <div className="bg-slate-200 rounded-lg py-8 px-12">
                  <h5 className="text-center font-semibold text-xl">
                    5k clientes
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
