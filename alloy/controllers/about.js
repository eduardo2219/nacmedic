function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "about";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        width: "100%",
        height: "100%",
        backgroundColor: "#EEE",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.betait.navigationbar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.content = Ti.UI.createScrollView({
        top: 50,
        contentWidth: "auto",
        contentHeight: "auto",
        layout: "vertical",
        width: "98%",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        id: "content"
    });
    $.__views.Wrapper.add($.__views.content);
    $.__views.logo = Ti.UI.createImageView({
        image: "/logo.png",
        width: 128,
        height: 128,
        top: 20,
        id: "logo"
    });
    $.__views.content.add($.__views.logo);
    $.__views.description = Ti.UI.createLabel({
        top: 20,
        left: 5,
        textAlign: "left",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        color: "#444444",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: true,
        id: "description"
    });
    $.__views.content.add($.__views.description);
    $.__views.contact = Ti.UI.createImageView({
        backgroundImage: "/images/info.png",
        width: 64,
        height: 64,
        top: 40,
        id: "contact"
    });
    $.__views.content.add($.__views.contact);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var LANG = require("translate").getLang();
    var CONFIG = arguments[0];
    APP.Settings.useSlideMenu && $.NavigationBar.showMenu();
    $.init = function() {
        $.NavigationBar.setTitle(CONFIG.title);
        $.description.text = LANG.about_description;
    };
    $.contact.addEventListener("click", function() {
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = Alloy.CFG.config.contact.subject;
        emailDialog.toRecipients = [ Alloy.CFG.config.contact.email ];
        emailDialog.messageBody = "";
        emailDialog.open();
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;