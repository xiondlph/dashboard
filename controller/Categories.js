/**!
 * Categories controller
 *
 * @package    ismax
 * @subpackage Account Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Контроллер управления
 * категориями
 **/

Ext.define('Ismax.controller.Categories', {
  extend: 'Ext.app.Controller',

  models: [
    'Category',
  ],

  stores: [
    'Categories'
  ],

  views: [
    'categories.Win',
    'categories.Tree',
    'categories.Insert',
    'categories.Edit'
  ],

  // Выделеная категория в дереве
  activeRecord: null,

  init: function(){
    this.control({
      'categories':{
        show:             this.show
      },
  
      'categoriestree': {
        selectionchange:  this.categorySelect
      },

      'categories-insert button[action=save]': {
        click:            this.insert
      },

      'categories-edit button[action=save]': {
        click:            this.update
      },

      'categoriestree actioncolumn': {
        click:            this.categoryAction
      },

      'categoriestree > treeview': {
        beforedrop:       this.categoryDrop
      }
    });
  },

  // Запрос списка категорий при открытии окна
  show: function(win){
    //this.getStore('Categories').load();
  },

  // Определение активной категории
  categorySelect: function(model, rec){
    if(rec.length){      
      this.activeRecord = rec[0];
    }else{
      this.activeRecord = null;
    }
  },

  // Действия элемента списка предложения
  categoryAction: function(tree, row, col, index, e, rec){
    if(index == 1){
      this.formInsert(tree, rec);
    }

    if(index == 2){
      this.formEdit(tree, rec);
    }

    if(index == 3){
      this.remove(tree, rec);
    }

    e.stopEvent();
  },


  // Обработка действия перемещения
  categoryDrop: function(node, data, model, position, handlers){
    handlers.wait = true;
    if(position == 'append'){
      var rec     = data.records[0];
      var parent  = model;

      Ext.Ajax.request({
        url: '/category/move',
        scope: this,
        jsonData: {
          parentId: parent.get('_id'),
          id: rec.get('_id')
        },
        success: function(response, opts){
          var data = Ext.decode(response.responseText);
          if(data.success){
            handlers.processDrop();
          }
        },
        failure: function(response, opts){
          handlers.cancelDrop();
        }
      });

    };
  },

  // Форма вставки новогой категории
  formInsert: function(cmp, rec){
    this.activeRecord = rec;
    var win = Ext.widget('categories-insert');
  },

  // Запрос на вставку категории
  insert: function(cmp){
    var win     = cmp.up('window'),
        form    = win.down('form'),
        values  = form.getValues();

    if(form.getForm().isValid()){
      win.setLoading('Сохранение');
      Ext.Ajax.request({
        url: '/category/insert',
        scope: this,
        jsonData: {
          parentId: this.activeRecord.get('_id'),
          values:   values
        },
        success: function(response, opts){
          var data = Ext.decode(response.responseText);
          win.setLoading(false);
          if(data.success){
            this.activeRecord.appendChild(data.category);
            this.activeRecord.commit();
            this.activeRecord.expand();
            win.close();
          }
        },
        failure: function(response, opts){
          win.setLoading(false);
        }
      });
    }
  },

  // Форма редактирования категории
  formEdit: function(cmp, rec){
    this.activeRecord = rec;
    var win = Ext.widget('categories-edit');
    win.down('form').loadRecord(this.activeRecord);
  },

  // Запрос на обновление категории
  update: function(cmp){
    var win     = cmp.up('window'),
        form    = win.down('form'),
        values  = form.getValues();

    if(form.getForm().isValid()){
      win.setLoading('Сохранение');
      Ext.Ajax.request({
        url: '/category/update',
        scope: this,
        jsonData: {
          id:     this.activeRecord.get('_id'),
          values: values
        },
        success: function(response, opts){
          var data = Ext.decode(response.responseText);
          win.setLoading(false);
          if(data.success){
            this.activeRecord.set(values);
            this.activeRecord.commit();
            win.close();
          }
        },
        failure: function(response, opts){
          win.setLoading(false);
        }
      });
    }
  },

  // Запрос на удаление категории
  remove: function(cmp, rec){
    Ext.Msg.confirm('Выход', 'Вы действительно хотите удалить категорию?', function(opt){
      if(opt == 'yes'){
        var win     = cmp.up('window');
    
        win.setLoading('Сохранение');
        Ext.Ajax.request({
          url: '/category/remove',
          scope: this,
          jsonData: {
            id: rec.get('_id')
          },
          success: function(response, opts){
            var data = Ext.decode(response.responseText);
            win.setLoading(false);
            if(data.success){
              rec.remove();            
            }
          },
          failure: function(response, opts){
            win.setLoading(false);
          }
        });
      }
    }, this);
  }
});