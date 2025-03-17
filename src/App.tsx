import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Products from "./pages/Products.tsx";
import Orders from "./pages/Orders.tsx";

function App() {

  return (
      <Router>
          <Routes>
              <Route element={<Layout/>}>
                  <Route path='/' element={<Dashboard/>}/>
                  <Route path='/products' element={<Products/>}/>
                  <Route path='/orders' element={<Orders/>}/>
              </Route>
          </Routes>
      </Router>
  )
}

export default App
