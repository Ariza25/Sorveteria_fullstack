import Categories from '../components/Categories'
import Header from '../components/Header'
import Local from '../components/Local'
import Mobile from '../components/Mobile'
import NewProducts from '../components/NewProducts'
import Payments from '../components/Payments'

const Home = () => {
  return (
    <div className="w-[100%] min-h-screen">
        <Header/>
        <Categories/>
        <NewProducts/>
        <Mobile/>
        <Local/>
        <Payments/>
    </div>
  )
}

export default Home