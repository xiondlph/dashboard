/**!
 * Categories Store
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Хранилище данных
 * дерева категорий
 **/
 
Ext.define('Ismax.store.Categories', {
  extend: 'Ext.data.TreeStore',
  model: 'Ismax.model.Category',
  proxy: {
    type: 'ajax',
    url: '/category/list',
    api: {
      create  : '/category/insert',
      read    : '/category/list',
      update  : '/category/list',
      destroy : '/category/remove'
    },
    reader: {
      type: 'json',
      root: 'categories',
      idProperty: '_id'
    }
  }
});