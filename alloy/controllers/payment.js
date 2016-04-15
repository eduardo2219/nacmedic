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
        $.NavigationBar.setTitle(LANG.payment);
        $.NavigationBar.showBack({
            callback: function() {
                APP.removeAllChildren();
            }
        });
    }
    function translate() {
        $.pay_method_lbl.text = LANG.paymentMethod;
        $.payBtn.title = LANG.pay + " " + total + " " + Alloy.CFG.config.currency_format;
    }
    function updateOrder() {
        var payment_details = Ti.App.Properties.getObject("payment_details");
        console.log("updateOrder");
        var order_par = {
            order: {
                id: order_id,
                payment_details: {
                    method_id: payment_details.method_id,
                    method_title: payment_details.method_title,
                    paid: paid
                }
            }
        };
        HTTP.request({
            timeout: 5e4,
            type: "POST",
            format: "JSON",
            url: APP.UpdateOrder_route + order_id,
            data: order_par,
            success: function() {
                APP.Loading.hide();
                DBHELPER.deleteItem();
                Ti.App.fireEvent("cart:reload", {
                    fromPayment: 1
                });
                APP.Notifier.show({
                    view: $.Wrapper,
                    message: LANG.paySuccess,
                    type: "success"
                });
                setTimeout(function() {
                    APP.removeAllChildren();
                    APP.handleNavigation(0);
                }, 2e3);
            },
            failure: function(err) {
                APP.Loading.hide();
                console.log(JSON.stringify(err));
                APP.Notifier.show({
                    view: $.Wrapper,
                    message: LANG.no_connection,
                    type: "danger"
                });
            }
        });
    }
    function payPaypalMethod() {
        if (button) {
            $.hide_paypal.remove(button);
            button = null;
        }
        var invoiceItems = [];
        var items = DBHELPER.fetchItems();
        for (var i = 0; i < items.length; i++) invoiceItems.push({
            name: items[i].product_title,
            itemCount: items[i].quantity,
            itemPrice: items[i].price,
            totalPrice: items[i].quantity * items[i].price
        });
        console.log(JSON.stringify(invoiceItems));
        button = Paypal.createPaypalButton({
            width: 194,
            height: 37,
            buttonStyle: Paypal.BUTTON_194x37,
            bottom: 50,
            language: "en_US",
            textStyle: Paypal.PAYPAL_TEXT_PAY,
            appID: Alloy.CFG.config.paypal.PAYPAL_APP_ID,
            paypalEnvironment: Paypal.PAYPAL_ENV_SANDBOX,
            feePaidByReceiver: false,
            enableShipping: false,
            payment: {
                paymentType: Paypal.PAYMENT_TYPE_SERVICE,
                subtotal: total - Alloy.CFG.config.shipping_lines.total,
                tax: 0,
                shipping: Alloy.CFG.config.shipping_lines.total,
                currency: Alloy.CFG.config.currency,
                recipient: Alloy.CFG.config.paypal.paypalRecipient,
                customID: "Order Number " + order_id,
                invoiceItems: invoiceItems,
                ipnUrl: Alloy.CFG.config.woocommerce_domain,
                merchantName: Alloy.CFG.config.app_name,
                memo: "Mobile device payment"
            }
        });
        button.addEventListener("paymentCancelled", function() {
            console.log("Payment Cancelled.");
            paid = false;
            payPaypalMethod();
        });
        button.addEventListener("paymentSuccess", function(e) {
            console.log("Payment Success.  TransactionID: " + e.transactionID + ", Reloading...");
            paid = true;
            updateOrder();
        });
        button.addEventListener("paymentError", function(e) {
            console.log("Payment Error,  errorCode: " + e.errorCode + ", errorMessage: " + e.errorMessage);
            paid = false;
            payPaypalMethod();
        });
        button.addEventListener("buttonDisplayed", function() {
            console.log("The button was displayed!");
        });
        button.addEventListener("buttonError", function() {
            console.log("The button failed to display!");
        });
        $.hide_paypal.add(button);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "payment";
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
        backgroundColor: "#EEE",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.betait.navigationbar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.content = Ti.UI.createScrollView({
        top: 50,
        contentWidth: "auto",
        contentHeight: "auto",
        layout: "vertical",
        width: "98%",
        height: Ti.UI.FILL,
        id: "content"
    });
    $.__views.Wrapper.add($.__views.content);
    $.__views.pay_method_lbl = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#3c3c3c",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "left",
        id: "pay_method_lbl",
        top: "10"
    });
    $.__views.content.add($.__views.pay_method_lbl);
    $.__views.pay_view = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "pay_view",
        top: "20"
    });
    $.__views.content.add($.__views.pay_view);
    $.__views.payBtn = Ti.UI.createButton({
        height: 50,
        width: "50%",
        color: "#fff",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        backgroundColor: "#41c162",
        borderRadius: 0,
        top: 30,
        bottom: 0,
        id: "payBtn"
    });
    $.__views.content.add($.__views.payBtn);
    $.__views.hide_paypal = Ti.UI.createView({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        visible: false,
        id: "hide_paypal"
    });
    $.__views.content.add($.__views.hide_paypal);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var HTTP = require("http");
    var LANG = require("translate").getLang();
    var DBHELPER = require("dbHelper");
    var Paypal = require("ti.paypal");
    var CONFIG = arguments[0];
    var total = CONFIG.total;
    var order_id = CONFIG.order_id;
    var blockView = [], payLbl = [], payImage = [], button = null, paid = false;
    JSON.parse(Ti.App.Properties.getString("customer"));
    APP.Settings.useSlideMenu && $.NavigationBar.showMenu();
    $.init = function() {
        translate();
        initNavbar();
        var payment_details = Alloy.CFG.config.payment_details;
        for (var i = 0; i < payment_details.length; i++) {
            blockView[i] = Titanium.UI.createView({
                height: 35,
                backgroundColor: "#fff",
                index: i
            });
            $.addClass(blockView[i], "block_view");
            payLbl[i] = Ti.UI.createLabel({
                text: payment_details[i].method_title,
                index: i
            });
            $.addClass(payLbl[i], "lbl");
            payLbl[i].textAlign = "left";
            blockView[i].add(payLbl[i]);
            payImage[i] = Ti.UI.createImageView({
                index: i
            });
            $.addClass(payImage[i], "icon right5");
            blockView[i].add(payImage[i]);
            $.pay_view.add(blockView[i]);
            if (0 == i) {
                payImage[0].image = "/images/check.png";
                Ti.App.Properties.setObject("payment_details", payment_details[0]);
                if ("paypal" == payment_details[0].method_id) {
                    $.hide_paypal.visible = true;
                    $.payBtn.visible = false;
                    payPaypalMethod();
                }
            }
            blockView[i].addEventListener("click", function(e) {
                payImage[e.source.index].image = "/images/check.png";
                Ti.App.Properties.setObject("payment_details", payment_details[e.source.index]);
                for (var k = 0; k < payment_details.length; k++) k != e.source.index && (payImage[k].image = null);
                if ("paypal" == payment_details[e.source.index].method_id) {
                    $.hide_paypal.visible = true;
                    $.payBtn.visible = false;
                    payPaypalMethod();
                } else {
                    $.hide_paypal.visible = false;
                    $.payBtn.visible = true;
                }
            });
        }
    };
    $.payBtn.addEventListener("click", function() {
        paid = false;
        updateOrder();
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;