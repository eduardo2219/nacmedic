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
    this.__controllerPath = "category-item";
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
        width: "97%",
        height: Titanium.UI.SIZE,
        top: 3,
        backgroundColor: "#fff",
        id: "outerContainer"
    });
    $.__views.row.add($.__views.outerContainer);
    $.__views.c_title = Ti.UI.createLabel({
        top: 10,
        bottom: 10,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        color: "#676767",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily,
            fontWeight: "bold"
        },
        wordWrap: true,
        id: "c_title"
    });
    $.__views.outerContainer.add($.__views.c_title);
    $.__views.c_counts = Ti.UI.createLabel({
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#41c162",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: 12,
            fontFamily: Alloy.CFG.fontFamily,
            fontWeight: "bold"
        },
        id: "c_counts"
    });
    $.__views.outerContainer.add($.__views.c_counts);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.c_title.text = args.data.name;
    $.c_counts.text = args.data.count;
    $.row.Item = args.data;
    if ("ltr" == Alloy.CFG.config.direction) {
        $.c_title.left = 5;
        $.c_title.right = 50;
        $.c_title.textAlign = "left";
        $.c_counts.right = 0;
    } else {
        $.c_title.left = 50;
        $.c_title.right = 5;
        $.c_title.textAlign = "right";
        $.c_counts.left = 0;
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;