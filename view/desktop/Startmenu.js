/**!
 * Startmenu View
 *
 * @package    ismax
 * @subpackage Account Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Внешнее представления
 * главного меню рабочего стола
 **/

Ext.define('Ismax.view.desktop.Startmenu', {
  extend: 'Ext.menu.Menu',
  alias: 'widget.startmenu',
  height: 130,
  width: 300,
  initComponent: function(){
    var me = this;

    var toolbar = new Ext.toolbar.Toolbar({
      vertical: true,
      layout: {
        align: 'stretch'
      },
      items: [{
        text: 'Сменить пароль',
        action: 'change',
        iconCls: 'real_start_menu_icon_change',
        textAlign: 'left'
      }, {
        text: 'Выход',
        action: 'loguot',
        iconCls: 'real_start_menu_icon_logout',
        textAlign: 'left'
      }]
    });

    me.rbar = toolbar;

    this.callParent(arguments);
  }
});