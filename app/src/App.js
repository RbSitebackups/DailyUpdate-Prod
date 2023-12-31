import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  Landing,
  Login,
  Error,
  ProtectedRoutes,
  Category,
  Client,
  Userclient,
  Dailyupdate,
  Edmschedule,
  Listschedule,
  Campaign,
  Social,
} from './pages'
import { Stats, Profile, Setting, Changepassword } from './pages/dashboard'
import SharedLayout from './layouts/SharedLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoutes>
              <SharedLayout />
            </ProtectedRoutes>
          }
        >
          <Route
            index
            element={<Stats />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/changepassword'
            element={<Changepassword />}
          />
          <Route
            path='/setting'
            element={<Setting />}
          />
          <Route
            path='/category'
            element={<Category />}
          />
          <Route
            path='/client'
            element={<Client />}
          />
          <Route
            path='/userclient'
            element={<Userclient />}
          />
          <Route
            path='/dailyupdate'
            element={<Dailyupdate />}
          />
          <Route
            path='/edmschedule'
            element={<Edmschedule />}
          />
          <Route
            path='/listschedule'
            element={<Listschedule />}
          />
          <Route
            path='/social'
            element={<Social />}
          />
          <Route
            path='/campaigns'
            element={<Campaign />}
          />
        </Route>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/landing'
          element={<Landing />}
        />
        <Route
          path='*'
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
