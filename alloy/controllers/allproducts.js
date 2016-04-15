function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getAllProducts(callBack) {
        APP.Loading.show();
        HTTP.request({
            type: "POST",
            format: "JSON",
            data: {
                "filter[limit]": Alloy.CFG.config.latest_result,
                "filter[order]": "desc",
                "filter[orderby]": "date",
                fields: "id,title,featured_src,regular_price,average_rating,sale_price,featured,price"
            },
            url: APP.Products_route,
            success: function(_data) {
                callBack(_data.products);
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "allproducts";
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
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.betait.navigationbar", "widget", {
        id: "NavigationBar",
        text: "Dashboard",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.main_comntent = Ti.UI.createView({
        id: "main_comntent",
        top: "50",
        bottom: "0",
        width: Titanium.UI.FILL
    });
    $.__views.Wrapper.add($.__views.main_comntent);
    $.__views.tdg = Alloy.createWidget("com.prodz.tidynamicgrid", "widget", {
        id: "tdg",
        __parentSymbol: $.__views.main_comntent
    });
    $.__views.tdg.setParent($.__views.main_comntent);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var HTTP = require("http");
    var LANG = require("translate").getLang();
    var DBHELPER = require("dbHelper");
    var CONFIG = arguments[0];
    var delay = 1e3;
    var showGridItemInfo = function(e) {
        APP.addChild("product", {
            title: e.source.data.title,
            id: e.source.data.id
        });
    };
    $.init = function() {
        initNavbar();
        $.tdg.init({
            columns: Alloy.isHandheld ? 2 : 3,
            space: 5,
            delayTime: delay,
            gridBackgroundColor: "#f3f3f3",
            itemBackgroundColor: "#fff",
            itemBorderColor: "transparent",
            itemBorderWidth: 0,
            itemBorderRadius: 5,
            onItemClick: showGridItemInfo
        });
        var items = [];
        getAllProducts(function(sample_data) {
            for (var x = 0; x < sample_data.length; x++) {
                var view = Alloy.createController("allproduct-item", {
                    title: sample_data[x].title,
                    image: sample_data[x].featured_src,
                    regular_price: sample_data[x].regular_price,
                    price: sample_data[x].price,
                    id: sample_data[x].id,
                    average_rating: sample_data[x].average_rating,
                    featured: sample_data[x].featured,
                    sale_price: sample_data[x].sale_price
                }).getView();
                var values = {
                    id: sample_data[x].id,
                    title: sample_data[x].title
                };
                items.push({
                    view: view,
                    data: values
                });
            }
            $.tdg.addGridItems(items);
            APP.Loading.hide();
        });
    };
    var initNavbar = function() {
        $.NavigationBar.setTitle(CONFIG.title);
        APP.Settings.useSlideMenu && $.NavigationBar.showMenu();
        $.NavigationBar.showCart({
            callback: function() {
                APP.handleNavigation(2);
            }
        });
        var count = DBHELPER.fetchItems();
        $.NavigationBar.setCartCount(count.length);
    };
    Ti.App.addEventListener("cart:reload", function() {
        var count = DBHELPER.fetchItems();
        $.NavigationBar.setCartCount(count.length);
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;