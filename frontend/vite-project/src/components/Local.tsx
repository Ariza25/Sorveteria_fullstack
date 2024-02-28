import local from "../images/place.jpg";

const Local = () => {
  return (
<section
  className={`relative bg-cover bg-right-bottom bg-no-repeat bg-fixed`}
  style={{ backgroundImage: `url(${local})`}}
>
      <div className="relative mx-auto max-w-screen-xl px-4 py-32">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-5xl font-extrabold text-yellow-400">
            Venha nos visitar
            <strong className="block font-extrabold text-yellow-800">
              Estamos esperando por você!
            </strong>
          </h1>

          <div className="mt-8 flex flex-wrap gap-4 text-center ms-[12rem]">
          </div>
        </div>
      </div>
    </section>
  );
};

export default Local;
