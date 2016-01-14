
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
        itemId: 'infoForm',
        defaultType: 'textfield',
        title: 'Информация',
        bodyPadding: 10,
        defaults: {
            labelWidth: 120,
            readOnly: true,
            anchor: '100%'
        },
        items: [{
            fieldLabel: 'Запросов',
            dataIndex: 'requests',
            triggers: {
                foo: {
                    cls: 'my-foo-trigger',
                    handler: function() {
                        console.log('foo trigger clicked');
                    }
                },
                bar: {
                    cls: 'my-bar-trigger',
                    handler: function() {
                        console.log('bar trigger clicked');
                    }
                }
            }
        }, {
            fieldLabel: 'Ключ',
            dataIndex: 'key'
        }],
        store: 'Profile1'
    }, {
        xtype: 'form',
        itemId: 'settingForm',
        defaultType: 'textfield',
        responsiveCls: 'big-50 small-100',
        title: 'Настройки',
        bodyPadding: 10,
        defaults: {
            submitEmptyText: false,
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 120,
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
            text: 'Сохранить',
            formBind: true,
            listeners: {
                click: 'saveSettings'
            }
        }]
    }, {
        xtype: 'form',
        itemId: 'passwordForm',
        url: '/password/',
        defaultType: 'textfield',
        responsiveCls: 'big-50 small-100',
        title: 'Смена пароля',
        bodyPadding: 10,
        defaults: {
            submitEmptyText: false,
            inputType: 'password',
            labelWidth: 120,
            allowBlank: false,
            msgTarget: 'side',
            anchor: '100%'
        },
        items: [{
            blankText: 'Следует указать новый пароль',
            fieldLabel: 'Новый пароль',
            name: 'email'
        }, {
            blankText: 'Необходимо подтвердить новый пароль',
            fieldLabel: 'Подтверждение',
            name: 'address'
        }],
        buttons: [{
            text: 'Сменить',
            formBind: true,
            listeners: {
                click: 'saveSettings'
            }
        }]
    }]
});
