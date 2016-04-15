function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function translate() {}
    function getCategories(callBack) {
        APP.Loading.show();
        HTTP.request({
            type: "GET",
            format: "JSON",
            url: APP.Categories_route,
            success: function(_data) {
                callBack(_data.product_categories);
            },
            failure: function() {
                APP.Loading.hide();
                APP.Notifier.show({
                    view: $.Wrapper,
                    message: LANG.unknowError,
                    type: "danger"
                });
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "categories";
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
        backgroundColor: Alloy.CFG.win.backgroundColor,
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.betait.navigationbar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.__alloyId5 = Ti.UI.createView({
        top: "50",
        bottom: "0",
        width: Titanium.UI.FILL,
        id: "__alloyId5"
    });
    $.__views.Wrapper.add($.__views.__alloyId5);
    $.__views.categories_table = Ti.UI.createTableView({
        top: 0,
        height: Ti.UI.FILL,
        showVerticalScrollIndicator: false,
        width: Ti.UI.FILL,
        backgroundColor: "transparent",
        separatorColor: "transparent",
        backgroundSelectedColor: "transparent",
        backgroundFocusedColor: "transparent",
        id: "categories_table"
    });
    $.__views.__alloyId5.add($.__views.categories_table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var HTTP = require("http");
    require("dbHelper");
    var LANG = require("translate").getLang();
    var CONFIG = arguments[0];
    $.NavigationBar.setTitle(CONFIG.title);
    APP.Settings.useSlideMenu && $.NavigationBar.showMenu();
    $.init = function() {
        translate();
        var rows = [];
        getCategories(function(_data) {
            for (var x = 0; x < _data.length; x++) rows.push(Alloy.createController("category-item", {
                data: _data[x]
            }).getView());
            $.categories_table.setData(rows);
            APP.Loading.hide();
        });
    };
    $.categories_table.addEventListener("click", function(e) {
        APP.addChild("catProducts", {
            cat_slug: e.row.Item.slug,
            title: e.row.Item.name
        });
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;