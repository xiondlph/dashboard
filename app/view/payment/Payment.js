
Ext.define("Admin.view.payment.Payment",{
    extend: "Ext.container.Container",

    requires: [
        "Admin.view.payment.PaymentController",
        "Admin.view.payment.PaymentModel",
        "Ext.ux.layout.ResponsiveColumn"
    ],

    controller: "payment-payment",
    viewModel: {
        type: "payment-payment"
    },

    layout: "responsivecolumn",
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
            }],
            height: 250
        }]
    }, {
        xtype: 'form',
        itemId: 'payForm',
        defaultType: 'numberfield',
        responsiveCls: 'big-50 small-100',
        flex: 1,
        title: 'Оплатить',
        bodyPadding: 10,
        defaults: {
            submitEmptyText: false,
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 120,
            anchor: '100%'
        },
        items: [{
            blankText: 'Следует указать сумму',
            fieldLabel: 'Сумма (руб.)',
            validateOnBlur: false,
            maxValue: 10000,
            minValue: 0,
            value: 1000,
            name: 'sum'
        }],
        buttons: [{
            text: 'Оплатить',
            formBind: true,
            listeners: {
                click: 'Pay'
            }
        }]
    }]
});
