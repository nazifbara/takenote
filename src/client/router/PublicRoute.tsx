import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useAuthStore } from '@/store/auth'

interface PublicRouteProps extends RouteProps {
  component: any
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <Route
      render={(props) =>
        isAuthenticated === false ? <Component {...props} /> : <Redirect to="/app" />
      }
      {...rest}
    />
  )
}
