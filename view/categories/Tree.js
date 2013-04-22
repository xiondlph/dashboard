/**!
 * Categories tree View
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Внешнее представления
 * дерева категорий
 **/

Ext.define('Ismax.view.categories.Tree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.categoriestree',
  layout: 'fit',
  border: false,
  bodyBorder: false,
  hideHeaders: true,
  rootVisible: false,
  multiSelect: false,
  singleExpand: true,  
  initComponent: function(){
    this.tbar = [{
      text: 'Добавить',
      action: 'new'
    }];

    this.columns = [{
      xtype: 'treecolumn',
      dataIndex: 'name',
      resizable:false,
      sortable: false,
      hideable: false,
      flex: 1
    }, { 
      xtype: 'actioncolumn',
      width: 20,
      resizable:false,
      sortable: false,
      hideable: false,
      tooltip: 'Добавить',
      icon: '/resources/images/add16x16.png'      
    }, { 
      xtype: 'actioncolumn',
      width: 20,
      resizable:false,
      sortable: false,
      hideable: false,
      tooltip: 'Редактировать',
      icon: '/resources/images/edit16x16.png'
    }, {
      text: 'Удалить',  
      xtype: 'actioncolumn',
      width: 20,
      resizable:false,
      sortable: false,
      hideable: false,
      tooltip: 'Удалить',
      icon: '/resources/images/trashfull16x16.png'
    }];

    this.viewConfig = {
      plugins: {
        ptype: 'treeviewdragdrop',
        containerScroll: true
      }
    };

    this.store = 'Categories';
    this.useArrows = true;

    this.callParent(arguments);
  }
});