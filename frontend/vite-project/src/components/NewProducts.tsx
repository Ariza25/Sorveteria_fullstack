import IceCake from "../images/icecake.jpg"
import IceCake2 from "../images/mini.jpg"
import dog from '../images/dogicecream.jpg'
import dog2 from '../images/dogicecream2.png'

const NewProducts = () => {
  return (
    <>
    <section className= "dark:bg-yellow-600 px-10">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-slate-50 text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            Já conhece o famoso Ice Cake?
          </h2>
          <p className="mb-4 font-normal">
            Um produto artesanal que mistura umas das coisas que mais amamos: bolo e sorvete. São diversos sabores e ingredientes únicos para você e sua família. O que está esperando para provar?
          </p>
        
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src={IceCake}
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src={IceCake2}
            alt="office content 2"
          />
        </div>
      </div>
    </section>

    <section className= "dark:bg-red-700 px-10">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
      <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src={dog}
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src={dog2}
            alt="office content 2"
          />
        </div>
        
        <div className="font-light text-slate-50 text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            Até o seu pet vai amar!
          </h2>
          <p className="mb-4 font-normal">
            Um produto artesanal com ingredientes próprios e que não prejudicam a saúde do seu pet. São sabores de carne e frutas para refrescar nossos amigos no calor. 
          </p>
        
        </div>
      
      </div>
    </section>
    </>
)}

export default NewProducts;
