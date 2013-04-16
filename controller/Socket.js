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

    socket.on('disconnect', function (){
      alert('disconnect');
      //socket.socket.connect();    
    });

    socket.on('error', function(){alert('error')});

    socket.on('connect', function(){
      socket.on('command', function(data){
        // Определения наличия команды
        if(typeof me.command[data.command] === 'function'){
          me.command[data.command].apply(app, [socket, data]);
        }
      });

      me.sendCommand('operator_visitor_get', {}, null, false);
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