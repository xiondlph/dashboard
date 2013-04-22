Ext.application({
  views: ["secure.Chpwd","secure.Login","desktop.Taskbar","desktop.Startmenu","desktop.View","desktop.Desktop"],

  models: ["Shortcut"],

  controllers: ["Socket","Secure","Desktop", 'Profile', 'Categories', 'Objects'],

  name: 'Ismax',

  launch: function(){

    // Инициализация начальной авторизации
    Ext.Ajax.request({
      url: '/secure/isauth',
      scope: this,
      success: function(response, opts){
        Ext.fly('loader').destroy();
        var data = Ext.decode(response.responseText);
        if(data.auth){
          this.getController('Desktop').createDesktop();
        }else{
          var loginForm = Ext.widget('login');
        }
      }
    });
  }
});
