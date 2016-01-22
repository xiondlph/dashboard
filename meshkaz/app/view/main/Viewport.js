
Ext.define("Admin.view.main.Viewport",{
    extend: "Ext.container.Viewport",

    requires: [
        "Ext.layout.container.HBox",
        "Admin.view.main.ViewportController",
        "Admin.view.main.ViewportModel"
    ],

    controller: "main-viewport",
    viewModel: {
        type: "main-viewport"
    },

    items: [{
        xtype: 'toolbar',
        height: 64,
    }, {
        xtype: 'container',
        scrollable: 'y',
        layout: {
            type: 'hbox',
            flex: 1,
            align: 'stretchmax',
            animate: true,
            animatePolicy: {
                x: true,
                width: true
            }
        },
        items: [{
            xtype: 'treelist',
            width: 250,
            ui: 'navigation',
            store: 'NavigationTree',
            itemId: 'navigationTreeList',
            expanderFirst: false,
            expanderOnly: false,
            listeners: {
                selectionchange: 'onNavigationTreeSelectionChange'
            }
        }, {
            xtype: 'container',
            flex: 1,
            layout: {
                type: 'card',
                anchor: '100%'
            }
        }],
        beforeLayout : function() {
            var me = this,
                height = Ext.Element.getViewportHeight() - 64,  
                navTree = me.getComponent('navigationTreeList');

            me.minHeight = height;
            navTree.setStyle({
                'min-height': height + 'px'
            });
        }
    }]
});