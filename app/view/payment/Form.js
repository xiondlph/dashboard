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
        xtype: 'gridpanel',
        title: 'История платежных операций',
        store: 'Payments',
        columns: [
            { text: 'Дата', dataIndex: 'datetime' },
            { text: 'Сумма', dataIndex: 'withdraw_amount' },
            { text: 'Запросы', dataIndex: '_quantity' },
            { text: 'Итог', dataIndex: '_requests' }
        ],
        width: 500
    }]
});
