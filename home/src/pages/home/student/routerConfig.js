export default [
    {
        title:'首页',
        key: '/stu/index',
        icon:"home"
    },
    {
        title:'个人信息设置',
        key:  '/stu/editUserInfo',
        icon: 'info',
    },
    {
        title: "选题管理",
        key: '/stu/setItem',
        icon: 'setting'
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