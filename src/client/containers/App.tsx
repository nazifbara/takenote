import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { LandingPage } from '@/components/LandingPage'
import { TakeNoteApp } from '@/containers/TakeNoteApp'
import { PublicRoute } from '@/router/PublicRoute'
import { PrivateRoute } from '@/router/PrivateRoute'
import { useAuthStore } from '@/store/auth'

const isDemo = process.env.DEMO

export const App: React.FC = () => {
  const { loading, login } = useAuthStore((state) => ({
    loading: state.loading,
    login: state.login,
  }))

  useEffect(() => {
    login()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="la-ball-beat">
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TakeNote</title>
        <link rel="canonical" href="https://takenote.dev" />
      </Helmet>

      <Switch>
        {isDemo ? (
          <>
            <Route exact path="/" component={LandingPage} />
            <Route path="/app" component={TakeNoteApp} />
          </>
        ) : (
          <>
            <PublicRoute exact path="/" component={LandingPage} />
            <PrivateRoute path="/app" component={TakeNoteApp} />
          </>
        )}

        <Redirect to="/" />
      </Switch>
    </HelmetProvider>
  )
}
