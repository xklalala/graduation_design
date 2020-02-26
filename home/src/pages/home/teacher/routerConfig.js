export default [
    {
        title:'首页',
        key: '/index/home',
        icon:"home"
    },
    {
        title:'个人信息设置',
        key:  '/teacher/editUserInfo',
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