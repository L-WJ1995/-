
let routes = [
    {
        path: '/',
        component: Login,
        name: '',
    },
    {
        path: '/home',
        component: Home,
        name: '',
        children: [
            { path: 'hotSpor', component: TableBox, name: 'hotSpor'},
            { path: 'startArticle', component: TableBox, name: 'startArticle' },
            { path: 'digitalCurrency', component: TableBox, name: 'digitalCurrency' },
            { path: 'technicalArticle', component: TableBox, name: 'technicalArticle' },
            { path: 'mediaSection', component: TableBox, name: 'mediaSection' },
            { path: 'expert', component: TableBox, name: 'expert' },
            { path: 'clickBox', component: clickBox, name: 'clickBox' },
        ],
    },
];
