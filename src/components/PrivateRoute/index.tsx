  
import * as React from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthService from 'services/AuthService'

type Props = {
  component: any,
  path: string,
  redirect: string,
}

const PrivateRoute: React.FC<Props> = ({component: Component, redirect, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      AuthService.hasDevice()
        ? (<Component {...props} />)
        : (<Redirect to={redirect} />)
    }
  />
)

export default PrivateRoute
