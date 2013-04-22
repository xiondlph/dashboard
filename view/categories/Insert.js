/**!
 * Category Insert View
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Внешнее представления
 * формы вставки категории
 **/

Ext.define('Ismax.view.categories.Insert', {
  extend: 'Ext.window.Window',
  alias : 'widget.categories-insert',
  modal: true,
  title : 'Вставить категорию',
  autoShow: true,
  bodyBorder: false,
  border: false,

  initComponent: function(){
    this.items = [{
      xtype: 'form',
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
        name : 'name',
        id: 'name',
        fieldLabel: 'Название',
        allowBlank: false,
        blankText: 'Укажите название'
      }]
    }];

    this.buttons = [{
      text: 'Сохранить',
      action: 'save'
    }, {
      text: 'Отмена',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  }
});