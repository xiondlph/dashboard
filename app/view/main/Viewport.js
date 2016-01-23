
Ext.define("Admin.view.main.Viewport",{
    extend: "Ext.container.Viewport",

    requires: [
        "Ext.layout.container.HBox",
        "Ext.list.Tree",
        "Admin.view.main.ViewportController",
        "Admin.view.main.ViewportModel"
    ],

    controller: "main-viewport",
    viewModel: {
        type: "main-viewport"
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'ismax-headerbar toolbar-btn-shadow',
        height: 64,
        items: [{
            xtype: 'component',
            reference: 'ismaxLogo',
            cls: 'ismax-logo',
            html: '<div class="main-logo"><img src="resources/images/ismax-icon.png">ISMAX icsystem</div>',
            width: 250
        }, {
            iconCls:'x-fa fa-navicon',
            handler: 'onToggleNavigationSize'
        }]
    }, {
        xtype: 'container',
        reference: 'mainContainer',
        flex: 1,
        scrollable: 'y',
        layout: {
            type: 'hbox',
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
            reference: 'navigationTreeList',
            expanderFirst: false,
            expanderOnly: false,
            listeners: {
                selectionchange: 'onNavigationTreeSelectionChange'
            }
        }, {
            xtype: 'container',
            reference: 'mainCardPanel',
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