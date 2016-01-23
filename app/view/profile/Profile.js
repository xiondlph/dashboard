
Ext.define("Admin.view.profile.Profile",{
    extend: "Ext.container.Container",

    requires: [
        "Admin.view.profile.ProfileController",
        "Admin.view.profile.ProfileModel"
    ],

    controller: "profile-profile",
    viewModel: {
        type: "profile-profile"
    },

    html: "Hello, World!!"
});
