Ext.define('Admin.model.Payment', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [
        { name: '_id', type: 'auto' },
        { name: '_quantity', type: 'int' },
        { name: '_requests', type: 'int' },
        { name: 'datetime', type: 'auto' },
        { name: 'withdraw_amount', type: 'auto' }
    ]
});