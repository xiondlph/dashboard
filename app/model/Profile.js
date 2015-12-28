Ext.define('Admin.model.Profile', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'email', type: 'auto' },
        { name: 'requests', type: 'int' },
        { name: 'address', type: 'auto' },
        { name: 'key', type: 'auto' }

    ]
});
