/**!
 * Profile Window View
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Внешнее представления
 * окна модуля управления
 * профилем
 **/


Ext.define('Ismax.view.profile.Win', {
  extend: 'Ext.window.Window',
  alias: 'widget.profile',
  id: 'profile',
  title: 'Профиль',
  layout: 'fit',
  width: 740,
  height: 480,
  iconCls: 'real_icon_profile',
  bodyBorder: false,
  minimizable: true,
  maximizable: true,
  constrain: true,
  initComponent: function(){
    this.items = [{
      layout: 'fit',
      xtype: 'form',
      bodyBorder: false,
      border: false,
      bodyPadding: 5,
      waitMsgTarget: true,
      fieldDefaults: {
        validateOnBlur: false,
        validateOnChange: false,
        msgTarget: 'side'
      },
      items: [{
        xtype: 'tabpanel',
        layout: 'fit',
        items: [{
          title: 'Аккаунт',
          bodyPadding: 5,
          layout: 'hbox',
          items: [{
            xtype: 'fieldset',
            title: 'Контакты',
            layout: 'anchor',
            flex: 1,
            margin:5,
            items: [{
              xtype: 'textfield',
              name : 'name',
              id: 'name',
              fieldLabel: 'Имя',
              allowBlank: false,
              blankText: 'Укажите Ваше имя'
            }, {
              xtype: 'textfield',
              name : 'email',
              id: 'email',
              fieldLabel: 'Email',
              allowBlank: false,
              blankText: 'Укажите Email'
            }]
          },{
            xtype: 'fieldset',
            title: 'Информация',
            layout: 'anchor',
            flex: 1,
            margin: 5,
            items: [{
              xtype: 'textfield',
              name : 'company',
              id: 'company',
              fieldLabel: 'Компания',
              allowBlank: false,
              blankText: 'Укажите название компании'
            }]
          }]
        }]
      }]
    }];

    this.buttons = [{
      text: 'Сохранить',
      action: 'update'
    }, {
      text: 'Отмена',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  }
});