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
        xtype: 'panel',
        responsiveCls: 'big-100',
        plugins: 'responsive',
        responsiveConfig: {
            'width >= 1000': {
                layout: {
                    type: 'box',
                    align: 'stretch',
                    vertical: false
                }
            },

            'width < 1000': {
                layout: {
                    type: 'box',
                    align: 'stretch',
                    vertical: true
                }
            }
        },
        items: [{
            xtype: 'box',
            minWidth: 200,
            flex: 1,
            cls: 'bg-primary',
            html: '<p>Сумма внесенных Вами средств сразу же будет конвертирована в количество запросов , на которые не действует лимит.</p><p>Конвертация производится по тарифу:<br /><string>1 запрос = 0,1 руб. (10 коп.)</strong></p>'
        }, {
            xtype: 'form',
            itemId: 'payForm',
            defaultType: 'textfield',
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
                name: 'email'
            }],
            buttons: [{
                text: 'Оплатить',
                formBind: true,
                listeners: {
                    click: 'Pay'
                }
            }]
        }]
    }, {
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
