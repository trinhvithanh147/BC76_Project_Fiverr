import React from 'react'
import HeaderTemplete from './components/HeaderTemplete'
import { Outlet } from 'react-router-dom'
import FooterTemplete from './components/FooterTemplete'

const HomeTemplate = () => {
  return (
    <>
      <HeaderTemplete />
      <Outlet /> 
      
      <FooterTemplete />
    </>
  );
}

export default HomeTemplate
