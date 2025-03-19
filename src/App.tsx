import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Products from "./pages/Products.tsx";
import Orders from "./pages/Orders.tsx";
import SignIn from "./pages/SignIn.tsx";
import {ToastProvider} from "./context/ToastContext.tsx";
import ToastContainer from "./components/ToastContainer.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import NewProduct from "./pages/NewProduct.tsx";
import UpdateProduct from "./pages/UpdateProduct.tsx";

function App() {

  return (
      <ToastProvider>
          <Router>
              <Routes>
                  <Route path='/signin' element={<SignIn/>}/>
                  <Route element={<Layout/>}>
                      <Route path='/' element={<Dashboard/>}/>
                      <Route path='/products' element={<Products/>}/>
                      <Route path='/product/:id' element={<ProductDetails/>}/>
                      <Route path='/product/:id/edit' element={<UpdateProduct/>}/>
                      <Route path='/new-product' element={<NewProduct/>}/>
                      <Route path='/orders' element={<Orders/>}/>
                  </Route>
              </Routes>
          </Router>
          <ToastContainer/>
      </ToastProvider>
  )
}

export default App
