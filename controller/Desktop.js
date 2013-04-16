/**!
 * Desktop controller
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Контроллер рабочего стола
 * интерфейса управления аккаунтом
 **/

Ext.define('Ismax.controller.Desktop', {
  extend: 'Ext.app.Controller',

  models: [
    'Shortcut'
  ],

  stores: [
    'Shortcuts'
  ],

  views: [
    'desktop.Desktop',
    'desktop.Taskbar',
    'desktop.Startmenu',
    'desktop.View'
  ],

  init: function() {
    this.windows = new Ext.util.MixedCollection();

    this.control({
      'desktopview': {
        itemclick: this.onShortcutItemClick
      },
      'startmenu toolbar button[action=loguot]': {
        click: this.signout
      },
      'startmenu toolbar button[action=chpwd]': {
        click: this.chpwd
      }
    });

    this.getController('Socket').setCommand('error', this.showError);
  },

  /**
   * Блок методов рабочего стола
   */

  // Создание объекта рабочего стола
  createDesktop: function(){
    if(!this.desktop){
      this.desktop = Ext.widget('desktop', {controller: this});
      Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        items:[
          this.desktop
        ]
      });

      this.desktop.setLoading('Загрузка');
      Ext.Ajax.request({
        url: '/desktop/env',
        scope:this,
        success: function(response, opts){
          var data = Ext.decode(response.responseText);
          this.desktop.setLoading(false);
          if(data.success){
            this.getStore('Shortcuts').loadData(data.shortcuts);
            
            // Формирования пунктов главного меню
            for(i = 0; i < data.shortcuts.length; i++){
              this.getController('Desktop').startMenu.add({
                text: data.shortcuts[i].name,
                itemId: data.shortcuts[i].id,
                iconCls: 'real_icon_'+data.shortcuts[i].id,
                handler: this.getController('Desktop').startMenuItemClick,
                scope: this.getController('Desktop')
              });
            }

            // Заполнения хранилища профиля
            this.getStore('Profile').loadRawData(data.operator);
            this.getController('Desktop').startMenu.title = data.operator.name;
        
            // Формирования списка предложений
            this.getStore('Offers').loadData(data.offers);
            for(i=0; i<data.offers.length; i++){
              this.getController('Offers')
                .getParamStore(data.offers[i]._id)
                .loadData(data.offers[i].params);
            }

            // Открытие сокет соединения
            this.getController('Socket').open();
          }
        }
      });

      // Перехват аякс запросов для проверки авторизации
      Ext.Ajax.on('requestcomplete',function(conn, response, options){
        var data = Ext.decode(response.responseText);
        if(!data.auth){
          Ext.MessageBox.show({
            title: 'Ошибка',
            msg: 'Истекло время сессии!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR,
            fn: function(){
              window.location.href="/";
            }
          });
        };     
      }, this);

      // Перехват ошибок аякс запросов
      Ext.Ajax.on('requestexception',function(conn, response, options){
        Ext.MessageBox.show({
          title: 'Ошибка',
          msg: 'Ошибка соединения!',
          buttons: Ext.MessageBox.OK,
          icon: Ext.MessageBox.ERROR
        });
    
      }, this);
    }
  },

  // Получения объекта рабочего стола
  getDesktop: function(){
    return this.desktop;
  },

  // Сообщения о сокет ошибки
  showError: function(socket, data){
    var win = this.getController('Socket').endCommand();
    win.setLoading(false);
    var msg = Ext.MessageBox.show({
      title: 'Ошибка',
      msg: 'Ошибка соединения!',
      buttons: Ext.MessageBox.OK,
      icon: Ext.MessageBox.ERROR
    });
    //this.getController('Desktop').getDesktopZIndexManager().register(msg);
  },

  /**
   * Блок методов обработки событий
   * рабочей области стола
   */

  // Обработчик нажатия иконок
  onShortcutItemClick: function(dataView, record){
    var win = this.windows.get(record.get('id'));
    if(!win){
      this.createWindow(record.get('id'));
    }

    if(win){
      this.restoreWindow(win);
    }
  },

  /**
   * Блок методов работы с окнами
   */

  // Создание окна
  createWindow: function(module){
    var win = Ext.widget(module);
    this.windows.add(win);

    win.taskButton = this.addTaskButton(win);

    win.animateTarget = win.taskButton;

    win.on({
      activate: this.updateActiveWindow,
      beforeshow: this.updateActiveWindow,
      deactivate: this.updateActiveWindow,
      minimize: this.minimizeWindow,
      destroy: this.onWindowClose,
      scope: this
    });
    win.show();
  },

  // Получения z-index менеджера
  getDesktopZIndexManager: function(){
    var windows = this.windows;
    return (windows.getCount() && windows.getAt(0).zIndexManager) || null;
  },

  // Получения активного окна
  getActiveWindow: function(){
    var win = null,
        zmgr = this.getDesktopZIndexManager();

    if(zmgr){
      zmgr.eachTopDown(function(comp){
        if (comp.isWindow && !comp.hidden){
          win = comp;
          return false;
        }
        return true;
      });
    }

    return win;
  },

  // Обновления состояния активности окон
  updateActiveWindow: function(){
    var me = this,
        activeWindow = me.getActiveWindow(),
        last = me.lastActiveWindow;

    if(activeWindow === last){
      return;
    }

    if(last){
      last.active = false;
    }

    me.lastActiveWindow = activeWindow;

    if(activeWindow){
      activeWindow.minimized = false;
      activeWindow.active = true;
    }

    me.setActiveButton(activeWindow && activeWindow.taskButton);
  },

  // Минимизирование окна
  minimizeWindow: function(win){
    win.minimized = true;
    win.hide();
  },

  // Востановление окна
  restoreWindow: function(win){
    if (win.isVisible()){
      win.restore();
      win.toFront();
    }else{
      win.show();
    }
    return win;
  },

  /**
   * Блок методов обработы оконных событий 
   */

  // Обработка события закрытия окна
  onWindowClose: function(win){
    this.removeTaskButton(win.taskButton);
    this.windows.remove(win);
    this.updateActiveWindow();
  },


  /**
   * Методы работы с панелью задачь
   */

  // Добавления кнопки окна
  addTaskButton: function(win){
    var btn = this.windowBar.add({
      iconCls: win.iconCls,
      enableToggle: true,
      toggleGroup: 'all',
      text: Ext.util.Format.ellipsis(win.title, 20),
      listeners: {
          click: this.onWindowBtnClick,
          scope: this
      },
      win: win
    });
    btn.toggle(true);
    return btn;
  },

  // Удаления кнопки окна
  removeTaskButton: function(btn){
    this.windowBar.remove(btn);
  },

  // Установления активной кнопки окна
  setActiveButton: function(btn) {
    if(btn){
      btn.toggle(true);
    }else{
      this.windowBar.items.each(function(item){
        if (item.isButton) {
          item.toggle(false);
        }
      });
    }
  },

  /**
   * Методы обработки событий
   * панели задачь
   */

  // Обработка события нажатия кнопки панели задачь
  onWindowBtnClick: function(btn){
    var win = btn.win;
    if (win.minimized || win.hidden){
      win.show();
    }else if(win.active){
      win.minimize();
    }else{
      win.toFront();
    }
  },

  // При нажатии пунктов главного меню
  startMenuItemClick: function(menu, e){
    var win = this.windows.get(menu.itemId);
    if(!win){
      this.createWindow(menu.itemId);
    }

    if(win){
      this.restoreWindow(win);
    }
  },

  // Запрос на выход из сессии
  signout: function(btn){
    Ext.Msg.confirm('Выход', 'Вы действительно хотите выйти?', function(opt){
      if(opt == 'yes'){
        this.desktop.setLoading('Выход');
        window.location.href="/secure/signout";
      }
    }, this);
  },

  // Смена пароля
  chpwd: function(btn){
    this.getController('Secure').formСhpwd();
  },

  // Отображения всплавающего сообщения
  tip: function(id, msg, remove, callback, scope){
    if(!this.msgCt){
      this.msgCt = Ext.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
    }

    var m = Ext.DomHelper.append(this.msgCt, '<div class="msg" id="'+id+'"><h3>'+msg+'</h3></div>', true);
    m.hide();

    if(remove){
      m.slideIn('b', {easing: 'easeOut', duration: 300}).ghost("b", {delay: 2000, remove: true});
    }else{
      m.slideIn('b', {easing: 'easeOut', duration: 300})
    }

    m.removeTip = function(){
      m.ghost("b", {delay: 2000, remove: true});
    }

    if(callback){
      m.on('click', callback, scope, m);
    }
    
    return m;
  },

  // Звуковое опевещение
  playNotification:function(sount){
    if (window.HTMLAudioElement){
      var snd = new Audio('/resources/theme/media/'+sount+'.ogg');
      snd.play();
    }
  }
});