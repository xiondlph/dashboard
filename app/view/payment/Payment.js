
Ext.define("Admin.view.payment.Payment",{
    extend: "Ext.container.Container",

    requires: [
        "Admin.view.payment.PaymentController",
        "Admin.view.payment.PaymentModel"
    ],

    controller: "payment-payment",
    viewModel: {
        type: "payment-payment"
    },

    html: "Hello, World!!"
});
