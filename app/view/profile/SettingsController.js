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
        btn.up('form').getRecord().set(btn.up('form').getValues());
        // btn.up('form').getRecord().save({
        //     failure: function(record, operation) {
        //         Ext.MessageBox.show({
        //             title: 'Ошибка',
        //             msg: 'Истекло время сессии!',
        //             buttons: Ext.MessageBox.OK,
        //             icon: Ext.MessageBox.ERROR
        //         });
        //     },
        //     success: function(record, operation) {
        //         // do something if the save succeeded
        //     },
        //     callback: function(record, operation, success) {
        //         // do something whether the save succeeded or failed
        //     }
        // });
    }
    
});