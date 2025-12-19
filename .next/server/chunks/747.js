"use strict";
exports.id = 747;
exports.ids = [747];
exports.modules = {

/***/ 7157:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const CheckoutFuntion = ({ sidebar })=>{
    const [cartData, setCartData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        {
            id: 1,
            image: "/assets/img/order-1.png",
            title: "Egg, kiwi and sauce chilli",
            tags: [
                "breakfast",
                "brunch"
            ],
            price: 39,
            quantity: 1,
            category: [
                "breakfast",
                "lunch",
                "dinner"
            ]
        },
        {
            id: 2,
            image: "/assets/img/order-2.png",
            title: "Potatoes with pork and dried fruits",
            tags: [
                "breakfast",
                "brunch"
            ],
            price: 49,
            quantity: 1,
            category: [
                "breakfast",
                "dinner"
            ]
        }
    ]);
    // total price
    const [subTotal, setSubTotal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [totalPrice, setTotalPrice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setSubTotal(subTotal_());
        setTotalPrice(Number(subTotal_()).toFixed(2));
        localStorage.setItem("munfirm", JSON.stringify({
            subTotal,
            totalPrice,
            cartData
        }));
    });
    const subTotal_ = ()=>{
        return cartData.map((item)=>item.price * item.quantity).reduce((prev, next)=>prev + next, 0).toFixed(2);
    };
    const updateQuantity = (item, type, value)=>{
        let findCartItem = cartData.find((cart, i)=>i === item);
        findCartItem.quantity = type == "-" ? findCartItem.quantity === 1 ? 1 : findCartItem.quantity - 1 : type == "+" ? findCartItem.quantity + 1 : value;
        setCartData([
            ...cartData
        ]);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "checkout-order",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "title-checkout",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        children: "Your order:"
                    }),
                    !sidebar && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                        children: cartData.length
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "banner-wilmington",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        alt: "logo",
                        src: "assets/img/logo-s.jpg"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                        children: "Kennington Lane Cafe"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                children: cartData.map((item, i)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                        className: "price-list",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                className: "closeButton fa-solid fa-xmark",
                                onClick: ()=>setCartData(cartData.filter((c)=>c.id !== item.id))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "counter-container",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "counter-food",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                alt: "food",
                                                src: item.image
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                                                children: item.title
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                        children: [
                                            "$",
                                            item.price
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "price",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                                children: [
                                                    "$",
                                                    item.price
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: "Sum"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "qty-input",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        className: "qty-count qty-count--minus",
                                                        "data-action": "minus",
                                                        type: "button",
                                                        onClick: ()=>updateQuantity(i, "-"),
                                                        children: "-"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                        className: "product-qty",
                                                        type: "number",
                                                        value: item.quantity,
                                                        onChange: (e)=>updateQuantity(i, "value", Number(e.target.value)),
                                                        name: "quantity"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                        className: "qty-count qty-count--add",
                                                        "data-action": "add",
                                                        type: "button",
                                                        onClick: ()=>updateQuantity(i, "+"),
                                                        children: "+"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: "Quantity"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }, item.id))
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "totel-price",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "Total order:"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h5", {
                        children: [
                            "$ ",
                            Number(totalPrice).toFixed(2)
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "totel-price",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "To pay:"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                        children: [
                            "$ ",
                            Number(totalPrice).toFixed(2)
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckoutFuntion);


/***/ }),

/***/ 4747:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ layouts_Layout)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "aos"
var external_aos_ = __webpack_require__(9783);
var external_aos_default = /*#__PURE__*/__webpack_require__.n(external_aos_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-nice-select"
var external_react_nice_select_ = __webpack_require__(9051);
var external_react_nice_select_default = /*#__PURE__*/__webpack_require__.n(external_react_nice_select_);
// EXTERNAL MODULE: external "react-player"
var external_react_player_ = __webpack_require__(8924);
var external_react_player_default = /*#__PURE__*/__webpack_require__.n(external_react_player_);
;// CONCATENATED MODULE: ./src/useClickOutside.js

let useClickOutside = (handler)=>{
    let domNode = (0,external_react_.useRef)();
    (0,external_react_.useEffect)(()=>{
        let maybeHandler = (event)=>{
            if (!domNode.current.contains(event.target)) {
                handler();
            }
        };
        document.addEventListener("mousedown", maybeHandler);
        return ()=>{
            document.removeEventListener("mousedown", maybeHandler);
        };
    });
    return domNode;
};
/* harmony default export */ const src_useClickOutside = (useClickOutside);

;// CONCATENATED MODULE: ./src/components/VideoPopup.js




const VideoPopup_ = ({ close, videoID })=>{
    let domNode = src_useClickOutside(()=>{
        close(false);
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(external_react_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "mfp-bg mfp-ready",
                onClick: ()=>close(false)
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready",
                tabIndex: -1,
                style: {
                    overflow: "hidden auto"
                },
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "mfp-container popup-container mfp-s-ready mfp-iframe-holder",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "mfp-content",
                            ref: domNode,
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "mfp-iframe-scaler",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                                        title: "Close (Esc)",
                                        type: "button",
                                        className: "mfp-close",
                                        onClick: ()=>close(),
                                        children: "\xd7"
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx((external_react_player_default()), {
                                        url: videoID,
                                        playing: true
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "mfp-preloader",
                            children: "Loading..."
                        })
                    ]
                })
            })
        ]
    });
};
const VideoPopup = ()=>{
    const [video, setVideo] = (0,external_react_.useState)(false);
    const [videoValue, setVideoValue] = (0,external_react_.useState)(null);
    (0,external_react_.useEffect)(()=>{
        setTimeout(()=>{
            const a = document.querySelectorAll("a");
            a.forEach((a)=>{
                if (a.href.includes("www.youtube.com") || a.href.includes("vimeo.com") || a.href.includes("soundcloud.com")) {
                    a.addEventListener("click", (e)=>{
                        e.preventDefault();
                        setVideoValue(a.href);
                        setVideo(true);
                    });
                }
            });
        }, 1500);
    }, []);
    return /*#__PURE__*/ jsx_runtime.jsx(external_react_.Fragment, {
        children: video && /*#__PURE__*/ jsx_runtime.jsx(VideoPopup_, {
            close: ()=>setVideo(false),
            videoID: videoValue
        })
    });
};
/* harmony default export */ const components_VideoPopup = (VideoPopup);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/layouts/Footer.js


const Footer = ()=>{
    return /*#__PURE__*/ jsx_runtime.jsx("footer", {
        className: "gap no-bottom",
        style: {
            backgroundColor: "#363636"
        },
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "container",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "row",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "col-lg-5 col-md-6 col-sm-12",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "footer-description",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                        href: "/",
                                        children: /*#__PURE__*/ jsx_runtime.jsx("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: 163,
                                            height: 38,
                                            viewBox: "0 0 163 38",
                                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("g", {
                                                id: "Logo-w",
                                                transform: "translate(-260 -51)",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx("g", {
                                                        id: "Logo-2-w",
                                                        "data-name": "Logo-w",
                                                        transform: "translate(260 51)",
                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("g", {
                                                            id: "Elements-w",
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    id: "Path_2429",
                                                                    "data-name": "Path 2429",
                                                                    d: "M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z",
                                                                    transform: "translate(-270.155 -115.396)",
                                                                    fill: "#f29f05"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    id: "Path_2430",
                                                                    "data-name": "Path 2430",
                                                                    d: "M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z",
                                                                    transform: "translate(-264.176 -113.935)",
                                                                    fill: "#fff"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    id: "Path_2431",
                                                                    "data-name": "Path 2431",
                                                                    d: "M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z",
                                                                    transform: "translate(-266.247 -108.544)",
                                                                    fill: "#fff"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    id: "Path_2432",
                                                                    "data-name": "Path 2432",
                                                                    d: "M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z",
                                                                    transform: "translate(-264.027 -108.446)",
                                                                    fill: "#fff"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    id: "Path_2433",
                                                                    "data-name": "Path 2433",
                                                                    d: "M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z",
                                                                    transform: "translate(-271.815 -108.923)",
                                                                    fill: "#f29f05"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    id: "Path_2434",
                                                                    "data-name": "Path 2434",
                                                                    d: "M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z",
                                                                    transform: "translate(-264.154 -116.667)",
                                                                    fill: "#f29f05"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    id: "Path_2435",
                                                                    "data-name": "Path 2435",
                                                                    d: "M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z",
                                                                    transform: "translate(-270.84 -107.068)",
                                                                    fill: "#fff"
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                    id: "Path_2436",
                                                                    "data-name": "Path 2436",
                                                                    d: "M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z",
                                                                    transform: "translate(-269.379 -105.218)",
                                                                    fill: "#fff"
                                                                })
                                                            ]
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("text", {
                                                        id: "Remotive-Logistics-w",
                                                        transform: "translate(320 77)",
                                                        fill: "#fff",
                                                        fontSize: 16,
                                                        fontFamily: "Poppins",
                                                        fontWeight: 700,
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime.jsx("tspan", {
                                                                x: 0,
                                                                y: 0,
                                                                children: "REMOTIVE"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("tspan", {
                                                                y: 0,
                                                                fill: "#E63946",
                                                                children: "LOGISTICS"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("h2", {
                                        children: "The Best Restaurants in Your Home"
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                                        children: "Vitae congue mauris rhoncus aenean. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Tempus egestas sed sed risus pretium quam."
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                            className: "col-lg-3 col-md-6 col-sm-12",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "menu",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("h4", {
                                        children: "Menu"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                        className: "footer-menu",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                                                    href: "/",
                                                    children: [
                                                        "home",
                                                        /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                            className: "fa-solid fa-arrow-right"
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                                                    href: "about",
                                                    children: [
                                                        "about us",
                                                        /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                            className: "fa-solid fa-arrow-right"
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                                                    href: "restaurants",
                                                    children: [
                                                        "Restaurants",
                                                        /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                            className: "fa-solid fa-arrow-right"
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)((link_default()), {
                                                    href: "contacts",
                                                    children: [
                                                        "Contacts",
                                                        /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                            className: "fa-solid fa-arrow-right"
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "col-lg-4 col-md-6 col-sm-12",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "menu contacts",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("h4", {
                                            children: "Contacts"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                            className: "footer-location",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                    className: "fa-solid fa-location-dot"
                                                }),
                                                /*#__PURE__*/ jsx_runtime.jsx("p", {
                                                    children: "1717 Harrison St, San Francisco, CA 94103, United States"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                                            href: "mailto:info@remotive.com",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                    className: "fa-solid fa-envelope"
                                                }),
                                                "info@remotive.com"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                                            href: "callto:+14253261627",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                    className: "fa-solid fa-phone"
                                                }),
                                                "+1 425 326 16 27"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                    className: "social-media",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                            children: [
                                                " ",
                                                /*#__PURE__*/ jsx_runtime.jsx("a", {
                                                    href: "https://facebook.com",
                                                    target: "_blank",
                                                    children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                        className: "fa-brands fa-facebook-f"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                            children: [
                                                " ",
                                                /*#__PURE__*/ jsx_runtime.jsx("a", {
                                                    href: "https://instagram.com",
                                                    target: "_blank",
                                                    children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                        className: "fa-brands fa-instagram"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                            children: [
                                                " ",
                                                /*#__PURE__*/ jsx_runtime.jsx("a", {
                                                    href: "https://twitter.com",
                                                    target: "_blank",
                                                    children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                        className: "fa-brands fa-twitter"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "footer-two gap no-bottom",
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("p", {
                            children: "Copyright \xa9 2024. Remotive Logistics. All rights reserved."
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "privacy",
                            children: [
                                " ",
                                /*#__PURE__*/ jsx_runtime.jsx("a", {
                                    href: "#",
                                    children: "Privacy Policy"
                                }),
                                " ",
                                /*#__PURE__*/ jsx_runtime.jsx("a", {
                                    href: "#",
                                    children: "Terms & Services"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const layouts_Footer = (Footer);

// EXTERNAL MODULE: ./src/components/CheckoutFuntion.js
var CheckoutFuntion = __webpack_require__(7157);
;// CONCATENATED MODULE: ./src/layouts/MobileMenu.js



const MobileMenu = ()=>{
    const [activeMenu, setActiveMenu] = (0,external_react_.useState)("");
    const activeMenuSet = (value)=>setActiveMenu(activeMenu === value ? "" : value), activeLi = (value)=>value === activeMenu ? "active" : "";
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("li", {
                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                    href: "/",
                    children: "Home"
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("li", {
                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                    href: "about",
                    children: "About Us"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                className: `menu-item-has-children ${activeLi("Restaurants")}`,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("a", {
                        href: "#",
                        onClick: ()=>activeMenuSet("Restaurants"),
                        children: "Restaurants"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                        className: "sub-menu",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "restaurants",
                                    children: "Restaurants"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "restaurant-card",
                                    children: "Restaurant Card"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "checkout",
                                    children: "Checkout"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                className: `menu-item-has-children ${activeLi("Pages")}`,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("a", {
                        href: "#",
                        onClick: ()=>activeMenuSet("Pages"),
                        children: "Pages"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                        className: "sub-menu",
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "blog",
                                    children: "Blog"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "single-blog",
                                    children: "Single Blog"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "services",
                                    children: "Services"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "faq",
                                    children: "FAQ"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "pricing-table",
                                    children: "Pricing Table"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "become-partner",
                                    children: "Become A Partner"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "404",
                                    children: "404"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx("li", {
                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                    href: "contact",
                    children: "contacts"
                })
            })
        ]
    });
};
/* harmony default export */ const layouts_MobileMenu = (MobileMenu);

;// CONCATENATED MODULE: ./src/layouts/Header.js





const Header = ({ extraClass })=>{
    const onClick = (e)=>{
        const body = document.querySelector("body");
        body.classList.toggle("active");
        e.preventDefault();
    };
    // mobile menu
    const [mobileToggle, setMobileToggle] = (0,external_react_.useState)(false);
    return /*#__PURE__*/ jsx_runtime.jsx("header", {
        className: extraClass,
        children: /*#__PURE__*/ jsx_runtime.jsx("div", {
            className: "container",
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "row align-items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "col-xl-2",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "header-style",
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "/",
                                    children: /*#__PURE__*/ jsx_runtime.jsx("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: 163,
                                        height: 38,
                                        viewBox: "0 0 163 38",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("g", {
                                            id: "Logo",
                                            transform: "translate(-260 -51)",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("g", {
                                                    id: "Logo-2",
                                                    "data-name": "Logo",
                                                    transform: "translate(260 51)",
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("g", {
                                                        id: "Elements",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_1429",
                                                                "data-name": "Path 1429",
                                                                d: "M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z",
                                                                transform: "translate(-270.155 -115.396)",
                                                                fill: "#f29f05"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_1430",
                                                                "data-name": "Path 1430",
                                                                d: "M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z",
                                                                transform: "translate(-264.176 -113.935)",
                                                                fill: "#fff"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_1431",
                                                                "data-name": "Path 1431",
                                                                d: "M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z",
                                                                transform: "translate(-266.247 -108.544)",
                                                                fill: "#363636"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_1432",
                                                                "data-name": "Path 1432",
                                                                d: "M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z",
                                                                transform: "translate(-264.027 -108.446)",
                                                                fill: "#363636"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_1433",
                                                                "data-name": "Path 1433",
                                                                d: "M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z",
                                                                transform: "translate(-271.815 -108.923)",
                                                                fill: "#f29f05"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_1434",
                                                                "data-name": "Path 1434",
                                                                d: "M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z",
                                                                transform: "translate(-264.154 -116.667)",
                                                                fill: "#f29f05"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_1435",
                                                                "data-name": "Path 1435",
                                                                d: "M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z",
                                                                transform: "translate(-270.84 -107.068)",
                                                                fill: "#363636"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_1436",
                                                                "data-name": "Path 1436",
                                                                d: "M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z",
                                                                transform: "translate(-269.379 -105.218)",
                                                                fill: "#363636"
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("text", {
                                                    id: "Remotive-Logistics",
                                                    transform: "translate(320 77)",
                                                    fill: "#363636",
                                                    fontSize: 16,
                                                    fontFamily: "Poppins",
                                                    fontWeight: 700,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime.jsx("tspan", {
                                                            x: 0,
                                                            y: 0,
                                                            children: "REMOTIVE"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("tspan", {
                                                            y: 0,
                                                            fill: "#E63946",
                                                            children: "LOGISTICS"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "extras bag",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("a", {
                                            href: "#",
                                            className: "menu-btn",
                                            onClick: (e)=>onClick(e),
                                            children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                className: "fa-solid fa-bag-shopping"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("div", {
                                            className: "bar-menu",
                                            onClick: ()=>setMobileToggle(true),
                                            children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                                className: "fa-solid fa-bars"
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "col-lg-7",
                        children: /*#__PURE__*/ jsx_runtime.jsx("nav", {
                            className: "navbar",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                className: "navbar-links",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("li", {
                                        className: "navbar-dropdown",
                                        children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                            href: "/",
                                            children: "Home"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("li", {
                                        className: "navbar-dropdown",
                                        children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                            href: "about",
                                            children: "About Us"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                        className: "navbar-dropdown",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                href: "restaurants",
                                                children: "Restaurants"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "dropdown",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "restaurants",
                                                        children: "Restaurants"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "restaurant-card",
                                                        children: "Restaurant Card"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "checkout",
                                                        children: "Checkout"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                        className: "navbar-dropdown",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                href: "#",
                                                children: "Pages"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "dropdown",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "blog",
                                                        children: "Blog"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "single-blog",
                                                        children: "Single Blog"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "services",
                                                        children: "Services"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "faq",
                                                        children: "FAQ"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "pricing-table",
                                                        children: "Pricing Table"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "become-partner",
                                                        children: "Become A Partner"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                                        href: "404",
                                                        children: "404"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("li", {
                                        className: "navbar-dropdown",
                                        children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                            href: "contacts",
                                            children: "Contacts"
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "col-lg-3",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "extras bag",
                            children: [
                                /*#__PURE__*/ jsx_runtime.jsx("a", {
                                    href: "#",
                                    id: "desktop-menu",
                                    className: "menu-btn",
                                    onClick: (e)=>onClick(e),
                                    children: /*#__PURE__*/ jsx_runtime.jsx("i", {
                                        className: "fa-solid fa-bag-shopping"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "checkout",
                                    className: "button button-2",
                                    children: "Order Now"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                        className: "menu-wrap",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "menu-inner ps ps--active-x ps--active-y",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                    className: "menu-cls-btn",
                                    onClick: (e)=>onClick(e),
                                    children: [
                                        /*#__PURE__*/ jsx_runtime.jsx("i", {
                                            className: "cls-leftright"
                                        }),
                                        /*#__PURE__*/ jsx_runtime.jsx("i", {
                                            className: "cls-rightleft"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime.jsx(CheckoutFuntion/* default */.Z, {
                                    sidebar: true
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: `mobile-nav hmburger-menu ${mobileToggle ? "open" : ""}`,
                        id: "mobile-nav",
                        style: {
                            display: "block"
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime.jsx("div", {
                                className: "res-log",
                                children: /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                                    href: "/",
                                    children: /*#__PURE__*/ jsx_runtime.jsx("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: 163,
                                        height: 38,
                                        viewBox: "0 0 163 38",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("g", {
                                            id: "Logo-m",
                                            transform: "translate(-260 -51)",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime.jsx("g", {
                                                    id: "Logo-2-m",
                                                    "data-name": "Logo",
                                                    transform: "translate(260 51)",
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("g", {
                                                        id: "Elements-m",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_3429",
                                                                "data-name": "Path 3429",
                                                                d: "M315.086,140.507H275.222v-.894c0-11.325,8.941-20.538,19.933-20.538s19.931,9.213,19.931,20.538Z",
                                                                transform: "translate(-270.155 -115.396)",
                                                                fill: "#f29f05"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_3430",
                                                                "data-name": "Path 3430",
                                                                d: "M301.13,133.517a1.488,1.488,0,0,1-1.394-.994,11.361,11.361,0,0,0-10.583-7.54,1.528,1.528,0,0,1,0-3.055,14.353,14.353,0,0,1,13.37,9.527,1.541,1.541,0,0,1-.875,1.966A1.444,1.444,0,0,1,301.13,133.517Z",
                                                                transform: "translate(-264.176 -113.935)",
                                                                fill: "#fff"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_3431",
                                                                "data-name": "Path 3431",
                                                                d: "M297.343,146.544a14.043,14.043,0,0,1-13.837-14.211h2.975a10.865,10.865,0,1,0,21.723,0h2.975A14.043,14.043,0,0,1,297.343,146.544Z",
                                                                transform: "translate(-266.247 -108.544)",
                                                                fill: "#363636"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_3432",
                                                                "data-name": "Path 3432",
                                                                d: "M302.183,132.519a7.064,7.064,0,1,1-14.122,0Z",
                                                                transform: "translate(-264.027 -108.446)",
                                                                fill: "#363636"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_3433",
                                                                "data-name": "Path 3433",
                                                                d: "M320.332,134.575H273.3a1.528,1.528,0,0,1,0-3.055h47.033a1.528,1.528,0,0,1,0,3.055Z",
                                                                transform: "translate(-271.815 -108.923)",
                                                                fill: "#f29f05"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_3434",
                                                                "data-name": "Path 3434",
                                                                d: "M289.154,123.4a1.507,1.507,0,0,1-1.487-1.528v-3.678a1.488,1.488,0,1,1,2.975,0v3.678A1.508,1.508,0,0,1,289.154,123.4Z",
                                                                transform: "translate(-264.154 -116.667)",
                                                                fill: "#f29f05"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_3435",
                                                                "data-name": "Path 3435",
                                                                d: "M284.777,138.133H275.3a1.528,1.528,0,0,1,0-3.055h9.474a1.528,1.528,0,0,1,0,3.055Z",
                                                                transform: "translate(-270.84 -107.068)",
                                                                fill: "#363636"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime.jsx("path", {
                                                                id: "Path_3436",
                                                                "data-name": "Path 3436",
                                                                d: "M284.8,141.691h-6.5a1.528,1.528,0,0,1,0-3.055h6.5a1.528,1.528,0,0,1,0,3.055Z",
                                                                transform: "translate(-269.379 -105.218)",
                                                                fill: "#363636"
                                                            })
                                                        ]
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsxs)("text", {
                                                    id: "Remotive-Logistics-m",
                                                    transform: "translate(320 77)",
                                                    fill: "#363636",
                                                    fontSize: 16,
                                                    fontFamily: "Poppins",
                                                    fontWeight: 700,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime.jsx("tspan", {
                                                            x: 0,
                                                            y: 0,
                                                            children: "REMOTIVE"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime.jsx("tspan", {
                                                            y: 0,
                                                            fill: "#E63946",
                                                            children: "LOGISTICS"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(layouts_MobileMenu, {}),
                            /*#__PURE__*/ jsx_runtime.jsx("a", {
                                href: "#",
                                id: "res-cross",
                                onClick: ()=>setMobileToggle(false)
                            })
                        ]
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const layouts_Header = (Header);

;// CONCATENATED MODULE: ./src/layouts/Layout.js







const Layout = ({ children, headerExtaClass })=>{
    (0,external_react_.useEffect)(()=>{
        external_aos_default().init();
        external_react_nice_select_default()();
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(external_react_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(components_VideoPopup, {}),
            /*#__PURE__*/ jsx_runtime.jsx(layouts_Header, {
                extraClass: headerExtaClass
            }),
            children,
            /*#__PURE__*/ jsx_runtime.jsx(layouts_Footer, {})
        ]
    });
};
/* harmony default export */ const layouts_Layout = (Layout);


/***/ })

};
;