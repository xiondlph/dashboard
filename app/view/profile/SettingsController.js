Ext.define('Admin.view.profile.SettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.profile-settings',


    init: function(view) {
        var rec = new Admin.model.Profile({
            email: 'goff@smith.ru',
            requests: 9000,
            address: '127.0.0.1',
            key: '85d1fb3b78dfab1d14aebdb44d78eb9ff6b9811515e0698078ad93d7477dc370'
        });
        view.getComponent('infoForm').loadRecord(rec);
        rec.set('key', 'mishkas');
        console.log(view.getComponent('infoForm'));
    },

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