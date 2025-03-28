import Header from '@/components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import Services from '@/pages/Services/Services'
import Process from '@/pages/Process/Process'
import UserAppointments from '@/pages/UserAppointments/UserAppointments'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { setUserData } from '@/store/userSlice'
import { fetchLocal } from '@/utils/fetchLocal'
// import FormModal from '@/components/FormModal/FormModal'
import { setIsOfferModalOpen } from '@/store/alertSlice';
import OfferModal from '@/components/OfferModal/OfferModal'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Products from '@/pages/Products/Products'


function App() {

  const dispatch = useDispatch();
  const isOfferModalOpen = useSelector((state) => state.alert.isOfferModalOpen);
  const { width, height } = useWindowSize();
  const ivProducts = useSelector(state => state.products.ivProducts);

  const groupedProducts = useCallback(ivProducts.reduce((group, obj) => {
    const { id } = obj;
    group[id] = group[id] || []; // Initialize array if it doesn't exist
    group[id].push(obj); // Add the object to the group
    return group;
  }, {}), [ivProducts]);

  useEffect(() => {
    const userData = fetchLocal("userData")
    dispatch(setUserData({
      ...userData
    }))
    dispatch(setIsOfferModalOpen(true));

  }, []);

  return (
    <>
      <Header />
      {isOfferModalOpen && (
        <Confetti
          width={width}
          height={height}
        />
      )}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services groupedProducts={groupedProducts} />} />
        <Route path='/process' element={<Process />} />
        <Route path='/bookings' element={<UserAppointments />} />
        <Route path='/products' element={<Products groupedProducts={groupedProducts} />} />


      </Routes>
      <OfferModal isOpen={isOfferModalOpen} />
    </>
  )
}

export default App
