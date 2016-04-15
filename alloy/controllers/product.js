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
        $.NavigationBar.setTitle(CONFIG.title);
        $.NavigationBar.showBack({
            callback: function() {
                APP.removeChild();
            }
        });
        var wishlist = DBHELPER.fetchWishlist(CONFIG.id);
        var img = "/images/unlike.png";
        wishlist.length > 0 && (img = "/images/like.png");
        $.NavigationBar.showFav({
            image: img,
            callback: function() {
                var wishlist = DBHELPER.fetchWishlist(CONFIG.id);
                var img = "";
                if (wishlist.length > 0) {
                    img = "/images/unlike.png";
                    DBHELPER.deleteWishlist(CONFIG.id);
                } else {
                    img = "/images/like.png";
                    DBHELPER.addWishlist(current_product);
                }
                $.NavigationBar.setFav({
                    image: img
                });
                Ti.App.fireEvent("wishlist:reload");
            }
        });
    }
    function getProduct(callBack) {
        APP.Loading.show();
        HTTP.request({
            type: "GET",
            format: "JSON",
            url: APP.Product_route + CONFIG.id,
            success: function(_data) {
                callBack(_data.product);
            },
            failure: function(err) {
                console.log(JSON.stringify(err));
                APP.Loading.hide();
                APP.Notifier.show({
                    view: $.Wrapper,
                    message: err ? err : LANG.no_connection,
                    type: "danger"
                });
            }
        });
    }
    function find_matching_variations(product_attributes, product_variations) {
        product_variations.length > 0 && ($.variation_header.visible = true);
        var lbl_attr = "";
        var attr_slug = "";
        for (var i = 0; i < product_variations.length; i++) {
            var attributes = product_variations[i].attributes;
            lbl_attr = "";
            attr_slug = "";
            for (var k = 0; k < attributes.length; k++) {
                var attr = attributes[k]["name"] + " : " + attributes[k]["option"].toUpperCase() + " _ ";
                lbl_attr += attr;
                attr_slug = attr_slug + "::pa_" + attributes[k]["slug"] + ":" + attributes[k]["option"];
                if (k == attributes.length - 1) {
                    lbl_attr = lbl_attr + "  " + product_variations[i]["price"] + " " + Alloy.CFG.config.currency_format;
                    if (0 == i) {
                        $.p_regular_price.text = product_variations[i]["price"] + " " + Alloy.CFG.config.currency_format;
                        current_product.price = product_variations[i]["price"];
                        current_product.prod_var = attr_slug;
                    }
                }
            }
            blockView[i] = Titanium.UI.createView({
                height: Ti.UI.SIZE,
                backgroundColor: "#fff",
                index: i,
                attr_slug: attr_slug,
                price: product_variations[i]["price"],
                top: 4
            });
            $.addClass(blockView[i], "block_view");
            payLbl[i] = Ti.UI.createLabel({
                text: lbl_attr,
                height: Ti.UI.SIZE,
                index: i,
                wordWrap: true,
                width: Ti.UI.FILL,
                left: 5,
                right: 30,
                color: "#3c3c3c",
                font: {
                    fontSize: 12,
                    fontFamily: Alloy.CFG.fontFamily
                }
            });
            blockView[i].add(payLbl[i]);
            attrImage[i] = Ti.UI.createImageView({
                index: i,
                right: 0
            });
            $.addClass(attrImage[i], "icon right5");
            blockView[i].add(attrImage[i]);
            $.variation_view.add(blockView[i]);
            0 == i && (attrImage[0].image = "/images/check.png");
            blockView[i].addEventListener("click", function(e) {
                current_product.prod_var = blockView[e.source.index].attr_slug;
                current_product.price = blockView[e.source.index].price;
                $.p_regular_price.text = blockView[e.source.index].price + " " + Alloy.CFG.config.currency_format;
                attrImage[e.source.index].image = "/images/check.png";
                for (var k = 0; k < product_variations.length; k++) k != e.source.index && (attrImage[k].image = null);
            });
        }
    }
    function translate() {
        $.variation_header.text = LANG.variations;
        $.description_header.text = LANG.description;
        if ("ltr" == Alloy.CFG.config.direction) {
            $.p_title.left = 5;
            $.p_description.left = 5;
        } else {
            $.p_title.right = 5;
            $.p_title.textAlign = "right";
            $.p_description.right = 5;
            $.p_description.textAlign = "right";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "product";
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
    $.__views.prod_content = Ti.UI.createScrollView({
        top: 60,
        bottom: 40,
        contentWidth: Ti.UI.FILL,
        contentHeight: "auto",
        showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
        layout: "vertical",
        width: "98%",
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        id: "prod_content"
    });
    $.__views.Wrapper.add($.__views.prod_content);
    var __alloyId32 = [];
    $.__views.carousel = Ti.UI.createScrollableView({
        top: 0,
        showPagingControl: true,
        pagingControlHeight: 30,
        maxZoomScale: 4,
        currentPage: 1,
        width: Ti.UI.SIZE,
        views: __alloyId32,
        id: "carousel"
    });
    $.__views.prod_content.add($.__views.carousel);
    $.__views.p_title = Ti.UI.createLabel({
        top: 10,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        color: "#444444",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily,
            fontWeight: "bold"
        },
        wordWrap: true,
        id: "p_title"
    });
    $.__views.prod_content.add($.__views.p_title);
    $.__views.price_view = Ti.UI.createView({
        top: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "price_view"
    });
    $.__views.prod_content.add($.__views.price_view);
    $.__views.p_regular_price = Ti.UI.createLabel({
        left: 5,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        color: "#444444",
        font: {
            fontSize: 12,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: true,
        id: "p_regular_price"
    });
    $.__views.price_view.add($.__views.p_regular_price);
    $.__views.p_rate = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        right: 5,
        id: "p_rate"
    });
    $.__views.price_view.add($.__views.p_rate);
    $.__views.description_header = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#fff",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "center",
        left: 5,
        top: 10,
        backgroundColor: "#ff5a54",
        id: "description_header"
    });
    $.__views.prod_content.add($.__views.description_header);
    $.__views.p_description = Ti.UI.createLabel({
        top: 10,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        color: "#444444",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: true,
        id: "p_description"
    });
    $.__views.prod_content.add($.__views.p_description);
    $.__views.variation_header = Ti.UI.createLabel({
        height: 30,
        width: Ti.UI.FILL,
        color: "#fff",
        font: {
            fontSize: 14,
            fontFamily: Alloy.CFG.fontFamily
        },
        wordWrap: false,
        textAlign: "center",
        left: 5,
        top: 10,
        visible: false,
        backgroundColor: "#ff5a54",
        id: "variation_header"
    });
    $.__views.prod_content.add($.__views.variation_header);
    $.__views.variation_view = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: 10,
        bottom: 20,
        id: "variation_view"
    });
    $.__views.prod_content.add($.__views.variation_view);
    $.__views.footer = Ti.UI.createView({
        bottom: 0,
        width: Ti.UI.FILL,
        height: 40,
        layout: "horizontal",
        id: "footer"
    });
    $.__views.Wrapper.add($.__views.footer);
    $.__views.__alloyId33 = Ti.UI.createView({
        width: "33%",
        height: Ti.UI.FILL,
        id: "__alloyId33"
    });
    $.__views.footer.add($.__views.__alloyId33);
    $.__views.addToCart = Ti.UI.createButton({
        width: 30,
        height: 30,
        backgroundImage: "/images/addcart.png",
        id: "addToCart"
    });
    $.__views.__alloyId33.add($.__views.addToCart);
    $.__views.__alloyId34 = Ti.UI.createView({
        width: "33%",
        height: Ti.UI.FILL,
        id: "__alloyId34"
    });
    $.__views.footer.add($.__views.__alloyId34);
    $.__views.share = Ti.UI.createButton({
        width: 30,
        height: 30,
        backgroundImage: "/images/share.png",
        id: "share"
    });
    $.__views.__alloyId34.add($.__views.share);
    $.__views.__alloyId35 = Ti.UI.createView({
        width: "33%",
        height: Ti.UI.FILL,
        id: "__alloyId35"
    });
    $.__views.footer.add($.__views.__alloyId35);
    $.__views.addComment = Ti.UI.createButton({
        width: 30,
        height: 30,
        backgroundImage: "/images/addcomment.png",
        id: "addComment"
    });
    $.__views.__alloyId35.add($.__views.addComment);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var HTTP = require("http");
    var DBHELPER = require("dbHelper");
    var LANG = require("translate").getLang();
    var CONFIG = arguments[0];
    var current_product = {};
    var blockView = [], payLbl = [], attrImage = [];
    $.init = function() {
        $.carousel.height = Alloy.isHandheld ? 300 : 400;
        translate();
        initNavbar();
        getProduct(function(product) {
            var product_images = product.images;
            var image = [];
            for (var x = 0; x < product_images.length; x++) image[x] = Ti.UI.createImageView({
                image: product_images[x].src,
                width: Alloy.isHandheld ? Ti.UI.FILL : "60%",
                height: Alloy.isHandheld ? 300 : 400
            });
            $.carousel.views = image;
            $.p_rate.add(Alloy.createWidget("com.hashapps.tirate", {
                rate: product.average_rating
            }).getView());
            $.p_title.text = product.title;
            $.p_regular_price.text = (product.sale_price ? product.sale_price : product.regular_price) + " " + Alloy.CFG.config.currency_format;
            var description = product.description;
            description = description.replace(/<[^>]+>/g, "");
            $.p_description.text = description ? description : LANG.noDescription;
            current_product.product_id = product.id;
            current_product.quantity = 1;
            current_product.product_title = product.title;
            current_product.price = product.sale_price ? product.sale_price : product.regular_price;
            current_product.product_image = product.featured_src;
            find_matching_variations(product.attributes, product.variations);
            APP.Loading.hide();
        });
    };
    $.addToCart.addEventListener("click", function() {
        DBHELPER.addItem(current_product);
        Ti.App.fireEvent("cart:reload");
        APP.Notifier.show({
            view: $.Wrapper,
            message: current_product.product_title + LANG.addedToCart,
            type: "success"
        });
    });
    $.share.addEventListener("click", function() {
        require("com.alcoapps.socialshare").share({
            status: current_product.product_title + " " + Alloy.CFG.config.woocommerce_domain + "?p=" + CONFIG.id,
            image: current_product.product_image,
            androidDialogTitle: "Share " + current_product.product_title,
            view: $.share
        });
    });
    $.addComment.addEventListener("click", function() {
        APP.addChild("reviews", {
            id: CONFIG.id,
            title: CONFIG.title
        });
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;