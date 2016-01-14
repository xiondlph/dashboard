Ext.define('Admin.model.Profile', {
    extend: 'Ext.data.Model',
    idProperty: 'key',
    fields: [
        { name: 'email', type: 'auto' },
        { name: 'requests', type: 'int' },
        { name: 'address', type: 'auto' },
        { name: 'key', type: 'auto' }

    ],

    proxy: {
        type: 'rest',
        url : '/profile/get',
        appendId: false
    }
});
