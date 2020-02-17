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
        key:  '/admin/adminuser',
        icon: 'user',
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