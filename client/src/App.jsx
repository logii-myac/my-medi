import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Signup from './pages/Signup'
import Login from './pages/Login'
import RegisterFaceID from './pages/RegisterFaceID'
import AuthHome from './pages/AuthHome'
import MainState from './context/MainState'
import DoctorHome from './pages/DoctorHome'
import DoctorLogin from './pages/DoctorLogin'
import AdminLogin from './pages/admin/AdminLogin'
import AdminHome from './pages/admin/AdminHome'
import AdminUser from './pages/admin/AdminUser'
import AdminAppointment from './pages/admin/AdminAppointment'
import Checkin from './pages/Checkin'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import DoctorRoute from './routes/DoctorRoute'
import UserRoute from './routes/UserRoute'
import AdminRoute from './routes/AdminRoute'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>

      <MainState>

        <Routes>

          <Route path='/welcome' element={<Home />} />

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<UserRoute> <AuthHome /></UserRoute>} />
          <Route path='/register-face' element={<UserRoute> <RegisterFaceID /></UserRoute>} />
          <Route path='/checkin' element={<UserRoute> <Checkin /></UserRoute>} />
          <Route path='/my-appointment' element={<UserRoute> <MyAppointment /></UserRoute>} />
          <Route path='/myprofile' element={<UserRoute> <MyProfile /></UserRoute>} />

          <Route path='/doctor'>

            <Route path='/doctor' element={
              <DoctorLogin />
            }></Route>
            <Route path='home' element={
              <DoctorRoute>
                <DoctorHome />
              </DoctorRoute>
            }></Route>

          </Route>

          <Route path='/admin'>

            <Route path='/admin' element={<AdminLogin />}></Route>

            <Route path='home' element={<AdminRoute> <AdminHome /></AdminRoute>}></Route>
            <Route path='users' element={<AdminRoute> <AdminUser /></AdminRoute>}></Route>
            <Route path='appointments' element={<AdminRoute> <AdminAppointment /></AdminRoute>}></Route>

          </Route>

        </Routes>

        <ToastContainer />

      </MainState>
    </>
  )
}

export default App
