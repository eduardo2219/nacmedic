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
    this.__controllerPath = "index";
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
    $.__views.MainWindow = Ti.UI.createWindow(function() {
        var o = {};
        _.extend(o, {
            backgroundColor: Alloy.CFG.win.backgroundColor
        });
        Alloy.isTablet && _.extend(o, {
            orientationModes: [ Ti.UI.LANDSCAPE_LEFT ]
        });
        Alloy.isHandheld && _.extend(o, {
            orientationModes: [ Ti.UI.PORTRAIT ]
        });
        _.extend(o, {
            navBarHidden: true,
            exitOnClose: true,
            id: "MainWindow"
        });
        return o;
    }());
    $.__views.MainWindow && $.addTopLevelView($.__views.MainWindow);
    $.__views.MainView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.win.backgroundColor,
        id: "MainView"
    });
    $.__views.MainWindow.add($.__views.MainView);
    $.__views.GlobalWrapper = Ti.UI.createView({
        backgroundColor: Alloy.CFG.win.barColor,
        top: "0dp",
        width: "100%",
        id: "GlobalWrapper"
    });
    $.__views.MainView.add($.__views.GlobalWrapper);
    $.__views.SlideMenu = Alloy.createWidget("com.betait.slidemenu", "widget", {
        id: "SlideMenu",
        __parentSymbol: $.__views.GlobalWrapper
    });
    $.__views.SlideMenu.setParent($.__views.GlobalWrapper);
    $.__views.ContentWrapper = Ti.UI.createView({
        top: "0dp",
        bottom: "60dp",
        id: "ContentWrapper"
    });
    $.__views.GlobalWrapper.add($.__views.ContentWrapper);
    $.__views.Tabs = Alloy.createWidget("com.chariti.tabs", "widget", {
        id: "Tabs",
        __parentSymbol: $.__views.GlobalWrapper
    });
    $.__views.Tabs.setParent($.__views.GlobalWrapper);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var DBHELPER = require("dbHelper");
    var LANG = require("translate").getLang();
    APP.MainWindow = $.MainWindow;
    APP.GlobalWrapper = $.GlobalWrapper;
    APP.ContentWrapper = $.ContentWrapper;
    APP.Tabs = $.Tabs;
    APP.SlideMenu = $.SlideMenu;
    APP.Settings = {
        version: "1.5",
        useSlideMenu: Alloy.CFG.config.useSlideMenu,
        tabs: [ {
            title: LANG.home,
            image: "home",
            type: "allproducts"
        }, {
            title: LANG.categories,
            image: "categories",
            type: "categories"
        }, {
            title: LANG.mycart,
            image: "cart",
            type: "cart"
        }, {
            title: LANG.mywishlist,
            image: "wishlist",
            type: "wishlist"
        }, {
            title: LANG.search,
            image: "search",
            type: "search"
        }, {
            title: LANG.info,
            image: "info",
            type: "about"
        } ]
    };
    $.MainWindow.addEventListener("open", function() {
        setTimeout(function() {
            var rater = require("TiRater");
            rater.initMe(Titanium.App.name, Titanium.App.id);
        }, 5e3);
    });
    DBHELPER.create();
    APP.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;