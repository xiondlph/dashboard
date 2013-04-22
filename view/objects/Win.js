/**!
 * Objects Window View
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Внешнее представления
 * окна модуля объектов
 **/


Ext.define('Ismax.view.objects.Win', {
  extend: 'Ext.window.Window',
  alias: 'widget.objects',
  id: 'objects',
  title: 'Категории',
  layout: 'fit',
  width: 740,
  height: 480,
  iconCls: 'real_icon_objects',
  bodyBorder: false,
  minimizable: true,
  maximizable: true,
  constrain: true,
  initComponent: function(){
    this.callParent(arguments);
  }
});