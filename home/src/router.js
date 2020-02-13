import React from 'react'
import App from './App'
import Login from './pages/login/login'
import { HashRouter, Route } from 'react-router-dom'
import Admin from './pages/admin/admin'
import Footer from './pages/login/footer/footer'
// import history from './pages/public/js/history'

class MyRouter extends React.Component {
    
    render() {
     
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/footer"  component={Footer} />
                </App>
            </HashRouter>
        )
    }
}
export default MyRouter