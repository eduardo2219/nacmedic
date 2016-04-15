function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function initNavbar() {
        $.NavigationBar.setTitle(LANG.order);
        $.NavigationBar.showBack({
            callback: function() {
                APP.removeChild();
            }
        });
    }
    function getVariations(variations) {
        var object = {};
        if (variations) {
            var arrayOfStrings = variations.split("::");
            for (var s = 0; s < arrayOfStrings.length; s++) if (arrayOfStrings[s]) {
                var options = arrayOfStrings[s].split(":");
                object[options[0]] = options[1].toString();
            }
        }
        console.log(object);
        return object;
    }
    function initValue() {
        var customer = JSON.parse(Ti.App.Properties.getString("customer"));
        $.billing_first_name.value = customer.customer.billing_address.first_name;
        $.billing_last_name.value = customer.customer.billing_address.last_name;
        $.billing_address_1.value = customer.customer.billing_address.address_1;
        $.billing_city.value = customer.customer.billing_address.city;
        $.billing_state.value = customer.customer.billing_address.state;
        $.billing_postcode.value = customer.customer.billing_address.postcode;
        $.billing_email.value = customer.customer.billing_address.email;
        $.billing_phone.value = customer.customer.billing_address.phone;
        $.shipping_first_name.value = customer.customer.shipping_address.first_name;
        $.shipping_last_name.value = customer.customer.shipping_address.last_name;
        $.shipping_address_1.value = customer.customer.shipping_address.address_1;
        $.shipping_city.value = customer.customer.shipping_address.city;
        $.shipping_state.value = customer.customer.shipping_address.state;
        $.shipping_postcode.value = customer.customer.shipping_address.postcode;
    }
    function translate() {
        $.bill_addr_btn.title = LANG.billingAddress;
        $.ship_addr_btn.title = LANG.shippingAddress;
        $.billing_first_name_lbl.text = LANG.fName;
        $.billing_last_name_lbl.text = LANG.lName;
        $.billing_address_1_lbl.text = LANG.address;
        $.billing_country_lbl.text = LANG.country;
        $.billing_country.text = Alloy.CFG.config.country;
        $.billing_country.symbol = Alloy.CFG.config.country_code;
        $.billing_city_lbl.text = LANG.town;
        $.billing_state_lbl.text = LANG.state;
        $.billing_postcode_lbl.text = LANG.postcode;
        $.billing_email_lbl.text = LANG.email;
        $.billing_phone_lbl.text = LANG.phone;
        $.shipping_first_name_lbl.text = LANG.fName;
        $.shipping_last_name_lbl.text = LANG.fName;
        $.shipping_address_1_lbl.text = LANG.address;
        $.shipping_country_lbl.text = LANG.country;
        $.shipping_country.text = Alloy.CFG.config.country;
        $.shipping_city_lbl.text = LANG.town;
        $.shipping_state_lbl.text = LANG.state;
        $.shipping_postcode_lbl.text = LANG.postcode;
        $.updateAddresses.title = LANG.updateAddresses;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "order";
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
    $.__views.content = Ti.UI.createScrollView({
        top: 60,
        bottom: 5,
        contentWidth: "auto",
        contentHeight: "auto",
        layout: "vertical",
        width: "95%",
        height: Ti.UI.SIZE,
        id: "content"
    });
    $.__views.Wrapper.add($.__views.content);
    $.__views.ship_view = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 40,
        top: 0,
        backgroundColor: "#ffffff",
        borderColor: "#ededed",
        borderWidth: 1,
        borderRadius: 5,
        id: "ship_view"
    });
    $.__views.content.add($.__views.ship_view);
    $.__views.bill_addr_btn = Ti.UI.createButton({
        width: "50%",
        height: Ti.UI.FILL,
        backgroundColor: "#41c162",
        textAlign: "center",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        color: "#fff",
        left: 0,
        id: "bill_addr_btn"
    });
    $.__views.ship_view.add($.__views.bill_addr_btn);
    $.__views.ship_addr_btn = Ti.UI.createButton({
        width: "50%",
        height: Ti.UI.FILL,
        backgroundColor: "#fff",
        textAlign: "center",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        color: "#c1c1c1",
        right: 0,
        id: "ship_addr_btn"
    });
    $.__views.ship_view.add($.__views.ship_addr_btn);
    $.__views.address_view = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "address_view"
    });
    $.__views.content.add($.__views.address_view);
    $.__views.bill_view = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "bill_view"
    });
    $.__views.address_view.add($.__views.bill_view);
    $.__views.__alloyId8 = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId8"
    });
    $.__views.bill_view.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createView({
        left: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.billing_first_name_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_first_name_lbl"
    });
    $.__views.__alloyId9.add($.__views.billing_first_name_lbl);
    $.__views.billing_first_name = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "billing_first_name"
    });
    $.__views.__alloyId9.add($.__views.billing_first_name);
    $.__views.__alloyId10 = Ti.UI.createView({
        right: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId10"
    });
    $.__views.__alloyId8.add($.__views.__alloyId10);
    $.__views.billing_last_name_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_last_name_lbl"
    });
    $.__views.__alloyId10.add($.__views.billing_last_name_lbl);
    $.__views.billing_last_name = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "billing_last_name"
    });
    $.__views.__alloyId10.add($.__views.billing_last_name);
    $.__views.__alloyId11 = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId11"
    });
    $.__views.bill_view.add($.__views.__alloyId11);
    $.__views.billing_address_1_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_address_1_lbl",
        top: "0"
    });
    $.__views.__alloyId11.add($.__views.billing_address_1_lbl);
    $.__views.billing_address_1 = Ti.UI.createTextField({
        top: "30",
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "billing_address_1"
    });
    $.__views.__alloyId11.add($.__views.billing_address_1);
    $.__views.__alloyId12 = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId12"
    });
    $.__views.bill_view.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createView({
        left: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.billing_country_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_country_lbl"
    });
    $.__views.__alloyId13.add($.__views.billing_country_lbl);
    $.__views.billing_country = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_country"
    });
    $.__views.__alloyId13.add($.__views.billing_country);
    $.__views.__alloyId14 = Ti.UI.createView({
        right: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId14"
    });
    $.__views.__alloyId12.add($.__views.__alloyId14);
    $.__views.billing_city_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_city_lbl"
    });
    $.__views.__alloyId14.add($.__views.billing_city_lbl);
    $.__views.billing_city = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "billing_city"
    });
    $.__views.__alloyId14.add($.__views.billing_city);
    $.__views.__alloyId15 = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId15"
    });
    $.__views.bill_view.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createView({
        left: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.billing_state_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_state_lbl"
    });
    $.__views.__alloyId16.add($.__views.billing_state_lbl);
    $.__views.billing_state = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "billing_state"
    });
    $.__views.__alloyId16.add($.__views.billing_state);
    $.__views.__alloyId17 = Ti.UI.createView({
        right: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId17"
    });
    $.__views.__alloyId15.add($.__views.__alloyId17);
    $.__views.billing_postcode_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_postcode_lbl"
    });
    $.__views.__alloyId17.add($.__views.billing_postcode_lbl);
    $.__views.billing_postcode = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "billing_postcode"
    });
    $.__views.__alloyId17.add($.__views.billing_postcode);
    $.__views.__alloyId18 = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId18"
    });
    $.__views.bill_view.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        left: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.billing_email_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_email_lbl"
    });
    $.__views.__alloyId19.add($.__views.billing_email_lbl);
    $.__views.billing_email = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "billing_email"
    });
    $.__views.__alloyId19.add($.__views.billing_email);
    $.__views.__alloyId20 = Ti.UI.createView({
        right: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
    $.__views.billing_phone_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "billing_phone_lbl"
    });
    $.__views.__alloyId20.add($.__views.billing_phone_lbl);
    $.__views.billing_phone = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "billing_phone"
    });
    $.__views.__alloyId20.add($.__views.billing_phone);
    $.__views.shipp_view = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        visible: false,
        id: "shipp_view"
    });
    $.__views.address_view.add($.__views.shipp_view);
    $.__views.__alloyId21 = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId21"
    });
    $.__views.shipp_view.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createView({
        left: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.shipping_first_name_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "shipping_first_name_lbl"
    });
    $.__views.__alloyId22.add($.__views.shipping_first_name_lbl);
    $.__views.shipping_first_name = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "shipping_first_name"
    });
    $.__views.__alloyId22.add($.__views.shipping_first_name);
    $.__views.__alloyId23 = Ti.UI.createView({
        right: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId23"
    });
    $.__views.__alloyId21.add($.__views.__alloyId23);
    $.__views.shipping_last_name_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "shipping_last_name_lbl"
    });
    $.__views.__alloyId23.add($.__views.shipping_last_name_lbl);
    $.__views.shipping_last_name = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "shipping_last_name"
    });
    $.__views.__alloyId23.add($.__views.shipping_last_name);
    $.__views.__alloyId24 = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId24"
    });
    $.__views.shipp_view.add($.__views.__alloyId24);
    $.__views.shipping_address_1_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "shipping_address_1_lbl",
        top: "0"
    });
    $.__views.__alloyId24.add($.__views.shipping_address_1_lbl);
    $.__views.shipping_address_1 = Ti.UI.createTextField({
        top: "30",
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "shipping_address_1"
    });
    $.__views.__alloyId24.add($.__views.shipping_address_1);
    $.__views.__alloyId25 = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId25"
    });
    $.__views.shipp_view.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createView({
        left: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.shipping_country_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "shipping_country_lbl"
    });
    $.__views.__alloyId26.add($.__views.shipping_country_lbl);
    $.__views.shipping_country = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "shipping_country"
    });
    $.__views.__alloyId26.add($.__views.shipping_country);
    $.__views.__alloyId27 = Ti.UI.createView({
        right: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId27"
    });
    $.__views.__alloyId25.add($.__views.__alloyId27);
    $.__views.shipping_city_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "shipping_city_lbl"
    });
    $.__views.__alloyId27.add($.__views.shipping_city_lbl);
    $.__views.shipping_city = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "shipping_city"
    });
    $.__views.__alloyId27.add($.__views.shipping_city);
    $.__views.__alloyId28 = Ti.UI.createView({
        top: 20,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId28"
    });
    $.__views.shipp_view.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createView({
        left: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    $.__views.shipping_state_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "shipping_state_lbl"
    });
    $.__views.__alloyId29.add($.__views.shipping_state_lbl);
    $.__views.shipping_state = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "shipping_state"
    });
    $.__views.__alloyId29.add($.__views.shipping_state);
    $.__views.__alloyId30 = Ti.UI.createView({
        right: 0,
        width: "47%",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId30"
    });
    $.__views.__alloyId28.add($.__views.__alloyId30);
    $.__views.shipping_postcode_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "shipping_postcode_lbl"
    });
    $.__views.__alloyId30.add($.__views.shipping_postcode_lbl);
    $.__views.shipping_postcode = Ti.UI.createTextField({
        top: 5,
        borderRadius: 5,
        height: 40,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        backgroundColor: "#fff",
        textAlign: "left",
        id: "shipping_postcode"
    });
    $.__views.__alloyId30.add($.__views.shipping_postcode);
    $.__views.__alloyId31 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 1,
        backgroundColor: "#e0e0e0",
        zIndex: 1,
        top: "10",
        id: "__alloyId31"
    });
    $.__views.content.add($.__views.__alloyId31);
    $.__views.payBtn = Ti.UI.createImageView({
        backgroundImage: "/images/pay.png",
        width: 64,
        height: 64,
        id: "payBtn",
        top: "20"
    });
    $.__views.content.add($.__views.payBtn);
    $.__views.updateAddresses = Ti.UI.createButton({
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
        top: 10,
        id: "updateAddresses"
    });
    $.__views.content.add($.__views.updateAddresses);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var HTTP = require("http");
    var DBHELPER = require("dbHelper");
    var LANG = require("translate").getLang();
    var CONFIG = arguments[0];
    var total = CONFIG.total;
    var customer_info = JSON.parse(Ti.App.Properties.getString("customer"));
    $.init = function() {
        translate();
        initNavbar();
        initValue();
    };
    $.bill_addr_btn.addEventListener("click", function() {
        $.bill_view.visible = true;
        $.shipp_view.visible = false;
        $.bill_addr_btn.color = "#fff";
        $.bill_addr_btn.backgroundColor = "#41c162";
        $.ship_addr_btn.backgroundColor = "#fff";
        $.ship_addr_btn.color = "#c1c1c1";
    });
    $.ship_addr_btn.addEventListener("click", function() {
        $.shipp_view.visible = true;
        $.bill_view.visible = false;
        $.ship_addr_btn.color = "#fff";
        $.ship_addr_btn.backgroundColor = "#41c162";
        $.bill_addr_btn.color = "#c1c1c1";
        $.bill_addr_btn.backgroundColor = "#fff";
    });
    $.payBtn.addEventListener("click", function() {
        if (validationChecking()) {
            APP.Loading.show();
            var payment_details = Alloy.CFG.config.payment_details;
            var line_items = [];
            var items = DBHELPER.fetchItems();
            for (var i = 0; i < items.length; i++) {
                var variationsArray = getVariations(items[i].prod_var);
                line_items.push({
                    product_id: items[i].product_id,
                    quantity: items[i].quantity,
                    variations: variationsArray
                });
            }
            var order_par = {
                order: {
                    payment_details: {
                        method_id: payment_details[0].method_id,
                        method_title: payment_details[0].method_title,
                        paid: false
                    },
                    billing_address: {
                        first_name: $.billing_first_name.value,
                        last_name: $.billing_last_name.value,
                        address_1: $.billing_address_1.value,
                        address_2: "",
                        city: $.billing_city.value,
                        state: $.billing_state.value,
                        postcode: $.billing_postcode.value,
                        country: Alloy.CFG.config.country_code,
                        email: $.billing_email.value,
                        phone: $.billing_phone.value
                    },
                    shipping_address: {
                        first_name: $.shipping_first_name.value,
                        last_name: $.shipping_last_name.value,
                        address_1: $.shipping_address_1.value,
                        address_2: "",
                        city: $.shipping_city.value,
                        state: $.shipping_state.value,
                        postcode: $.shipping_postcode.value,
                        country: Alloy.CFG.config.country_code
                    },
                    customer_id: customer_info.customer.id,
                    line_items: line_items,
                    shipping_lines: [ {
                        method_id: Alloy.CFG.config.shipping_lines.method_id,
                        method_title: Alloy.CFG.config.shipping_lines.method_title,
                        total: Alloy.CFG.config.shipping_lines.total
                    } ]
                }
            };
            HTTP.request({
                timeout: 5e4,
                type: "POST",
                format: "JSON",
                url: APP.Order_route,
                data: order_par,
                success: function(_data) {
                    APP.Loading.hide();
                    console.log(JSON.stringify(_data));
                    order_id = _data.order.id;
                    APP.addChild("payment", {
                        total: total,
                        order_id: order_id
                    });
                },
                failure: function(err) {
                    APP.Loading.hide();
                    console.log(JSON.stringify(err));
                    APP.Notifier.show({
                        view: $.Wrapper,
                        message: err ? err : LANG.no_connection,
                        type: "danger"
                    });
                }
            });
        }
    });
    $.updateAddresses.addEventListener("click", function() {
        if (validationChecking() && true == Titanium.Network.online) {
            APP.Loading.show();
            var customer_par = {
                customer: {
                    billing_address: {
                        first_name: $.billing_first_name.value,
                        last_name: $.billing_last_name.value,
                        address_1: $.billing_address_1.value,
                        address_2: "",
                        city: $.billing_city.value,
                        state: $.billing_state.value,
                        postcode: $.billing_postcode.value,
                        country: Alloy.CFG.config.country_code,
                        phone: $.billing_phone.value
                    },
                    shipping_address: {
                        first_name: $.shipping_first_name.value,
                        last_name: $.shipping_last_name.value,
                        address_1: $.shipping_address_1.value,
                        address_2: "",
                        city: $.shipping_city.value,
                        state: $.shipping_state.value,
                        postcode: $.shipping_postcode.value,
                        country: Alloy.CFG.config.country_code
                    }
                }
            };
            HTTP.request({
                type: "POST",
                format: "JSON",
                url: APP.updateAddresses_route + customer_info.customer.id,
                data: customer_par,
                success: function(_data) {
                    console.log(JSON.stringify(_data));
                    APP.Loading.hide();
                    APP.Notifier.show({
                        view: $.Wrapper,
                        message: LANG.addressesUpdated,
                        type: "success"
                    });
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
    });
    var validationChecking = function() {
        if ("" == $.billing_first_name.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: $.billing_first_name_lbl.text + LANG.required,
                type: "danger"
            });
            return false;
        }
        if ("" == $.billing_last_name.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: $.billing_last_name_lbl.text + LANG.required,
                type: "danger"
            });
            return false;
        }
        if ("" == $.billing_address_1.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: $.billing_address_1_lbl.text + LANG.required,
                type: "danger"
            });
            return false;
        }
        if ("" == $.billing_city.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: $.billing_city_lbl.text + LANG.required,
                type: "danger"
            });
            return false;
        }
        if ("" == $.billing_state.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: $.billing_state_lbl.text + LANG.required,
                type: "danger"
            });
            return false;
        }
        if ("" == $.billing_postcode.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: $.billing_postcode_lbl.text + LANG.required,
                type: "danger"
            });
            return false;
        }
        if ("" == $.billing_phone.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: $.billing_phone_lbl.text + LANG.required,
                type: "danger"
            });
            return false;
        }
        if ("" == $.billing_email.value) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: $.billing_email_lbl.text + LANG.required,
                type: "danger"
            });
            return false;
        }
        if (!Alloy.Globals.validateEmail($.billing_email.value)) {
            APP.Notifier.show({
                view: $.Wrapper,
                message: LANG.emailValid,
                type: "danger"
            });
            return false;
        }
        return true;
    };
    $.billing_first_name.addEventListener("change", function() {
        $.shipping_first_name.value = $.billing_first_name.value;
    });
    $.billing_last_name.addEventListener("change", function() {
        $.shipping_last_name.value = $.billing_last_name.value;
    });
    $.billing_address_1.addEventListener("change", function() {
        $.shipping_address_1.value = $.billing_address_1.value;
    });
    $.billing_city.addEventListener("change", function() {
        $.shipping_city.value = $.billing_city.value;
    });
    $.billing_state.addEventListener("change", function() {
        $.shipping_state.value = $.billing_state.value;
    });
    $.billing_postcode.addEventListener("change", function() {
        $.shipping_postcode.value = $.billing_postcode.value;
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;