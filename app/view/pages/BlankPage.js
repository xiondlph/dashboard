Ext.define('Admin.view.pages.BlankPage', {
    extend: 'Ext.container.Container',
    xtype: 'blankpage',

    requires: [
        'Ext.container.Container'
    ],

    anchor : '100% -1',

    layout:{
        type:'vbox',
        pack:'center',
        align:'center'
    },

    items: [
        {
            xtype: 'box',
            cls: 'blank-page-container',
            html: '<div class=\'fa-outer-class\'><span class=\'x-fa fa-clock-o\'></span></div><h1>Скоро!</h1><span class=\'blank-page-text\'>Следите за обновлениями</span>'
        }
    ]
});
