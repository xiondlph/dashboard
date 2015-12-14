
Ext.define("Admin.view.profile.Settings",{
    extend: "Ext.container.Container",

    requires: [
        "Admin.view.profile.SettingsController",
        "Admin.view.profile.SettingsModel",
        "Ext.ux.layout.ResponsiveColumn",
    ],

    controller: "profile-settings",
    layout: "responsivecolumn",
    viewModel: {
        type: "profile-settings"
    },

    items: [{
        xtype: 'form',
        url: '/profile/get',
        defaultType: 'textfield',
        responsiveCls: 'big-50 small-100',
        title: 'Настройки',
        bodyPadding: 10,
        defaults: {
            submitEmptyText: false,
            allowBlank: false,
            msgTarget: 'side',
            anchor: '100%'
        },
        items: [{
            blankText: 'Следует указать Email',
            fieldLabel: 'Email',
            name: 'email'
        }, {
            blankText: 'Необходимо привязать IP адрес',
            fieldLabel: 'IP адрес',
            name: 'address'
        }],
        buttons: [{
            text: 'Загрузить',
            listeners: {
                click: 'loadSettings'
            }
        }, {
            text: 'Сохранить',
            formBind: true,
            listeners: {
                click: 'saveSettings'
            }
        }]
    }]
});
