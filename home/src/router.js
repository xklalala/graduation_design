import React from 'react'
import App from './App'
import Login from './pages/login/login'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Admin from './pages/admin/admin'
import Footer from './pages/login/footer/footer'
import NoMatch from './pages/nomatch/nomatch'
import SysConf from './pages/admin/sysconfig/sysconfig'
import AdminUser from './pages/admin/user/admin'
import Exit from './pages/public/js/exit'
import EditUserInfo from './pages/admin/editUserInfo/editUserInfo';

class MyRouter extends React.Component {
    
    render() {
     
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/exit" component={Exit} />
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route exact path="/" component={SysConf} />
                                <Route path="/admin/sysconf" component={SysConf} />
                                <Route path="/admin/adminuser" component={AdminUser} />
                                <Route path="/admin/editUserInfo" component={EditUserInfo} />
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