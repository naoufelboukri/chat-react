import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Auth from "./pages/Auth/Auth.jsx"
import Messaging from "./containers/Messaging/Messaging.jsx";
import MessagingTest from "./containers/MessagingTesting/MessagingTest.jsx";
import './App.css'

function App() {
  return (
      <Router>
          <Routes>
              <Route path={'/'} element={<Auth/>}/>
              <Route path={'/messaging'} element={<Messaging/>}/>
              <Route path={'/messagingTest'} element={<MessagingTest/>}/>
          </Routes>
      </Router>
  )
}

export default App
