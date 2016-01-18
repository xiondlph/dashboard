Ext.define('Admin.store.Payments', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Payment',
    storeId: 'Payments',
    reader: {
        rootProperty: 'payments'
    },
    proxy: {
        type: 'rest',
        url : '/api/payment',
        appendId: false
    }
});