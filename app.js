Ext.application({
  views: ["secure.Chpwd","secure.Login","desktop.Taskbar","desktop.Startmenu","desktop.View","desktop.Desktop"],

  models: ["Shortcut"],

  controllers: ["Socket","Secure","Desktop"],

  name: 'Ismax',

  launch: function(){
    this.getController('Desktop').createDesktop();
/*
    // Инициализация начальной авторизации
    Ext.Ajax.request({
      url: '/secure/isauth',
      scope: this,
      success: function(response, opts){
        var data = Ext.decode(response.responseText);
        if(data.auth){
          this.getController('Desktop').createDesktop();
        }else{
          var loginForm = Ext.widget('login');
        }
      }
    });
*/
  }
});
