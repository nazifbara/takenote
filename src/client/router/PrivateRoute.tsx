import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useAuthStore } from '@/store/auth'

interface PrivateRouteProps extends RouteProps {
  component: any
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <Route
      render={(props) =>
        isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />
      }
      {...rest}
    />
  )
}
