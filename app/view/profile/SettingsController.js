Ext.define('Admin.view.profile.SettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profile-settings',


    init: function(view) {
        var me              = this,
            profileStore    = Ext.data.StoreManager.lookup('Profile');


        view.getComponent('infoForm').setLoading('Загрузка');
        view.getComponent('settingForm').setLoading('Загрузка');
        profileStore.load(function(records, operation, success) {
            me.getViewModel().setData({User: profileStore.getAt(0)});

            view.getComponent('infoForm').loadRecord(profileStore.getAt(0));
            view.getComponent('settingForm').loadRecord(profileStore.getAt(0));

            view.getComponent('infoForm').setLoading(false);
            view.getComponent('settingForm').setLoading(false);
        });
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
            failure: function(record, operation) {
                Ext.MessageBox.show({
                    title: 'Ошибка',
                    msg: 'Действие временно недоступно. Попробуйте повторить позже!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            },
            success: function(record, operation) {
                btn.up('form').getRecord().commit();
            },
            callback: function(record, operation, success) {
                form.setLoading(false);
            }
        });
    }
    
});