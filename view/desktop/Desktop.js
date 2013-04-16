/**!
 * Desktop View
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Внешнее представления
 * рабочего стола
 **/

Ext.define("Ismax.view.desktop.Desktop", {
  extend: 'Ext.panel.Panel',
  alias: 'widget.desktop',
  border: false,
  layout: 'fit',
  initComponent: function(){
    this.controller.startMenu = new Ismax.view.desktop.Startmenu();
    this.controller.windowBar = new Ext.toolbar.Toolbar({
      border:false,
      height:25,
      flex:1
    });
    this.controller.taskBar = new Ismax.view.desktop.Taskbar({
      controller:this.controller
    });
    this.controller.desktopview = new Ismax.view.desktop.View();
    this.tbar = this.controller.taskBar;
    this.items = [
      this.controller.desktopview
    ]
    this.callParent(arguments);
  }
});