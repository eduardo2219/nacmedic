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
    this.__controllerPath = "catProducts";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
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
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.win.backgroundColor,
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.betait.navigationbar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.__alloyId2 = Ti.UI.createView({
        top: "50",
        bottom: "0",
        width: Titanium.UI.FILL,
        id: "__alloyId2"
    });
    $.__views.Wrapper.add($.__views.__alloyId2);
    $.__views.is = Alloy.createWidget("nl.fokkezb.infiniteScroll", "widget", {
        id: "is",
        __parentSymbol: __parentSymbol
    });
    try {
        $.__views.is.on("end", f.tableLoader);
    } catch (e) {
        __defers["$.__views.is!end!f.tableLoader"] = true;
    }
    $.__views.catProductsTable = Ti.UI.createTableView({
        top: 0,
        height: Ti.UI.FILL,
        showVerticalScrollIndicator: false,
        width: Ti.UI.FILL,
        backgroundColor: "transparent",
        separatorColor: "transparent",
        backgroundSelectedColor: "transparent",
        backgroundFocusedColor: "transparent",
        footerView: $.__views.is.getProxyPropertyEx("footerView", {
            recurse: true
        }),
        id: "catProductsTable"
    });
    $.__views.__alloyId2.add($.__views.catProductsTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var HTTP = require("http");
    require("dbHelper");
    var LANG = require("translate").getLang();
    var CONFIG = arguments[0];
    var v = {
        page: 1,
        prodList: []
    };
    var e = {
        init: function() {
            f.initNavbar();
            $.is.init($.catProductsTable);
            f.setEvent();
            f.getData();
        }
    };
    var f = {
        setEvent: function() {
            $.catProductsTable.addEventListener("click", function(e) {
                var row = e.row;
                APP.addChild("product", {
                    title: row.Item.title,
                    id: row.Item.id
                });
            });
        },
        tableLoader: function(e) {
            v.page++;
            f.getData();
            e.success();
        },
        getData: function() {
            APP.Loading.show();
            HTTP.request({
                type: "POST",
                format: "JSON",
                data: {
                    "filter[limit]": 5,
                    "filter[order]": "desc",
                    "filter[orderby]": "date",
                    "filter[category]": CONFIG.cat_slug,
                    page: v.page,
                    fields: "id,title,featured_src,regular_price,average_rating,sale_price,price"
                },
                url: APP.Products_route,
                success: function(_data) {
                    console.log(JSON.stringify(_data));
                    var products = _data.products;
                    var row = [];
                    _.each(products, function(elm) {
                        v.prodList.push(elm.title);
                        var result = Alloy.createController("catProducts-item", elm).getView();
                        row.push(result);
                    });
                    $.catProductsTable.appendRow(row);
                    APP.Loading.hide();
                },
                failure: function(err) {
                    APP.Loading.hide();
                    APP.Notifier.show({
                        view: $.Wrapper,
                        message: err ? err : LANG.no_connection,
                        type: "danger"
                    });
                    APP.Loading.hide();
                }
            });
        },
        initNavbar: function() {
            $.NavigationBar.setTitle(CONFIG.title);
            $.NavigationBar.showBack({
                callback: function() {
                    APP.removeChild();
                }
            });
        }
    };
    e.init();
    __defers["$.__views.is!end!f.tableLoader"] && $.__views.is.on("end", f.tableLoader);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;