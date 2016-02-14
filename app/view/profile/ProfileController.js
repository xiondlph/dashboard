Ext.define('Admin.view.profile.ProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profile-profile',

	init: function(view) {
        var me              = this,
            profileStore    = Ext.data.StoreManager.lookup('Profile');

        profileStore.on('load', this.profileLoad, this);
        if (profileStore.isLoaded()) {
            this.profileLoad(profileStore);
        }
    },

    boxready: function (view) {
        var profileStore = Ext.data.StoreManager.lookup('Profile');
        if (profileStore.isLoaded()) {
            return;
        }

        view.getComponent('infoForm').setLoading('Загрузка');
        view.getComponent('settingForm').setLoading('Загрузка');

        Ext.create('Ext.tip.ToolTip', {
            target: view.getComponent('settingForm').items.getAt(1).getTrigger('hint').getEl(),
            html: 'В целях безопасности, доступ к API осуществляться исключительно с IP адреса привязанного к Вашему аккаунту.'
        });

        Ext.create('Ext.tip.ToolTip', {
            target: view.getComponent('infoForm').items.getAt(0).getTrigger('payment').getEl(),
            html: 'Пополнить запросы'
        });

        Ext.create('Ext.tip.ToolTip', {
            target: view.getComponent('infoForm').items.getAt(0).getTrigger('hint').getEl(),
            html: 'Запросы - показатель количества запросов для Вашего аккаунта, на которые не действует лимит.'
        });

        Ext.create('Ext.tip.ToolTip', {
            target: view.getComponent('infoForm').items.getAt(1).getTrigger('hint').getEl(),
            html: 'Копировать в буфер.',
            hideDelay: 500
        });
    },

    profileLoad: function (store, records, successful, operation) {
        this.getViewModel().setData({User: store.getAt(0)});

        this.getView().getComponent('infoForm').loadRecord(store.getAt(0));
        this.getView().getComponent('settingForm').loadRecord(store.getAt(0));

        this.getView().getComponent('infoForm').setLoading(false);
        this.getView().getComponent('settingForm').setLoading(false);
    },

    saveSettings: function (btn) {
        var form    = btn.up('form'),
            record  = form.getRecord();

        record.set(form.getValues(), {silent: true});
        if (!record.isModified('email') && !record.isModified('address')) {
            return;
        }

        form.setLoading('Сохранение');
        btn.up('form').getRecord().save({
            success: function(record, operation) {
                btn.up('form').getRecord().commit();
                Ext.toast({
                    html: 'Новые настройки сохранены'
                });
            },
            callback: function(record, operation, success) {
                form.setLoading(false);
            }
        });
    },

    savePassword: function (btn) {
        var form    = btn.up('form');

        form.setLoading('Сохранение');
        form.submit({
            failure: function(record, operation) {
                form.setLoading(false);
            },
            success: function(record, operation) {
                form.reset();
                form.setLoading(false);
                Ext.toast({
                    html: 'Новый пароль сохранен'
                });
            }
        })
    },

    goPayment: function () {
        this.redirectTo('payment');
    },

    copyKey: function (field) {
        field.focus().selectText();
        try {
            var successful = document.execCommand('copy');
        } catch (err) {
            console.info('Cope failed');
        }
    }
});
