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
  model: 'Ismax.model.Shortcut',
  data: [
    {id: 'profile',     name: 'Профиль'},
    {id: 'categories',  name: 'Категории'},
    {id: 'objects',     name: 'Объекты'}
  ]
});