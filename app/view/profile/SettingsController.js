Ext.define('Admin.view.profile.SettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profile-settings',

    loadSettings: function (btn) {
        btn.up('form').setLoading('Загрузка');
        btn.up('form').load({
            method: 'get'
        });
    },

    saveSettings: function (btn) {
        btn.up('form').submit();
    }
    
});