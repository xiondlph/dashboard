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
            text:   'Оплата',
            view:   'payment.Form',
            leaf:   true,
            iconCls: 'x-fa fa-credit-card',
            routeId: 'payment'
        }, {
            text:   'Помощь',
            view:   'pages.BlankPage',
            leaf:   true,
            iconCls: 'x-fa fa-question',
            routeId: 'dashboard'
        }]
    },
    fields: [
        {
            name: 'text'
        }
    ]
});
