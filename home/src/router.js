import React from 'react'
import App from './App'
import Login from './pages/login/login'
import { HashRouter, Route } from 'react-router-dom'

class MyRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/" component={Login} />
                </App>
            </HashRouter>
        )
    }
}
export default MyRouter