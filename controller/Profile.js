/**!
 * Profile controller
 *
 * @package    ismax
 * @subpackage Account Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Контроллер управления
 * профилем пользователя
 **/

Ext.define('Ismax.controller.Profile', {
  extend: 'Ext.app.Controller',

  models: [
    'Profile',
  ],

  stores: [
    'Profile'
  ],

  views: [
    'profile.Win',
  ],

  init: function(){
    this.control({
      'profile': {
        show: this.show
      },
      'profile button[action=update]': {
        click: this.update
      }
    });
  },

  // Запрос данных профиля при открытии окна
  show: function(win){
    win.down('form').setLoading('Загрузка');
    Ext.Ajax.request({
      url: '/profile/get',
      scope:this,
      success: function(response, opts){
        var data = Ext.decode(response.responseText);
        win.down('form').setLoading(false);
        if(data.success){
          this.getStore('Profile').loadRawData(data.profile);
          this.getController('Desktop').startMenu.title = data.profile.name;
          win.down('form').loadRecord(this.getStore('Profile').getAt(0));
        }
      },
      failure: function(response, opts){
        win.down('form').setLoading(false);
      }
    });
  },

  // Обновление данных профиля
  update: function(button){
    var win     = button.up('window'),
        form    = win.down('form'),
        record  = form.getRecord(),
        values  = form.getValues();

    if(form.getForm().isValid()){
      win.setLoading('Сохранение');
      Ext.Ajax.request({
        url: '/profile/update',
        scope: this,
        jsonData: {
          last: record.get('email'),
          profile: values
        },
        success: function(response, opts){
          var data = Ext.decode(response.responseText);
          win.setLoading(false);
          if(data.success){
            if(data.exist){
              form.getForm().findField('email').markInvalid('Данный Email уже занят');
            }else{
              record.set(values);
              this.getController('Desktop').tip('profile_update', 'Данные успешно обновлены', true, null, this);
              //this.getController('Desktop').playNotification('notify');
            }
          }
        },
        failure: function(response, opts){
          win.setLoading(false);
        }
      });
    }
  }
});