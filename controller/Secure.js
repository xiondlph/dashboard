/**!
 * Login controller
 *
 * @package    ismax
 * @subpackage Account Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Контроллер системы бозопасности
 **/

Ext.define('Ismax.controller.Secure', {
  extend: 'Ext.app.Controller',

  views:[
    'secure.Login',
    'secure.Change',
  ],

  lastData: null,
  lastFocus: null,

  init: function(App){
    this.control({
      'login button[action=signin]': {
        click: this.signin
      },

      'change button[action=save]': {
        click: this.change
      }
    });

    this.getController('Socket').setCommand('secure_forbidden', this.resForbidden);
  },


  // Форма авторизации
  formLogin: function(socket, data){
    var win = this.getController('Socket').endCommand();
    this.getController('Secure').lastData = data.data;
    this.getController('Secure').lastFocus = win;
    var loginForm = Ext.widget('login');
  },

  // Запрос на авторизацию
  signin: function(button){
    var win     = button.up('window'),
        form    = win.down('form'),
        values  = form.getValues();

    if(form.getForm().isValid()){
      win.setLoading('Вход...');
      Ext.Ajax.request({
        url: '/secure/signin',
        scope: this,
        jsonData: values,
        success: function(response, opts){
          var result = Ext.decode(response.responseText);
          win.setLoading(false);
          if(result.auth){
            this.getController('Desktop').createDesktop();
            win.close();
          }else{
            var msg = Ext.MessageBox.show({
              title: 'Ошибка',
              msg: 'Не верные Email или пароль!',
              buttons: Ext.MessageBox.OK,
              icon: Ext.MessageBox.ERROR
            });
          }
        },
        failure: function(response, opts){
          win.setLoading(false);
        }
      });
    }
  },


  // Форма смены пароля
  formChange: function(){
    var win = Ext.widget('change'); 
  },

  // Запрос на смену пароля
  change: function(button){
    var win     = button.up('window'),
        form    = win.down('form'),
        values  = form.getValues();

    if(form.getForm().isValid()){
      win.setLoading('Сохранения');

      Ext.Ajax.request({
        url: '/secure/change',
        scope: this,
        jsonData: {
          password: values.password
        },
        success: function(response, opts){
          var data = Ext.decode(response.responseText);
          win.setLoading(false);
          if(data.success){
            win.close();
            this.getController('Desktop').tip('profile_update', 'Пароль успешно изменен', true, null, this);
            //this.getController('Desktop').playNotification('notify');
          }
        },
        failure: function(response, opts){
          win.setLoading(false);
        }
      });
    }
  },

  resForbidden: function(socket, data){
    Ext.MessageBox.show({
      title: 'Ошибка',
      msg: 'Истекло время сессии!',
      buttons: Ext.MessageBox.OK,
      icon: Ext.MessageBox.ERROR,
      fn: function(){
        window.location.href="/";
      }
    });
  }
});