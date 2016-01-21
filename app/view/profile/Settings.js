Ext.apply(Ext.form.field.VTypes, {
    password: function (val, field) {
        if (field.initialPassField) {
            var pwd = field.up().getComponent(field.initialPassField).getValue();
            return (val === pwd);
        }
        return true;
    },
    passwordText: 'Пароли не совпадают'
});

Ext.define("Admin.view.profile.Settings",{
    extend: "Ext.container.Container",

    requires: [
        "Admin.view.profile.SettingsController",
        "Admin.view.profile.SettingsModel",
        "Ext.ux.layout.ResponsiveColumn"
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
                glyphed: {
                    cls: 'trigger-glyph-noop auth-email-trigger'
                }
            }
        }, {
            fieldLabel: 'Ключ',
            dataIndex: 'key'
        }]
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
        url: '/api/password',
        defaultType: 'textfield',
        responsiveCls: 'big-50 small-100',
        title: 'Смена пароля',
        bodyPadding: 10,
        defaults: {
            submitEmptyText: false,
            validateOnBlur: false,
            inputType: 'password',
            labelWidth: 120,
            allowBlank: false,
            msgTarget: 'side',
            anchor: '100%'
        },
        items: [{
            blankText: 'Следует указать новый пароль',
            fieldLabel: 'Новый пароль',
            itemId: 'password',
            name: 'password'
        }, {
            blankText: 'Необходимо подтвердить новый пароль',
            initialPassField: 'password',
            fieldLabel: 'Подтверждение',
            name: 'confirm',
            vtype: 'password'
        }],
        buttons: [{
            text: 'Сохранить',
            formBind: true,
            listeners: {
                click: 'savePassword'
            }
        }]
    }]
});
