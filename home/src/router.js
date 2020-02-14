import React from 'react'
import App from './App'
import Login from './pages/login/login'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from './pages/admin/admin'
import Footer from './pages/login/footer/footer'
import NoMatch from './pages/nomatch/nomatch'
import SysConf from './pages/admin/sysconfig/sysconfig'

class MyRouter extends React.Component {
    
    render() {
     
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/sysconf" component={SysConf} />
                                <Route exact component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    <Route path="/footer"  component={Footer} />
                </App>
            </HashRouter>
        )
    }
}
export default MyRouter