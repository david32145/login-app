import React from "react"
import {Router as BrowserRouter, Switch, Route} from "react-router-dom"


const Routes: React.FC = () => {
  return (
    <BrowserRouter >
      <Switch>
        <Route path="/login" exact>
          <h1>Login</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  ) 
}