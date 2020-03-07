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
import EditUserInfo from './pages/admin/editUserInfo/index';
import AdminAccount from './pages/admin/account/admin'
import TeacherAccount from './pages/admin/account/teacher/teacher'
import StudentAccount from './pages/admin/account/student/student'
import StudentList from './pages/admin/account/student/studentList'
import TeacherIndex from './pages/home/teacher/index/index'
import TeacherUser from './pages/home/teacher/user/index'
import TeacherSetItem from './pages/home/teacher/xt/xt'
import TeacherSetItemDetail from './pages/home/teacher/xt/xtDetail'
import Student  from './pages/home/student/index/student'
import StudentXt from './pages/home/student/xt/xt'
import StuXt from './pages/home/student/xt/stuxt'
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
                                {/* 系统设置 */}
                                <Route path="/admin/sysconf" component={SysConf} />

                                <Route path="/admin/adminuser" component={AdminUser} />
                                {/* 用户信息 */}
                                <Route path="/admin/editUserInfo" component={EditUserInfo} />
                                <Route path="/admin/user/adminuser" component={AdminAccount} />
                                <Route path="/admin/user/teauser" component={TeacherAccount} />
                                <Route path="/admin/user/stuuser" component={StudentAccount} />
                                <Route path="/admin/user/stulist/:year" component={StudentList} />

                                <Route exact component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    <Route path="/teacher" render={()=>
                        <TeacherIndex>
                            <Switch>
                                <Route path="/teacher/editUserInfo" component={TeacherUser} />
                                <Route exact path="/teacher/setItem" component={TeacherSetItem} />
                                <Route path="/teacher/setItem/:year" component={TeacherSetItemDetail} />
                                <Route exact component={NoMatch} />
                            </Switch>
                         </TeacherIndex>} 
                    />
                    
                    <Route path="/stu" render={()=>
                        <Student>
                            <Switch>
                            <Route path="/teacher/editUserInfo" component={TeacherUser} /> 
                            <Route path="/stu/xt" component={StuXt} /> 
                            {/* <Route path="/stu/index" component={StudentXt} />  */}
                            
                            <Route exact component={StudentXt} />
                            </Switch>
                        </Student>
                    } />

                    <Route path="/footer"  component={Footer} />
                </App>
            </HashRouter>
        )
    }
}
export default MyRouter