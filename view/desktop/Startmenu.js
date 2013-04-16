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

  initComponent: function(){
    var me = this;

    var toolbar = new Ext.toolbar.Toolbar({
      vertical: true,
      layout: {
        align: 'stretch'
      },
      items: [{
        text: 'Сменить пароль',
        action: 'chpwd',
        iconCls: 'real_start_menu_icon_chpwd'
      }, {
        text: 'Выход',
        action: 'loguot',
        iconCls: 'real_start_menu_icon_logout'
      }]
    });

    me.rbar = toolbar;

    this.callParent(arguments);
  }
});