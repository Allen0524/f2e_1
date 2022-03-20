import React from 'react'
import Header from '../Header/Header'
import LoadingIndicator from '../LoadingIndicator'
import Router from 'next/router'

const Layout = ({children}) => {
  const [iseFetching, setIsFetching] = React.useState(false)
  Router.events.on('routeChangeStart', url => {
    setIsFetching(true)
  })
  Router.events.on('routeChangeComplete', url => {
    setIsFetching(false)
  })

  return (
    <div>
      <Header />
      ``
      {children}
      {iseFetching ? <LoadingIndicator /> : null}
    </div>
  )
}

export default Layout
