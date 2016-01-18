Ext.define('Admin.view.payment.FormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.payment-form',

    init: function(view) {
        var paymentStore  = Ext.data.StoreManager.lookup('Payments');
        paymentStore.load(function () {
        	console.log(arguments);
        });    
    }
    
});
