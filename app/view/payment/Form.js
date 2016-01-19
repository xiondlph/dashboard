Ext.define("Admin.view.payment.Form",{
    extend: "Ext.container.Container",

    requires: [
        "Admin.view.payment.FormController",
        "Admin.view.payment.FormModel",
        "Ext.ux.layout.ResponsiveColumn"
    ],

    controller: "payment-form",
    layout: "responsivecolumn",
    viewModel: {
        type: "payment-form"
    },

    items: [{
        title: 'История платежных операций',
        items: [{
            xtype: 'gridpanel',
            store: 'Payments',
            columns: [
                { text: 'Дата', dataIndex: 'datetime', flex: 1},
                { text: 'Сумма (руб.)', dataIndex: 'withdraw_amount', flex: 1},
                { text: 'Запросы', dataIndex: '_quantity', flex: 1},
                { text: 'Итого', dataIndex: '_requests', flex: 1}
            ],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: 'Payments',
                dock: 'bottom',
                displayInfo: true
            }]
        }]
    }]
});
