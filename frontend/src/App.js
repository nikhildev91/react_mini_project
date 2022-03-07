import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import UserList from './Screens/UserList'
import UserEditScreen from './Screens/UserEditScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/login' element={<LoginScreen />} exact />
            <Route path='/register' element={<RegisterScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} exact />
            <Route path='/cart/:id' element={<CartScreen />} exact />
            <Route path='/admin/userlist' element={<UserList />} exact />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} exact />
            <Route path='/' element={<HomeScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
