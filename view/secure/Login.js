/**!
 * Login Form View
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Окно формы авторизации
 **/
Ext.define('Ismax.view.secure.Login', {
  extend: 'Ext.window.Window',
  alias : 'widget.login',
  id: 'login',
  modal: true,
  title : 'Авторизация',
  autoShow: true,
  bodyBorder: false,
  border: false,
  closable: false,
  resizable: false,
  closeAction: 'destroy',

  initComponent: function(){
    this.items = [{
      xtype: 'form',
      bodyStyle: 'background:#e7d3b2;',
      bodyBorder: false,
      bodyPadding: 5,
      waitMsgTarget: true,
      fieldDefaults: {
        validateOnBlur: false,
        validateOnChange: false,
        msgTarget: 'side',
        width: 200
      },
      items: [{
        xtype: 'textfield',
        name : 'email',
        fieldLabel: false,
        allowBlank: false,
        emptyText: 'Email',
        blankText: 'Укажите Email',
        vtype: 'email',
        vtypeText: 'Неверный формат Email'
      }, {
        xtype: 'textfield',
        name : 'password',
        fieldLabel: false,
        allowBlank: false,
        emptyText: 'Пароль',
        blankText: 'Укажите пароль',
        inputType: 'password'
      }]
    }];

    this.buttons = [{
      text: 'Вход',
      action: 'signin'
    }];

    this.callParent(arguments);
  }
});