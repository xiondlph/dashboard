Ext.define('Admin.view.payment.PaymentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.payment-payment',

    init: function(view) {
        var paymentStore  = Ext.data.StoreManager.lookup('Payments');
        paymentStore.load();    
    }
});
