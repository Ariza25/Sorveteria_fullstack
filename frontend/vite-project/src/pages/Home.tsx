// Home.tsx
import Categories from "../components/Categories";
import Header from "../components/Header";
import Local from "../components/Local";
import Mobile from "../components/Mobile";
import NewProducts from "../components/NewProducts";
import PageBackToTop from "../components/PageBackToTop";
import Payments from "../components/Payments";
import WhatsApp from "../components/WhatsApp";

const Home = () => {

  return (
    <div className="w-[100%] min-h-screen">
      <WhatsApp/>
      <PageBackToTop/>
      <Header />
      <Categories />
      <NewProducts />
      <Mobile />
      <Local />
      <Payments />
    </div>
  );
};

export default Home;