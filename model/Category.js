/**!
 * Category Model
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Модель данныйх категорий
 **/

Ext.define('Ismax.model.Category', {
  extend: 'Ext.data.Model',
  idProperty: '_id',
  fields: [
    { name: '_id' },
    { name: 'name' }
  ]
});