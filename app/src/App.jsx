import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Auth from "./pages/Auth/Auth.jsx"
import Messaging from "./pages/Messaging/Messaging.jsx";
import './App.css'

function App() {
  return (
      <Router>
          <Routes>
              <Route path={'/'} element={<Auth/>}/>
              <Route path={'/messaging'} element={<Messaging/>}/>
          </Routes>
      </Router>
  )
}

export default App
