/**!
 * Categories Window View
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Внешнее представления
 * окна модуля категорий
 **/


Ext.define('Ismax.view.categories.Win', {
  extend: 'Ext.window.Window',
  alias: 'widget.categories',
  id: 'categories',
  title: 'Категории',
  layout: 'fit',
  width: 740,
  height: 480,
  iconCls: 'real_icon_categories',
  bodyBorder: false,
  minimizable: true,
  maximizable: true,
  constrain: true,
  initComponent: function(){
		this.items = [{
      xtype:'categoriestree'
    }];

    this.callParent(arguments);
  }
});