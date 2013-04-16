/**!
 * Shortcuts Store
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Хранилище данных списка
 * иконок рабочего стола
 **/

Ext.define('Ismax.store.Shortcuts', {
  extend: 'Ext.data.Store',
  model: 'Ismax.model.Shortcut'
});