/**!
 * Change Form View
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Окно формы смены Email и пароля
 **/
Ext.define('Ismax.view.secure.Chpwd', {
  extend: 'Ext.window.Window',
  alias : 'widget.chpwd',
  id: 'Chpwd',
  modal: true,
  title : 'Смена пароля',
  autoShow: true,
  bodyBorder: false,
  border: false,
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
        width: 350
      },
      items: [{
        xtype: 'textfield',
        name : 'password',
        fieldLabel: 'Новый пароль',
        allowBlank: false,
        blankText:'Укажите пароль',
        inputType: 'password'
      }, {
        xtype: 'textfield',
        id: 'confirm',
        fieldLabel: 'Подтверждения',
        allowBlank: false,
        blankText: 'Подтвердите введенный пароль',
        inputType: 'password',
        validator: function(value){
          var password = this.up('form').getForm().findField('password').getValue();
          if(password == value){
            return true;
          }else{
            return 'Пароли не совпадают';
          }
        }
      }]
    }];

    this.buttons = [{
      text: 'Сохранить',
      action: 'save'
    },{
      text: 'Отмена',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  }
});