/**!
 * DataView View
 *
 * @package    ismax
 * @subpackage Account Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Внешнее представления
 * рабочей области стола
 **/

Ext.define('Ismax.view.desktop.View', {
  extend: 'Ext.view.View',
  alias: 'widget.desktopview',
  store: 'Shortcuts',
  initComponent: function(){
    var shortcutTpl = [
    '<tpl for=".">',
      '<div class="ismax_shortcut" id="{id}-shortcut">',
        '<div class="ismax_shortcut_img_{id}"></div>',
        '<div class="ismax_shortcut_title">{name}</div>',
      '</div>',
    '</tpl>',
    ];
    this.itemSelector = 'div.ismax_shortcut';
    this.selectedItemCls = 'selected';
    this.tpl = shortcutTpl;
    this.style = {
      position: 'absolute'
    };
    this.width = 100,
    this.x = 0;
    this.y = 0;
    this.cls = 'real_desktop'
    this.callParent(arguments);
  }
});