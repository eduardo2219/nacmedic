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
    this.__controllerPath = "allproduct-item";
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
    $.__views.mainView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "transparent",
        zIndex: 0,
        id: "mainView"
    });
    $.__views.mainView && $.addTopLevelView($.__views.mainView);
    $.__views.thumb_contaner = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "thumb_contaner"
    });
    $.__views.mainView.add($.__views.thumb_contaner);
    $.__views.featured = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            top: 0,
            left: 0,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            image: "/featured.png",
            zIndex: 1
        });
        Alloy.isHandheld && _.extend(o, {
            width: "60%",
            height: Ti.UI.SIZE
        });
        _.extend(o, {
            id: "featured"
        });
        return o;
    }());
    $.__views.thumb_contaner.add($.__views.featured);
    $.__views.p_regular_price = Ti.UI.createLabel({
        zIndex: 1,
        top: 10,
        right: 5,
        height: Titanium.UI.SIZE,
        width: 70,
        color: "#fff",
        font: {
            fontSize: 13,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#44c163",
        borderColor: "#44c163",
        borderRadius: 5,
        borderWidth: 1,
        textAlign: "center",
        id: "p_regular_price"
    });
    $.__views.thumb_contaner.add($.__views.p_regular_price);
    $.__views.p_sale_price = Ti.UI.createLabel({
        zIndex: 1,
        top: 30,
        right: 5,
        height: Titanium.UI.SIZE,
        width: 70,
        color: "#fff",
        font: {
            fontSize: 15,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#ff5a54",
        borderColor: "#ff5a54",
        borderRadius: 5,
        borderWidth: 1,
        textAlign: "center",
        id: "p_sale_price"
    });
    $.__views.thumb_contaner.add($.__views.p_sale_price);
    $.__views.p_image = Ti.UI.createImageView({
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderRadius: 3,
        id: "p_image"
    });
    $.__views.thumb_contaner.add($.__views.p_image);
    $.__views.p_title = Ti.UI.createLabel({
        top: 10,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        color: "#444444",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: true,
        id: "p_title"
    });
    $.__views.mainView.add($.__views.p_title);
    $.__views.p_rate = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "p_rate"
    });
    $.__views.mainView.add($.__views.p_rate);
    $.__views.__alloyId1 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 10,
        id: "__alloyId1"
    });
    $.__views.mainView.add($.__views.__alloyId1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.p_title.text = args.title;
    $.p_regular_price.text = (args.regular_price > 0 ? args.regular_price : args.price) + " " + Alloy.CFG.config.currency_format;
    $.p_sale_price.text = args.sale_price + " " + Alloy.CFG.config.currency_format;
    $.p_image.image = args.image;
    $.p_rate.add(Alloy.createWidget("com.hashapps.tirate", {
        rate: args.average_rating
    }).getView());
    $.featured.visible = args.featured ? true : false;
    $.p_sale_price.visible = args.sale_price ? true : false;
    if ("ltr" == Alloy.CFG.config.direction) {
        $.p_title.left = 5;
        $.p_title.textAlign = "left";
        $.p_rate.right = 5;
    } else {
        $.p_title.right = 5;
        $.p_title.textAlign = "right";
        $.p_rate.left = 5;
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;