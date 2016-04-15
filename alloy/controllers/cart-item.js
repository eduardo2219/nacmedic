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
    this.__controllerPath = "cart-item";
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
    $.__views.row = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        hasChild: false,
        selectedBackgroundColor: "#41c162",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.outerContainer = Ti.UI.createView({
        width: "98%",
        height: 120,
        top: 1,
        id: "outerContainer"
    });
    $.__views.row.add($.__views.outerContainer);
    $.__views.p_image = Ti.UI.createImageView({
        width: 80,
        height: 100,
        borderColor: "#f3f3f3",
        borderWidth: 2,
        id: "p_image"
    });
    $.__views.outerContainer.add($.__views.p_image);
    $.__views.attr_view = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 100,
        id: "attr_view"
    });
    $.__views.outerContainer.add($.__views.attr_view);
    $.__views.p_title = Ti.UI.createLabel({
        top: 2,
        height: 30,
        width: Ti.UI.FILL,
        color: "#676767",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily,
            fontWeight: "bold"
        },
        wordWrap: false,
        id: "p_title"
    });
    $.__views.attr_view.add($.__views.p_title);
    $.__views.delete_btn = Ti.UI.createButton({
        top: 2,
        color: "#fff",
        title: "✗",
        textAlign: "center",
        width: 24,
        height: 24,
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#e2401c",
        borderRadius: 12,
        id: "delete_btn"
    });
    $.__views.attr_view.add($.__views.delete_btn);
    $.__views.p_price = Ti.UI.createLabel({
        top: 35,
        height: 20,
        width: 50,
        color: "#9f9f9f",
        font: {
            fontSize: 12,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        id: "p_price"
    });
    $.__views.attr_view.add($.__views.p_price);
    $.__views.control_view = Ti.UI.createView({
        height: 40,
        width: Ti.UI.FILL,
        backgroundColor: "#f3f3f3",
        bottom: 0,
        borderRadius: 5,
        id: "control_view"
    });
    $.__views.attr_view.add($.__views.control_view);
    $.__views.minus_btn = Ti.UI.createButton({
        left: 0,
        color: "#707070",
        title: "─",
        textAlign: "center",
        width: 30,
        height: Ti.UI.FILL,
        font: {
            fontSize: 20,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#f3f3f3",
        wordWrap: false,
        id: "minus_btn"
    });
    $.__views.control_view.add($.__views.minus_btn);
    $.__views.p_quantity = Ti.UI.createLabel({
        left: 35,
        right: 35,
        color: "#707070",
        textAlign: "center",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        font: {
            fontSize: 18,
            fontFamily: Alloy.CFG.fontFamily
        },
        id: "p_quantity"
    });
    $.__views.control_view.add($.__views.p_quantity);
    $.__views.plus_btn = Ti.UI.createButton({
        right: 0,
        color: "#707070",
        title: "+",
        textAlign: "center",
        width: 30,
        height: Ti.UI.FILL,
        font: {
            fontSize: 20,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#f3f3f3",
        id: "plus_btn"
    });
    $.__views.control_view.add($.__views.plus_btn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var DBHELPER = require("dbHelper");
    var args = arguments[0] || {};
    $.p_image.image = args.data.product_image;
    $.p_title.text = args.data.product_title;
    $.p_price.text = args.data.price + " " + Alloy.CFG.config.currency_format;
    $.p_quantity.text = args.data.quantity;
    $.row.Item = args.data;
    $.minus_btn.visible = 1 == args.data.quantity ? false : true;
    $.plus_btn.addEventListener("click", function() {
        $.p_quantity.text = parseInt($.p_quantity.text) + 1;
        $.row.quantity = $.p_quantity.text;
        $.p_quantity.text > 1 && ($.minus_btn.visible = true);
        DBHELPER.updateItem(args.data.product_id, $.p_quantity.text);
    });
    $.minus_btn.addEventListener("click", function() {
        $.p_quantity.text = parseInt($.p_quantity.text) - 1;
        $.row.quantity = $.p_quantity.text;
        1 == $.p_quantity.text && ($.minus_btn.visible = false);
        DBHELPER.updateItem(args.data.product_id, $.p_quantity.text);
    });
    if ("ltr" == Alloy.CFG.config.direction) {
        $.p_image.left = 5;
        $.attr_view.left = 90;
        $.attr_view.right = 5;
        $.p_title.left = 2;
        $.p_title.right = 50;
        $.delete_btn.right = 2;
        $.p_price.left = 2;
        $.p_title.textAlign = "left";
    } else {
        $.p_image.right = 5;
        $.attr_view.left = 5;
        $.attr_view.right = 90;
        $.delete_btn.left = 2;
        $.p_title.left = 50;
        $.p_title.right = 2;
        $.p_price.right = 2;
        $.p_title.textAlign = "right";
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;