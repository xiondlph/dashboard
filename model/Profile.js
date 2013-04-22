/**!
 * Profile Model
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Модель данныйх профиля
 **/

Ext.define('Ismax.model.Profile', {
  extend: 'Ext.data.Model',
  idProperty: '_id',
  fields: [
    { name: '_id' },
    { name: 'email' },
    { name: 'name' },
    { name: 'company' }
  ]
});