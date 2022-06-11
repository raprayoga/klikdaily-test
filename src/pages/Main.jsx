import React from 'react'
import Products from 'components/Products'
import DetailOrder from 'components/DetailOrder'
import Header from 'components/Header'


export default function Main() {
  return (
    <>
      <Header />
      <DetailOrder />
      <Products />
    </>
  )
}
