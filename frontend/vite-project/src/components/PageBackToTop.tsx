import { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const PageBackToTop = () => {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
      const checkScroll = () => {
        setIsTop(window.scrollY === 0);
      };
    
      window.addEventListener('scroll', checkScroll);
    
      return () => {
        window.removeEventListener('scroll', checkScroll);
      };
    }, []);
  return (
    <FaArrowCircleUp className={`fixed bottom-5 bg-slate-50 rounded-full right-[48.8%] z-10 text-3xl text-gray-500 cursor-pointer ${isTop ? 'hidden' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
  )
}

export default PageBackToTop