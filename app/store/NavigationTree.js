Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',

    storeId: 'NavigationTree',
    root: {
        expanded: true,
        children: [{
            text:   'Профиль',
            view:   'profile.Settings',
            leaf:   true,
            iconCls: 'x-fa fa-user',
            routeId:'profile'
        }, {
            text:   'Пустая страница',
            view:   'pages.BlankPage',
            leaf:   true,
            iconCls: 'right-icon x-fa fa-desktop',
            routeId: 'dashboard'
        }]
    },
    fields: [
        {
            name: 'text'
        }
    ]
});
