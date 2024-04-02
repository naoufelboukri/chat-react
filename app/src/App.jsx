import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Auth from "./containers/Auth/Auth.jsx"
import Messaging from "./containers/Messaging/Messaging.jsx";
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
