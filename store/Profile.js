/**!
 * Profile Store
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Хранилище данных
 * профиля пользователя
 **/

Ext.define('Ismax.store.Profile', {
  extend: 'Ext.data.Store',
  model: 'Ismax.model.Profile'
});