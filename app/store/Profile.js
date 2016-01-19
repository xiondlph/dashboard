Ext.define('Admin.store.Profile', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Profile',
    storeId: 'Profile',

    proxy: {
        type: 'rest',
        url : '/api/profile',
        appendId: false
    }
});