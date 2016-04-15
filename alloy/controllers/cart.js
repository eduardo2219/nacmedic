function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function translate() {
        $.checkoutBtn.title = LANG.placeOrder;
        $.total_lbl.text = LANG.total;
        $.shipping_lbl.text = LANG.shipping + " " + Alloy.CFG.config.shipping_lines.total + Alloy.CFG.config.currency_format;
        $.shipping_vlue.text = Alloy.CFG.config.shipping_lines.method_title;
        if ("ltr" == Alloy.CFG.config.direction) {
            $.shipping_lbl.left = 5;
            $.shipping_lbl.textAlign = "left";
            $.shipping_vlue.right = 0;
            $.total_lbl.left = 5;
            $.total.right = 0;
        } else {
            $.shipping_lbl.right = 5;
            $.shipping_lbl.textAlign = "right";
            $.shipping_vlue.left = 0;
            $.total_lbl.right = 5;
            $.total.left = 0;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "cart";
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
        backgroundColor: Alloy.CFG.win.backgroundColor,
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.betait.navigationbar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.content = Ti.UI.createView({
        top: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        id: "content"
    });
    $.__views.Wrapper.add($.__views.content);
    $.__views.cartTable = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        showVerticalScrollIndicator: false,
        width: Ti.UI.FILL,
        backgroundColor: "transparent",
        separatorColor: "transparent",
        backgroundSelectedColor: "transparent",
        top: 10,
        bottom: 150,
        id: "cartTable"
    });
    $.__views.content.add($.__views.cartTable);
    $.__views.seperator1 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 1,
        backgroundColor: "#e0e0e0",
        zIndex: 1,
        bottom: 149,
        id: "seperator1"
    });
    $.__views.content.add($.__views.seperator1);
    $.__views.shipping_view = Ti.UI.createView({
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        bottom: 100,
        id: "shipping_view"
    });
    $.__views.content.add($.__views.shipping_view);
    $.__views.shipping_lbl = Ti.UI.createLabel({
        width: "49%",
        height: Ti.UI.FILL,
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        color: "#676767",
        id: "shipping_lbl"
    });
    $.__views.shipping_view.add($.__views.shipping_lbl);
    $.__views.shipping_vlue = Ti.UI.createLabel({
        width: "49%",
        height: Ti.UI.FILL,
        textAlign: "center",
        text: 0,
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        color: "#676767",
        id: "shipping_vlue"
    });
    $.__views.shipping_view.add($.__views.shipping_vlue);
    $.__views.seperator2 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 1,
        backgroundColor: "#e0e0e0",
        zIndex: 1,
        bottom: 99,
        id: "seperator2"
    });
    $.__views.content.add($.__views.seperator2);
    $.__views.total_view = Ti.UI.createView({
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        bottom: 50,
        id: "total_view"
    });
    $.__views.content.add($.__views.total_view);
    $.__views.total_lbl = Ti.UI.createLabel({
        width: "49%",
        height: Ti.UI.FILL,
        textAlign: "center",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        color: "#676767",
        id: "total_lbl"
    });
    $.__views.total_view.add($.__views.total_lbl);
    $.__views.total = Ti.UI.createLabel({
        width: "49%",
        height: Ti.UI.FILL,
        textAlign: "center",
        text: 0,
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        color: "#9f9f9f",
        id: "total"
    });
    $.__views.total_view.add($.__views.total);
    $.__views.checkoutBtn = Ti.UI.createButton({
        height: 50,
        width: "100%",
        color: "#fff",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        backgroundColor: "#41c162",
        borderRadius: 0,
        bottom: 0,
        id: "checkoutBtn"
    });
    $.__views.content.add($.__views.checkoutBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    require("http");
    var DBHELPER = require("dbHelper");
    var LANG = require("translate").getLang();
    var CONFIG = arguments[0];
    var total = 0;
    $.NavigationBar.setTitle(CONFIG.title);
    APP.Settings.useSlideMenu && $.NavigationBar.showMenu();
    $.init = function() {
        translate();
        total = 0;
        var rows = [];
        var p_price = 0;
        var items = DBHELPER.fetchItems();
        if (items.length > 0) {
            var rows = [];
            for (var i = 0; i < items.length; i++) {
                p_price = 0;
                rows.push(Alloy.createController("cart-item", {
                    data: items[i]
                }).getView());
                p_price = items[i].price * items[i].quantity;
                total += p_price;
            }
            total += Alloy.CFG.config.shipping_lines.total;
            $.total.text = total.toFixed(2);
            $.cartTable.setData(rows);
        } else setTimeout(function() {
            APP.Notifier.show({
                view: $.Wrapper,
                message: LANG.cartEmpty,
                type: "danger"
            });
        }, 100);
    };
    Ti.App.addEventListener("cart:reload", function() {
        $.total.text = 0;
        $.cartTable.setData([]);
        $.init();
    });
    $.cartTable.addEventListener("click", function(e) {
        var product_id = e.row.Item.product_id;
        var row = e.row;
        if ("delete_btn" == e.source.id) {
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ LANG.confirm, LANG.cancel ],
                message: LANG.confirmDelete,
                title: LANG.delete
            });
            dialog.addEventListener("click", function(e) {
                if (0 == e.index) {
                    var total_price = row.Item.price * row.quantity;
                    $.total.text = parseFloat($.total.text) - total_price;
                    $.total.text = $.total.text.toFixed(2);
                    DBHELPER.deleteItem(product_id);
                    $.cartTable.deleteRow(row);
                    Ti.App.fireEvent("cart:reload");
                }
            });
            dialog.show();
        } else if ("plus_btn" == e.source.id) {
            $.total.text = parseFloat($.total.text) + row.Item.price;
            $.total.text = $.total.text.toFixed(2);
        } else if ("minus_btn" == e.source.id) {
            $.total.text = parseFloat($.total.text) - row.Item.price;
            $.total.text = $.total.text.toFixed(2);
        }
    });
    $.checkoutBtn.addEventListener("click", function() {
        $.total.text > Alloy.CFG.config.shipping_lines.total ? Ti.App.Properties.getString("customer") ? APP.addChild("order", {
            total: $.total.text
        }) : APP.addChild("login", {}) : APP.Notifier.show({
            view: $.Wrapper,
            message: LANG.cartEmpty,
            type: "danger"
        });
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;