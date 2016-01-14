Ext.define('Admin.view.profile.SettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profile-settings',


    init: function(view) {
        var rec = new Admin.model.Profile();

        view.getComponent('infoForm').setLoading('Загрузка');
        view.getComponent('settingForm').setLoading('Загрузка');
        rec.load({
            success: function (record, operation) {
                view.getComponent('infoForm').loadRecord(record);
                view.getComponent('settingForm').loadRecord(record);
            },
            callback: function(record, operation, success) {
                view.getComponent('infoForm').setLoading(false);
                view.getComponent('settingForm').setLoading(false);
            }
        });
    },

    saveSettings: function (btn) {
        btn.up('form').getRecord().set(btn.up('form').getValues())
        console.log(btn.up('form').getRecord());
        btn.up('form').getRecord().save();
    }
    
});