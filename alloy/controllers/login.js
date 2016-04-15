function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function validate() {
        if ("" == $.email_txt.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: LANG.emailRequired,
                type: "danger"
            });
            return false;
        }
        if (!Alloy.Globals.validateEmail($.email_txt.value)) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: LANG.emailValid,
                type: "danger"
            });
            return false;
        }
        if ("" == $.pass_txt.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: LANG.passwordRequired,
                type: "danger"
            });
            return false;
        }
        return true;
    }
    function translate() {
        $.email_txt.hintText = LANG.email;
        $.pass_txt.hintText = LANG.password;
        $.login_btn.title = LANG.signIn;
        $.register_btn.title = LANG.signUp;
    }
    function initNavbar() {
        $.NavigationBar.setTitle(LANG.signIn);
        $.NavigationBar.showBack({
            callback: function() {
                APP.removeChild();
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
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
        width: "90%",
        height: Ti.UI.FILL,
        id: "content"
    });
    $.__views.Wrapper.add($.__views.content);
    $.__views.email_txt = Ti.UI.createTextField({
        top: 20,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "email_txt"
    });
    $.__views.content.add($.__views.email_txt);
    $.__views.__alloyId6 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 1,
        backgroundColor: "#164058",
        zIndex: 1,
        id: "__alloyId6"
    });
    $.__views.content.add($.__views.__alloyId6);
    $.__views.pass_txt = Ti.UI.createTextField({
        top: 20,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "pass_txt",
        passwordMask: "true"
    });
    $.__views.content.add($.__views.pass_txt);
    $.__views.__alloyId7 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 1,
        backgroundColor: "#164058",
        zIndex: 1,
        id: "__alloyId7"
    });
    $.__views.content.add($.__views.__alloyId7);
    $.__views.login_btn = Ti.UI.createButton({
        height: 40,
        width: "80%",
        color: "#fff",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        backgroundColor: "#164058",
        borderRadius: 20,
        borderColor: "#fff",
        top: 50,
        id: "login_btn"
    });
    $.__views.content.add($.__views.login_btn);
    $.__views.register_btn = Ti.UI.createButton({
        height: 40,
        width: "80%",
        color: "#fff",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        backgroundColor: "#41c162",
        borderRadius: 20,
        borderColor: "#fff",
        top: 50,
        id: "register_btn"
    });
    $.__views.content.add($.__views.register_btn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var HTTP = require("http");
    var LANG = require("translate").getLang();
    arguments[0];
    $.init = function() {
        translate();
        initNavbar();
    };
    $.login_btn.addEventListener("click", function() {
        if (Ti.Network.online) {
            if (validate()) {
                APP.Loading.show();
                HTTP.request({
                    type: "POST",
                    format: "JSON",
                    url: APP.Login_route,
                    data: {
                        email: $.email_txt.value,
                        password: $.pass_txt.value
                    },
                    success: function(_data) {
                        APP.Loading.hide();
                        console.log(JSON.stringify(_data));
                        if (_data.errors) APP.Notifier.show({
                            view: $.Wrapper,
                            message: _data.errors[0].message,
                            type: "danger"
                        }); else {
                            Ti.App.Properties.setString("customer", JSON.stringify(_data));
                            APP.removeChild();
                        }
                    },
                    failure: function(err) {
                        APP.Loading.hide();
                        APP.Notifier.show({
                            view: $.Wrapper,
                            message: LANG.no_connection,
                            type: "danger"
                        });
                        console.log(JSON.stringify(err));
                    }
                });
            }
        } else APP.Notifier.show({
            view: $.Wrapper,
            message: LANG.no_connection,
            type: "danger"
        });
    });
    $.register_btn.addEventListener("click", function() {
        APP.addChild("register", {});
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;