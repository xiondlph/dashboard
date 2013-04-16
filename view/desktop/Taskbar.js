/**!
 * Taskbar View
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Внешнее представления
 * панели задач рабочего стола
 **/

Ext.define('Ismax.view.desktop.Taskbar', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.taskbar',
  initComponent: function(){
    this.items = [{
      xtype: 'button',
      iconCls: 'real_start_button_icon',
      menu: this.controller.startMenu
    },
      '-',
      this.controller.windowBar
    ]
    this.callParent(arguments);
  },
});