function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function alertRate(e) {
        rating = e;
    }
    function validate() {
        if ("" == $.name_txt.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: LANG.nameRequired,
                type: "danger"
            });
            return false;
        }
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
        if ("" == $.content_text.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: LANG.contentRequired,
                type: "danger"
            });
            return false;
        }
        return true;
    }
    function initNavbar() {
        $.NavigationBar.setTitle(LANG.addReview);
        $.NavigationBar.showBack({
            callback: function() {
                APP.removeChild();
            }
        });
    }
    function translate() {
        $.name_lbl.text = LANG.fullName;
        $.email_lbl.text = LANG.email;
        $.review_lbl.text = LANG.review;
        $.content_lbl.text = LANG.content;
        $.submit_btn.title = LANG.submit;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "addReview";
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
    var __defers = {};
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
    $.__views.name_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        top: 10,
        id: "name_lbl"
    });
    $.__views.content.add($.__views.name_lbl);
    $.__views.name_txt = Ti.UI.createTextField({
        top: 10,
        borderRadius: 5,
        height: "40",
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "name_txt"
    });
    $.__views.content.add($.__views.name_txt);
    $.__views.email_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        top: 10,
        id: "email_lbl"
    });
    $.__views.content.add($.__views.email_lbl);
    $.__views.email_txt = Ti.UI.createTextField({
        top: 10,
        borderRadius: 5,
        height: "40",
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
    $.__views.review_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        top: 10,
        id: "review_lbl"
    });
    $.__views.content.add($.__views.review_lbl);
    $.__views.__alloyId0 = Alloy.createWidget("com.hashapps.tirate", "widget", {
        rate: "0",
        top: "10",
        clickable: "true",
        id: "__alloyId0",
        __parentSymbol: $.__views.content
    });
    $.__views.__alloyId0.setParent($.__views.content);
    alertRate ? $.__views.__alloyId0.on("rate", alertRate) : __defers["$.__views.__alloyId0!rate!alertRate"] = true;
    $.__views.content_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        top: 10,
        id: "content_lbl"
    });
    $.__views.content.add($.__views.content_lbl);
    $.__views.content_text = Ti.UI.createTextArea({
        top: 10,
        borderRadius: 5,
        height: "60",
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "content_text"
    });
    $.__views.content.add($.__views.content_text);
    $.__views.submit_btn = Ti.UI.createButton({
        height: 40,
        width: "50%",
        color: "#fff",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        backgroundColor: "#41c162",
        borderRadius: 20,
        top: 20,
        id: "submit_btn"
    });
    $.__views.content.add($.__views.submit_btn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var HTTP = require("http");
    var LANG = require("translate").getLang();
    var CONFIG = arguments[0];
    var rating = 0;
    $.init = function() {
        translate();
        initNavbar();
    };
    $.submit_btn.addEventListener("click", function() {
        if (validate()) {
            APP.Loading.show();
            HTTP.request({
                type: "POST",
                format: "JSON",
                url: APP.AddReview_route + CONFIG.id,
                data: {
                    email: $.email_txt.value,
                    author: $.name_txt.value,
                    content: $.content_text.value,
                    rating: rating
                },
                success: function() {
                    APP.Loading.hide();
                    APP.removeChild();
                },
                failure: function(err) {
                    APP.Loading.hide();
                    APP.Notifier.show({
                        view: $.Wrapper,
                        message: err ? err : LANG.no_connection,
                        type: "danger"
                    });
                }
            });
        }
    });
    $.init();
    __defers["$.__views.__alloyId0!rate!alertRate"] && $.__views.__alloyId0.on("rate", alertRate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;