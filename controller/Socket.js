/**!
 * Socket controller
 *
 * @package    ismax
 * @subpackage Dashboard
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Контроллер модуля
 * сокет команд
 **/

Ext.define('Ismax.controller.Socket', {
  extend: 'Ext.app.Controller',

  // Объект команд
  command: {},

  init: function(app){
    //..
  },

  // Открытие сокет соединения
  open: function(){
    var me = this;
    var app = this.application;
    var socket = io.connect('http://operator.ismaxonline.com:3000', {resource  :'ismax.io'});

    // При потере сокет соединения
    socket.on('disconnect', function (){
      me.getController('Desktop').tip('socket_disconnect', 'Сокет соединение потеряно', true, null, this);
      //socket.socket.connect();    
    });

    // При ошибке сокет соединения
    socket.on('error', function(){
      me.getController('Desktop').tip('socket_error', 'Ошибка сокет соединения', true, null, this);
    });

    socket.on('connect', function(){
      socket.on('command', function(data){
        // Определения наличия команды
        if(typeof me.command[data.command] === 'function'){
          me.command[data.command].apply(app, [socket, data]);
        }
      });

      me.getController('Desktop').tip('socket_connect', 'Сокет соединение установлено', true, null, this);
    });

    app.socket = socket;
  },

  // Назначение функций контроллеров командам
  setCommand: function(command, method){
    this.command[command] = method;
  },

  /**
   * Блок контроля за процессом
   * выполнения сокет операции
   */
  sendCommand: function(command, data, focus, timeout){
    if(focus){
      this.application.focusObj = focus;
    }

    var _data = data;
    _data.command = command;
    this.application.socket.emit('command',_data);

    if(timeout){
      this.application.socketTimeout = setTimeout(function(){
        if(focus){
          focus.setLoading(false);
        }

        Ext.MessageBox.show({
          title: 'Ошибка',
          msg: 'Timeout!',
          buttons: Ext.MessageBox.OK,
          icon: Ext.MessageBox.ERROR
        });  
      }, 20000);
    }
  },

  endCommand: function(){
    var obj = this.application.focusObj;
    //this.application.focusObj = null;
    clearTimeout(this.application.socketTimeout);
    return obj;
  }
});