"use strict";
exports.id = 226;
exports.ids = [226];
exports.modules = {

/***/ 2226:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ sliderProps)
/* harmony export */ });
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3877);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swiper__WEBPACK_IMPORTED_MODULE_0__]);
swiper__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

swiper__WEBPACK_IMPORTED_MODULE_0__["default"].use([
    swiper__WEBPACK_IMPORTED_MODULE_0__.Mousewheel,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Pagination,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Navigation,
    swiper__WEBPACK_IMPORTED_MODULE_0__.EffectFade,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Autoplay,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Grid,
    swiper__WEBPACK_IMPORTED_MODULE_0__.EffectCreative,
    swiper__WEBPACK_IMPORTED_MODULE_0__.Virtual
]);
const sliderProps = {
    index1Testmoninal: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 2500
        },
        navigation: {
            nextEl: ".owl-next",
            prevEl: ".owl-prev"
        }
    },
    logodata: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 25
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            // when window width is >= 1024px
            1000: {
                slidesPerView: 5,
                spaceBetween: 30
            }
        }
    },
    commentSlide: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            600: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            // when window width is >= 1024px
            1000: {
                slidesPerView: 2,
                spaceBetween: 30
            }
        }
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;