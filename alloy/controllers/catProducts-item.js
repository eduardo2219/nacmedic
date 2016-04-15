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
    this.__controllerPath = "catProducts-item";
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
        width: "99%",
        height: Titanium.UI.SIZE,
        top: 3,
        backgroundColor: "#fff",
        id: "outerContainer"
    });
    $.__views.row.add($.__views.outerContainer);
    $.__views.p_image = Ti.UI.createImageView({
        top: 5,
        width: 80,
        height: 80,
        borderRadius: 3,
        borderColor: "#f3f3f3",
        borderWidth: 5,
        bottom: 5,
        id: "p_image"
    });
    $.__views.outerContainer.add($.__views.p_image);
    $.__views.contrl_view = Ti.UI.createView({
        top: 5,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "contrl_view"
    });
    $.__views.outerContainer.add($.__views.contrl_view);
    $.__views.p_title = Ti.UI.createLabel({
        top: 2,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        color: "#676767",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily,
            fontWeight: "bold"
        },
        wordWrap: true,
        id: "p_title"
    });
    $.__views.contrl_view.add($.__views.p_title);
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
    $.__views.contrl_view.add($.__views.p_regular_price);
    $.__views.p_rate = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "p_rate"
    });
    $.__views.contrl_view.add($.__views.p_rate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.p_image.image = args.featured_src;
    $.p_title.text = args.title;
    $.p_regular_price.text = (args.regular_price > 0 ? args.regular_price : args.price) + " " + Alloy.CFG.config.currency_format;
    $.p_rate.add(Alloy.createWidget("com.hashapps.tirate", {
        rate: args.average_rating
    }).getView());
    $.row.Item = args;
    if ("ltr" == Alloy.CFG.config.direction) {
        $.p_image.left = 0;
        $.p_title.left = 2;
        $.p_title.textAlign = "left";
        $.p_rate.left = 5;
        $.p_regular_price.right = 5;
        $.contrl_view.left = 80;
    } else {
        $.p_image.right = 0;
        $.p_title.right = 2;
        $.p_title.textAlign = "right";
        $.p_rate.right = 5;
        $.p_regular_price.left = 5;
        $.contrl_view.right = 80;
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;