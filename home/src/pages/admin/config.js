export default [
    {
        title:'首页',
        key: '/index/home',
        icon:"home"
    },
    {
        title:'系统配置',
        key:'/admin/sysconf',
        icon: "tool"
    },
    {
        title:'用户管理',
        icon: 'user',
        key: '/admin/usermanage',
        children: [
            {
                title: '管理员账号',
                key: '/admin/user/adminuser',
                icon: 'user',
            },
            {
                title: '教师账号',
                key: '/admin/user/teauser',
                icon: 'user',
            },
            {
                title: '学生账号',
                key: '/admin/user/stuuser',
                icon: 'user',
            }
        ]
    },
    {
        title:'个人信息设置',
        key:  '/admin/editUserInfo',
        icon: 'info',
    },
    {
        title:'个人信息管理',
        key:'/index/C',
        children: [
            {
                title: 'ThinkPHP',
                key: '/index/C/tp'
            },
            {
                title: 'Swoole',
                key: '/index/C/swoole'
            },
            {
                title: 'Laravel',
                key: '/index/C/Laravel'
            }
        ]
    }
]