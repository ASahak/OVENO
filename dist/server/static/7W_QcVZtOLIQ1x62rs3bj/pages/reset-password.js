module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("GfUn");


/***/ }),

/***/ "2Eek":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("ltjX");

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "4mXO":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("k1wZ");

/***/ }),

/***/ "BTiB":
/***/ (function(module, exports) {

module.exports = require("react-hook-form");

/***/ }),

/***/ "Cg2A":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("y6vh");

/***/ }),

/***/ "GfUn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lib_axiosEnv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("MX+e");
/* harmony import */ var lib_axiosEnv__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lib_axiosEnv__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("oL/c");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("oAEb");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_shared_UI__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("RdWu");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("Qi1R");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(utils__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("xnum");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("BTiB");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_hook_form__WEBPACK_IMPORTED_MODULE_9__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;











const ResetPassword = props => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_1__["useRouter"])();
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    register,
    handleSubmit,
    watch,
    errors,
    reset
  } = Object(react_hook_form__WEBPACK_IMPORTED_MODULE_9__["useForm"])({
    mode: 'onBlur'
  });

  const onSubmit = async dataForm => {
    setLoading(true);

    try {
      if (router.query.token) {
        const {
          data
        } = await lib_axiosEnv__WEBPACK_IMPORTED_MODULE_2___default.a.put('/api/reset-password', {
          resetLink: router.query.token,
          newPassword: dataForm.password
        });
        if (data.error) throw Error(data.error);
        react_toastify__WEBPACK_IMPORTED_MODULE_5__["toast"].dark(data.message, {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: false
        });
        setTimeout(() => {
          location.href = '/login';
        }, 3000);
      } else {
        const {
          data
        } = await lib_axiosEnv__WEBPACK_IMPORTED_MODULE_2___default.a.put('/api/forget-password', dataForm);
        if (data.error) throw Error(data.error);
        react_toastify__WEBPACK_IMPORTED_MODULE_5__["toast"].dark(data.message, {
          position: "top-right",
          autoClose: 3000,
          pauseOnHover: false
        });
      }
    } catch (err) {
      react_toastify__WEBPACK_IMPORTED_MODULE_5__["toast"].error(err.message, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false
      });
    } finally {
      setLoading(false);
    }

    reset();
  };

  const password = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({});
  password.current = watch("password", "");
  const Title = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    return !router.query.token ? 'Forget Password' : 'Reset Password';
  }, [router.query.token]);
  return __jsx(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Container"], null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_8___default.a, null, __jsx("title", null, Title())), __jsx(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, __jsx(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    sm: {
      size: 12
    },
    md: {
      size: 10,
      offset: 1
    },
    lg: {
      size: 8,
      offset: 2
    }
  }, __jsx("div", {
    className: "contact-main-wrap"
  }, __jsx("form", {
    onSubmit: handleSubmit(onSubmit)
  }, __jsx("h3", null, Title()), !router.query.token ? __jsx(_components_shared_UI__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Input, {
    type: "email",
    name: "email",
    refBind: register(utils__WEBPACK_IMPORTED_MODULE_7__["EMAIL_VALIDATOR"]),
    errors: errors.email && errors.email.message,
    fullWidth: true,
    placeholder: "Email ID",
    size: "md"
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(_components_shared_UI__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Input, {
    refBind: register(utils__WEBPACK_IMPORTED_MODULE_7__["PASSWORD_VALIDATOR"]),
    errors: errors.password && errors.password.message || errors.password && errors.password.type === 'containsDigit' && 'Use 1 ore more numbers' || errors.password && errors.password.type === 'containsUppercase' && 'Use upper and lower case characters',
    name: "password",
    type: "password",
    fullWidth: true,
    placeholder: "New Password",
    size: "md"
  }), __jsx(_components_shared_UI__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Input, {
    refBind: register({
      validate: value => value === password.current || "The passwords do not match"
    }),
    errors: errors.password_repeat && errors.password_repeat.message,
    name: "password_repeat",
    type: "password",
    fullWidth: true,
    placeholder: "Confirm Password",
    size: "md"
  })), __jsx(_components_shared_UI__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].Button, {
    icon: loading ? {
      dir: 'right',
      element: 'loading'
    } : {},
    type: "submit",
    text: router.query.token ? 'Reset' : 'Send',
    width: 100
  }))))));
};

ResetPassword.getInitialProps = async ctx => {
  const {
    req,
    res
  } = ctx;
  const token = req && req.headers.cookie;
  if (token) res.redirect('/');
  return {
    status: true
  };
};

const mapStateToProps = state => ({
  isUser: state.auth.user
});

const mapDispatchToProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(ResetPassword));

/***/ }),

/***/ "HJQg":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ }),

/***/ "Ib1X":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js
var get_own_property_symbols = __webpack_require__("4mXO");
var get_own_property_symbols_default = /*#__PURE__*/__webpack_require__.n(get_own_property_symbols);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__("pLtp");
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose.js

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};

  var sourceKeys = keys_default()(source);

  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutProperties.js


function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (get_own_property_symbols_default.a) {
    var sourceSymbolKeys = get_own_property_symbols_default()(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// CONCATENATED MODULE: ./components/Icons/User.js

var __jsx = external_react_default.a.createElement;
function User() {
  return __jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "-42 0 512 512.002",
    width: "512px",
    height: "512px"
  }, __jsx("g", null, __jsx("path", {
    d: "m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0",
    "data-original": "#000000",
    className: "active-path",
    "data-old_color": "#000000",
    fill: "#37415C"
  }), __jsx("path", {
    d: "m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0",
    "data-original": "#000000",
    className: "active-path",
    "data-old_color": "#000000",
    fill: "#37415C"
  })), " ");
}
// CONCATENATED MODULE: ./components/Icons/Exit.js

var Exit_jsx = external_react_default.a.createElement;
function Exit() {
  return Exit_jsx("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 511.989 511.989",
    style: {
      "enableBackground": 'new 0 0 511.989 511.989'
    },
    xmlSpace: "preserve"
  }, Exit_jsx("g", null, Exit_jsx("g", null, Exit_jsx("g", null, Exit_jsx("path", {
    d: "M110.933,221.782c-4.71,0-8.533,3.823-8.533,8.533v51.2c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-51.2\r C119.467,225.605,115.644,221.782,110.933,221.782z"
  }), Exit_jsx("path", {
    d: "M111.855,2.304L31.172,34.586C8.448,43,0,54.418,0,76.715v358.477c0,22.298,8.448,33.715,30.959,42.061l81.058,32.427\r c4.011,1.519,8.038,2.287,11.981,2.287c17.152,0,29.602-14.336,29.602-34.091V34.049C153.6,9.78,134.246-6.126,111.855,2.304z\r M136.533,477.876c0,10.18-5.035,17.024-12.535,17.024c-1.869,0-3.883-0.401-5.803-1.118L37.103,461.33\r c-16.102-5.965-20.036-11.102-20.036-26.138V76.715c0-15.036,3.934-20.164,20.241-26.206l80.725-32.29\r c2.082-0.785,4.087-1.186,5.956-1.186c7.501,0,12.544,6.835,12.544,17.016V477.876z"
  }), Exit_jsx("path", {
    d: "M178.133,51.115h120.533c14.114,0,25.6,11.486,25.6,25.6v128c0,4.71,3.814,8.533,8.533,8.533\r c4.719,0,8.533-3.823,8.533-8.533v-128c0-23.526-19.14-42.667-42.667-42.667H178.133c-4.71,0-8.533,3.823-8.533,8.533\r S173.423,51.115,178.133,51.115z"
  }), Exit_jsx("path", {
    d: "M332.8,298.582c-4.719,0-8.533,3.823-8.533,8.533v128c0,14.114-11.486,25.6-25.6,25.6H179.2\r c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h119.467c23.526,0,42.667-19.14,42.667-42.667v-128\r C341.333,302.405,337.519,298.582,332.8,298.582z"
  }), Exit_jsx("path", {
    d: "M511.343,252.655c-0.435-1.05-1.058-1.988-1.852-2.782l-85.325-85.333c-3.337-3.336-8.73-3.336-12.066,0\r c-3.337,3.337-3.337,8.73,0,12.066l70.767,70.775H196.267c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533\r h286.601L412.1,335.215c-3.337,3.337-3.337,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5\r l85.325-85.325c0.794-0.794,1.417-1.732,1.852-2.782C512.205,257.093,512.205,254.738,511.343,252.655z"
  })))), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null), Exit_jsx("g", null));
}
// CONCATENATED MODULE: ./components/Icons/Loading.js

var Loading_jsx = external_react_default.a.createElement;
function Loading() {
  return Loading_jsx("svg", {
    version: "1.1",
    id: "L9",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 100 100",
    enableBackground: "new 0 0 0 0",
    xmlSpace: "preserve"
  }, Loading_jsx("path", {
    fill: "#fff",
    d: "M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
  }, Loading_jsx("animateTransform", {
    attributeName: "transform",
    attributeType: "XML",
    type: "rotate",
    dur: "1s",
    from: "0 50 50",
    to: "360 50 50",
    repeatCount: "indefinite"
  })));
}
// CONCATENATED MODULE: ./components/Icons/Error.js

var Error_jsx = external_react_default.a.createElement;
function Error() {
  return Error_jsx("svg", {
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 455.111 455.111",
    style: {
      enableBackground: 'new 0 0 455.111 455.111'
    },
    xmlSpace: "preserve"
  }, Error_jsx("circle", {
    style: {
      fill: '#E24C4B'
    },
    cx: "227.556",
    cy: "227.556",
    r: "227.556"
  }), Error_jsx("path", {
    style: {
      fill: '#D1403F'
    },
    d: "M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333\r c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222\r C422.4,91.022,455.111,155.022,455.111,227.556z"
  }), Error_jsx("path", {
    style: {
      fill: '#FFFFFF'
    },
    d: "M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533\r c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533\r c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533\r c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533\r C339.911,308.622,339.911,322.844,331.378,331.378z"
  }), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null), Error_jsx("g", null));
}
// CONCATENATED MODULE: ./components/Icons/Success.js

var Success_jsx = external_react_default.a.createElement;
function Success() {
  return Success_jsx("svg", {
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 367.805 367.805",
    style: {
      enableBackground: 'new 0 0 367.805 367.805'
    },
    xmlSpace: "preserve"
  }, Success_jsx("g", null, Success_jsx("path", {
    style: {
      fill: '#3BB54A'
    },
    d: "M183.903,0.001c101.566,0,183.902,82.336,183.902,183.902s-82.336,183.902-183.902,183.902\r S0.001,285.469,0.001,183.903l0,0C-0.288,82.625,81.579,0.29,182.856,0.001C183.205,0,183.554,0,183.903,0.001z"
  }), Success_jsx("polygon", {
    style: {
      fill: '#D4E1F4'
    },
    points: "285.78,133.225 155.168,263.837 82.025,191.217 111.805,161.96 155.168,204.801\r 256.001,103.968 \t"
  })), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null), Success_jsx("g", null));
}
// CONCATENATED MODULE: ./components/Icons/Logout.js

var Logout_jsx = external_react_default.a.createElement;
function Logout() {
  return Logout_jsx("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: {
      enableBackground: 'new 0 0 512 512'
    },
    xmlSpace: "preserve"
  }, Logout_jsx("g", null, Logout_jsx("g", null, Logout_jsx("g", null, Logout_jsx("path", {
    d: "M330.667,384c-5.896,0-10.667,4.771-10.667,10.667v74.667c0,11.76-9.573,21.333-21.333,21.333h-256\r c-11.76,0-21.333-9.573-21.333-21.333V42.667c0-11.76,9.573-21.333,21.333-21.333h256c11.76,0,21.333,9.573,21.333,21.333v74.667\r c0,5.896,4.771,10.667,10.667,10.667c5.896,0,10.667-4.771,10.667-10.667V42.667C341.333,19.135,322.198,0,298.667,0h-256\r C19.135,0,0,19.135,0,42.667v426.667C0,492.865,19.135,512,42.667,512h256c23.531,0,42.667-19.135,42.667-42.667v-74.667\r C341.333,388.771,336.563,384,330.667,384z"
  }), Logout_jsx("path", {
    d: "M508.542,248.135l-128-117.333c-4.365-3.979-11.083-3.677-15.073,0.656c-3.979,4.344-3.688,11.094,0.656,15.073\r l107.79,98.802H138.667c-5.896,0-10.667,4.771-10.667,10.667s4.771,10.667,10.667,10.667h335.249l-107.79,98.802\r c-4.344,3.979-4.635,10.729-0.656,15.073c2.104,2.292,4.979,3.458,7.865,3.458c2.573,0,5.156-0.927,7.208-2.802l128-117.333\r C510.75,261.844,512,258.99,512,256S510.75,250.156,508.542,248.135z"
  })))), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null), Logout_jsx("g", null));
}
// CONCATENATED MODULE: ./components/Icons/Modal.js

var Modal_jsx = external_react_default.a.createElement;
function Modal() {
  return Modal_jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "25",
    height: "25",
    viewBox: "0 0 16 16"
  }, Modal_jsx("path", {
    fill: "#444444",
    d: "M0 4v11h16v-14h-16v3zM14 2h1v1h-1v-1zM1 4h14v10h-14v-10z"
  }), Modal_jsx("path", {
    fill: "#444444",
    d: "M3 6h2v1h-2v-1z"
  }), Modal_jsx("path", {
    fill: "#444444",
    d: "M6 6h7v1h-7v-1z"
  }), Modal_jsx("path", {
    fill: "#444444",
    d: "M3 8h2v1h-2v-1z"
  }), Modal_jsx("path", {
    fill: "#444444",
    d: "M6 8h7v1h-7v-1z"
  }), Modal_jsx("path", {
    fill: "#444444",
    d: "M3 10h2v1h-2v-1z"
  }), Modal_jsx("path", {
    fill: "#444444",
    d: "M6 10h7v1h-7v-1z"
  }));
}
// CONCATENATED MODULE: ./components/Icons/Unlocked.js

var Unlocked_jsx = external_react_default.a.createElement;
function Unlocked() {
  return Unlocked_jsx("svg", {
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: {
      enableBackground: 'new 0 0 512 512'
    },
    xmlSpace: "preserve"
  }, Unlocked_jsx("title", null, "Decrypt"), Unlocked_jsx("polygon", {
    style: {
      fill: '#FFC813'
    },
    points: "512,236.879 343.489,236.879 323.473,359.348 343.489,512 512,512 "
  }), Unlocked_jsx("path", {
    style: {
      fill: '#F5F5F6'
    },
    d: "M127.077,0L127.077,0C56.894,0,0,56.894,0,127.077V186h47.803v-58.923\r c0-43.711,35.562-79.273,79.274-79.273s79.274,35.562,79.274,79.273v139.826h47.803V127.077C254.154,56.894,197.26,0,127.077,0z"
  }), Unlocked_jsx("rect", {
    x: "174.98",
    y: "236.88",
    style: {
      fill: '#FFDF78'
    },
    width: "168.51",
    height: "275.12"
  }), Unlocked_jsx("path", {
    style: {
      fill: '#FFE6A1'
    },
    d: "M343.489,299.628L323.473,351l20.016,98.25h24.674v-67.651c12.067-8.004,20.027-21.706,20.027-37.271\r C388.19,319.641,368.177,299.628,343.489,299.628z"
  }), Unlocked_jsx("path", {
    style: {
      fill: '#FFFFFF'
    },
    d: "M298.789,344.329c0,15.565,7.96,29.266,20.027,37.271v67.651h24.673V299.628\r C318.802,299.628,298.789,319.641,298.789,344.329z"
  }), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null), Unlocked_jsx("g", null));
}
// CONCATENATED MODULE: ./components/Icons/Locked.js

var Locked_jsx = external_react_default.a.createElement;
function Locked() {
  return Locked_jsx("svg", {
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512 512",
    style: {
      enableBackground: "new 0 0 512 512"
    },
    xmlSpace: "preserve"
  }, Locked_jsx("title", null, "Encrypt"), Locked_jsx("path", {
    style: {
      fill: '#B2B2E0'
    },
    d: "M358.61,102.61C358.61,46.03,312.579,0,256,0S153.39,46.03,153.39,102.61v111.14h51.794V101.901\r c0-28.02,22.795-50.816,50.816-50.816s50.816,22.796,50.816,50.816V213.75h51.794L358.61,102.61L358.61,102.61z"
  }), Locked_jsx("path", {
    style: {
      fill: '#F2EBFA'
    },
    d: "M256,0c-56.579,0-102.61,46.03-102.61,102.61v111.14h51.794V101.901\r c0-28.02,22.795-50.816,50.816-50.816V0z"
  }), Locked_jsx("path", {
    style: {
      fill: '#FCC200'
    },
    d: "M349.735,512h-187.47c-34.64,0-62.721-28.081-62.721-62.721V234.751\r c0-16.566,13.428-29.994,29.994-29.994h252.926c16.565,0,29.994,13.428,29.994,29.994v214.528\r C412.456,483.919,384.375,512,349.735,512z"
  }), Locked_jsx("path", {
    style: {
      fill: '#FFDE47'
    },
    d: "M256,204.758H129.537c-16.566,0-29.994,13.428-29.994,29.994v214.528\r c0,34.64,28.081,62.721,62.721,62.721h93.735L256,204.758L256,204.758z"
  }), Locked_jsx("path", {
    style: {
      fill: '#1D1D2E'
    },
    d: "M286.41,330.768c0-16.767-13.642-30.41-30.41-30.41s-30.41,13.642-30.41,30.41\r c0,11.316,6.218,21.201,15.413,26.437v42.246c0,8.282,6.715,14.997,14.997,14.997c8.282,0,14.997-6.715,14.997-14.997v-42.247\r C280.191,351.969,286.41,342.084,286.41,330.768z"
  }), Locked_jsx("path", {
    style: {
      fill: '#3F4052'
    },
    d: "M256,300.359c-16.767,0-30.41,13.642-30.41,30.41c0,11.316,6.218,21.201,15.413,26.437v42.246\r c0,8.282,6.715,14.997,14.997,14.997V300.359z"
  }), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null), Locked_jsx("g", null));
}
// CONCATENATED MODULE: ./components/Icons/Plus.js

var Plus_jsx = external_react_default.a.createElement;
function Plus() {
  return Plus_jsx("svg", {
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 496 496",
    style: {
      enableBackground: 'new 0 0 496 496'
    },
    xmlSpace: "preserve"
  }, Plus_jsx("g", null, Plus_jsx("g", null, Plus_jsx("g", null, Plus_jsx("path", {
    d: "M248,0C111.033,0,0,111.033,0,248c0.154,136.903,111.097,247.846,248,248c136.967,0,248-111.033,248-248S384.967,0,248,0\r z M248,480C119.87,480,16,376.13,16,248C16.146,119.93,119.93,16.146,248,16c128.13,0,232,103.87,232,232S376.13,480,248,480z"
  }), Plus_jsx("path", {
    d: "M400,240H256V96c0-4.418-3.582-8-8-8s-8,3.582-8,8v144H96c-4.418,0-8,3.582-8,8s3.582,8,8,8h144v144c0,4.418,3.582,8,8,8\r s8-3.582,8-8V256h144c4.418,0,8-3.582,8-8S404.418,240,400,240z"
  })))), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null), Plus_jsx("g", null));
}
// CONCATENATED MODULE: ./components/Icons/Pencil.js

var Pencil_jsx = external_react_default.a.createElement;
function Pencil() {
  return Pencil_jsx("svg", {
    height: "512",
    viewBox: "0 0 128 128",
    width: "512",
    xmlns: "http://www.w3.org/2000/svg"
  }, Pencil_jsx("path", {
    d: "m122.922 23.474-18.4-18.4a1.75 1.75 0 0 0 -2.474 0l-85 85a1.649 1.649 0 0 0 -.119.146c-.026.032-.054.061-.078.095a1.746 1.746 0 0 0 -.191.349l-6.919 17.563v.006l-5.054 12.809a1.751 1.751 0 0 0 2.271 2.271l12.809-5.052 17.559-6.925a1.773 1.773 0 0 0 .349-.191c.034-.024.063-.052.1-.078a1.794 1.794 0 0 0 .145-.119l61.73-61.728 23.267-23.268a1.75 1.75 0 0 0 .005-2.478zm-24.507 22.032-15.921-15.921 4.982-4.985 15.92 15.92zm-61.726 61.726-3.5-3.5 59.248-59.254 3.5 3.5zm-9.944-9.944 59.255-59.251 3.963 3.963-59.251 59.255zm-5.977-5.977 59.251-59.251 3.5 3.5-59.248 59.254zm-8.757 20.7 3.977 3.977-6.567 2.59zm7.526 2.577-6.126-6.126 5.532-14.028 4.088 4.088 6.436 6.436 4.088 4.088zm86.334-76.538-15.921-15.921 13.339-13.338 15.921 15.92z"
  }));
}
// CONCATENATED MODULE: ./components/Icons/Close.js

var Close_jsx = external_react_default.a.createElement;
function Close() {
  return Close_jsx("svg", {
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 512.001 512.001",
    style: {
      "enableBackground": "new 0 0 512.001 512.001"
    },
    xmlSpace: "preserve"
  }, Close_jsx("g", null, Close_jsx("g", null, Close_jsx("path", {
    d: "M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717\r L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859\r c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287\r l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285\r L284.286,256.002z"
  }))), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null), Close_jsx("g", null));
}
// CONCATENATED MODULE: ./components/Icons/Add.js

var Add_jsx = external_react_default.a.createElement;
function Add() {
  return Add_jsx("svg", {
    version: "1.1",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 496 496",
    style: {
      "enableBackground": "new 0 0 496 496"
    },
    xmlSpace: "preserve"
  }, Add_jsx("g", null, Add_jsx("g", null, Add_jsx("g", null, Add_jsx("path", {
    d: "M248,0C111.033,0,0,111.033,0,248c0.154,136.903,111.097,247.846,248,248c136.967,0,248-111.033,248-248S384.967,0,248,0\r z M248,480C119.87,480,16,376.13,16,248C16.146,119.93,119.93,16.146,248,16c128.13,0,232,103.87,232,232S376.13,480,248,480z"
  }), Add_jsx("path", {
    d: "M400,240H256V96c0-4.418-3.582-8-8-8s-8,3.582-8,8v144H96c-4.418,0-8,3.582-8,8s3.582,8,8,8h144v144c0,4.418,3.582,8,8,8\r s8-3.582,8-8V256h144c4.418,0,8-3.582,8-8S404.418,240,400,240z"
  })))), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null), Add_jsx("g", null));
}
// CONCATENATED MODULE: ./components/Icons/Upload.js
var Upload_jsx = external_react_default.a.createElement;

function Upload() {
  return Upload_jsx("svg", {
    width: "20",
    height: "17",
    viewBox: "0 0 20 17"
  }, Upload_jsx("path", {
    d: "M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
  }));
}
// CONCATENATED MODULE: ./components/Icons/Delete.js

var Delete_jsx = external_react_default.a.createElement;
function Delete() {
  return Delete_jsx("svg", {
    height: "427pt",
    viewBox: "-40 0 427 427.00131",
    width: "427pt",
    xmlns: "http://www.w3.org/2000/svg"
  }, Delete_jsx("path", {
    d: "m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
  }), Delete_jsx("path", {
    d: "m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
  }), Delete_jsx("path", {
    d: "m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"
  }), Delete_jsx("path", {
    d: "m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"
  }));
}
// CONCATENATED MODULE: ./components/Icons/index.js
















// CONCATENATED MODULE: ./components/Icons/icon.js

var icon_jsx = external_react_default.a.createElement;


const iconTypes = {
  pencil: Pencil,
  plus: Plus,
  exit: Exit,
  user: User,
  loading: Loading,
  error: Error,
  success: Success,
  logout: Logout,
  modal: Modal,
  unlocked: Unlocked,
  locked: Locked,
  close: Close,
  add: Add,
  upload: Upload,
  delete: Delete
};

const IconComponent = (_ref) => {
  let {
    name
  } = _ref,
      props = _objectWithoutProperties(_ref, ["name"]);

  let Icon = iconTypes[name];
  return icon_jsx(Icon, props);
};

/* harmony default export */ var icon = __webpack_exports__["a"] = (IconComponent);

/***/ }),

/***/ "Jo+v":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Z6Kq");

/***/ }),

/***/ "MX+e":
/***/ (function(module, exports, __webpack_require__) {

var _Date$now = __webpack_require__("Cg2A");

const axios = __webpack_require__("zr5I");

const {
  getToken,
  removeCookieByKey
} = __webpack_require__("SMlj");

const jwtDecode = __webpack_require__("tlnx");

const axiosInstance = axios.create({
  baseURL:  false ? undefined : "https://oveno.vercel.app"
});
axiosInstance.interceptors.request.use(req => {
  const token = getToken();

  if (token && jwtDecode(token).exp < _Date$now() / 1000) {
    removeCookieByKey('token');
    location.href = '/';
  }

  return req;
});
module.exports = axiosInstance;

/***/ }),

/***/ "MZZ8":
/***/ (function(module, exports, __webpack_require__) {

const {
  EMAIL_PATTERN,
  FULL_NAME_PATTERN,
  DIGIT_PATTERN,
  UPPERCASE_LOWERCASE_PATTERN,
  ONLY_ENGLISH_LETTERS,
  ONLY_ENGLISH_LETTERS_WITH_DIGIT,
  SPACE_PATTER
} = __webpack_require__("wyBh");

module.exports = {
  ONLY_DIGITS: {
    required: 'Please complete this mandatory field',
    pattern: {
      value: DIGIT_PATTERN,
      message: 'Please input only digits'
    }
  },
  SELECT_OPTION: {
    required: 'Please complete this mandatory field',
    validate: {
      selectValue: val => val !== 'Select a category'
    }
  },
  PRODUCT_NAME: {
    required: 'Please complete this mandatory field',
    validate: {
      containChars: val => SPACE_PATTER(val)
    }
  },
  EMAIL_VALIDATOR: {
    required: 'Please complete this mandatory field',
    pattern: {
      value: EMAIL_PATTERN,
      message: 'Please write your email address in format: yourname@example.com'
    }
  },
  ONLY_ENGLISH_LETTERS_PATTERN: {
    required: 'Please complete this mandatory field',
    pattern: {
      value: ONLY_ENGLISH_LETTERS,
      message: 'Please input only english letters'
    }
  },
  ONLY_ENGLISH_LETTERS_WITH_DIGIT_PATTERN: {
    required: 'Please complete this mandatory field',
    pattern: {
      value: ONLY_ENGLISH_LETTERS_WITH_DIGIT,
      message: 'Please input only english letters'
    }
  },
  FULL_NAME_VALIDATOR: {
    required: 'Please complete this mandatory field',
    minLength: {
      value: 2,
      message: 'The minLength must be more then 2'
    },
    maxLength: {
      value: 255,
      message: 'The maxLength must be les then 255'
    },
    pattern: {
      value: FULL_NAME_PATTERN,
      message: 'Please write your name in format: John Doe'
    }
  },
  PASSWORD_VALIDATOR: {
    required: 'Please complete this mandatory field',
    minLength: {
      value: 8,
      message: 'Use at least 8 characters'
    },
    validate: {
      containsDigit: value => DIGIT_PATTERN.test(value),
      containsUppercase: value => UPPERCASE_LOWERCASE_PATTERN.test(value)
    }
  }
};

/***/ }),

/***/ "QTVn":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptors");

/***/ }),

/***/ "Qi1R":
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__("hfKm");

var _Object$defineProperties = __webpack_require__("2Eek");

var _Object$getOwnPropertyDescriptors = __webpack_require__("XoMD");

var _Object$getOwnPropertyDescriptor = __webpack_require__("Jo+v");

var _Object$getOwnPropertySymbols = __webpack_require__("4mXO");

var _Object$keys = __webpack_require__("pLtp");

var _defineProperty = __webpack_require__("xHqa");

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

module.exports = _objectSpread({}, __webpack_require__("wyBh"), {}, __webpack_require__("MZZ8"));

/***/ }),

/***/ "RdWu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("hfKm");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js
var define_properties = __webpack_require__("2Eek");
var define_properties_default = /*#__PURE__*/__webpack_require__.n(define_properties);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js
var get_own_property_descriptors = __webpack_require__("XoMD");
var get_own_property_descriptors_default = /*#__PURE__*/__webpack_require__.n(get_own_property_descriptors);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js
var get_own_property_descriptor = __webpack_require__("Jo+v");
var get_own_property_descriptor_default = /*#__PURE__*/__webpack_require__.n(get_own_property_descriptor);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js
var get_own_property_symbols = __webpack_require__("4mXO");
var get_own_property_symbols_default = /*#__PURE__*/__webpack_require__.n(get_own_property_symbols);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var object_keys = __webpack_require__("pLtp");
var keys_default = /*#__PURE__*/__webpack_require__.n(object_keys);

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("vYYK");

// EXTERNAL MODULE: external "styled-jsx/style"
var style_ = __webpack_require__("HJQg");
var style_default = /*#__PURE__*/__webpack_require__.n(style_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// CONCATENATED MODULE: ./components/shared/UI/Input.jsx








var __jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = keys_default()(object); if (get_own_property_symbols_default.a) { var symbols = get_own_property_symbols_default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return get_own_property_descriptor_default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (get_own_property_descriptors_default.a) { define_properties_default()(target, get_own_property_descriptors_default()(source)); } else { ownKeys(source).forEach(function (key) { define_property_default()(target, key, get_own_property_descriptor_default()(source, key)); }); } } return target; }



const Input = props => {
  const parentRef = external_react_default.a.createRef();

  const styleDiv = _objectSpread({}, props.label && {
    display: props.fullWidth ? 'flex' : 'inline-flex',
    flexDirection: 'column'
  }, {}, !props.label && {
    display: props.fullWidth ? 'block' : 'inline-block'
  });

  Object(external_react_["useEffect"])(() => {
    if (parentRef.current && !!props.value) {
      parentRef.current.querySelector('input').value = props.value;
    }
  }, [props.value]);
  Object(external_react_["useEffect"])(() => {
    if (parentRef.current) {
      if (props.attr.length) {
        props.attr.map(attr => {
          parentRef.current.querySelector('input').setAttribute(attr.name, attr.value);
        });
      }
    }
  }, [props.attr]);
  Object(external_react_["useEffect"])(() => {
    if (parentRef.current) {
      if (props.attr.length) {
        props.attr.map(attr => {
          parentRef.current.querySelector('input').setAttribute(attr.name, attr.value);
        });
      }

      for (let event = 0; event < props.events.length; event++) {
        parentRef.current.querySelector('input').addEventListener(props.events[event], props['on' + props.events[event].replace(props.events[event].charAt(0), props.events[event].charAt(0).toUpperCase())]);
      }
    }

    return () => {
      if (parentRef.current) {
        for (let event = 0; event < props.events.length; event++) {
          parentRef.current.querySelector('input').removeEventListener(props.events[event], props['on' + props.events[event].replace(props.events[event].charAt(0), props.events[event].charAt(0).toUpperCase())]);
        }
      }
    };
  }, []);
  return __jsx("div", {
    style: styleDiv,
    ref: parentRef,
    className: "jsx-2084675163" + " " + `input-wrap ${props.errors ? 'error-field' : ''}`
  }, props.label ? __jsx("label", {
    className: "jsx-2084675163"
  }, props.label) : null, __jsx("input", {
    name: props.name,
    ref: props.refBind,
    type: props.type,
    id: props.id,
    disabled: props.disabled,
    placeholder: props.placeholder || '',
    className: "jsx-2084675163" + " " + ('input-' + props.size || false)
  }), props.errors && __jsx("span", {
    className: "jsx-2084675163" + " " + "error-line"
  }, props.errors), __jsx(style_default.a, {
    id: "2084675163"
  }, [".input-wrap.jsx-2084675163 label.jsx-2084675163{font-weight:600;margin-bottom:5px;color:#37415c;}", ".input-wrap.jsx-2084675163{position:relative;}", ".input-wrap.jsx-2084675163 input.jsx-2084675163{width:100%;background:#E5E6E8;margin-bottom:20px;-webkit-transition:all 400ms cubic-bezier(0.175,0.885,0.32,1.275);transition:all 400ms cubic-bezier(0.175,0.885,0.32,1.275);position:relative;z-index:2;}", ".input-wrap.jsx-2084675163 input.jsx-2084675163:disabled{background-color:#e7e7e7;}", ".input-wrap.jsx-2084675163 .error-line.jsx-2084675163{position:absolute;left:0;bottom:0;display:inline-block;margin-bottom:10px;-webkit-transition:all 400ms cubic-bezier(0.175,0.885,0.32,1.275);transition:all 400ms cubic-bezier(0.175,0.885,0.32,1.275);font-size:14px;color:red;}", ".input-wrap.jsx-2084675163 input[type=color].jsx-2084675163{height:46px;padding:6px 15px 6px 85%!important;}", ".input-wrap.jsx-2084675163 input.input-md.jsx-2084675163{padding:15px;border:none;}", ".input-wrap.jsx-2084675163 input.input-sm.jsx-2084675163{padding:10px;border:none;}", ".error-field.jsx-2084675163 input.jsx-2084675163{margin-bottom:30px;}"]));
};

Input.defaultProps = {
  size: 'md',
  type: 'text',
  fullWidth: false,
  events: [],
  attr: []
};
/* harmony default export */ var UI_Input = (Input);
// EXTERNAL MODULE: ./components/Icons/icon.js + 18 modules
var icon = __webpack_require__("Ib1X");

// CONCATENATED MODULE: ./components/shared/UI/Button.jsx








var Button_jsx = external_react_default.a.createElement;

function Button_ownKeys(object, enumerableOnly) { var keys = keys_default()(object); if (get_own_property_symbols_default.a) { var symbols = get_own_property_symbols_default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return get_own_property_descriptor_default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Button_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Button_ownKeys(source, true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (get_own_property_descriptors_default.a) { define_properties_default()(target, get_own_property_descriptors_default()(source)); } else { Button_ownKeys(source).forEach(function (key) { define_property_default()(target, key, get_own_property_descriptor_default()(source, key)); }); } } return target; }




const Button = props => {
  const input = Object(external_react_["useRef"])();
  Object(external_react_["useEffect"])(() => {
    if (props.attr && props.attr.length && input.current) {
      props.attr.map(attr => {
        input.current.setAttribute(keys_default()(attr)[0], attr[keys_default()(attr)[0]]);
      });
    }
  }, [props.attr]);

  const width = Button_objectSpread({
    background: props.background,
    border: props.border,
    color: props.color,
    fontSize: props.fontSize + 'px',
    margin: props.margin[0] + ' ' + props.margin[1] + ' ' + props.margin[2] + ' ' + props.margin[3]
  }, !props.fullWidth && props.width && {
    width: props.width + 'px'
  }, {}, props.fullWidth && {
    width: '100%',
    display: 'flex'
  });

  return Button_jsx("button", {
    ref: input,
    style: width,
    onClick: props.onClick,
    disabled: props.disabled,
    className: "jsx-1958915024" + " " + `btn-global btn-${props.size} ${props.hover}`
  }, props.icon.dir && props.icon.dir === 'left' ? Button_jsx(icon["a" /* default */], {
    name: props.icon.element
  }) : null, props.text, props.icon.dir && props.icon.dir === 'right' ? Button_jsx(icon["a" /* default */], {
    name: props.icon.element
  }) : null, Button_jsx(style_default.a, {
    id: "1958915024"
  }, ["button.btn-global svg{height:30px;fill:#fff;margin:0 10px;}", "button.btn-global{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;outline:none;text-transform:uppercase;color:#ebe6e6;border:none;border-radius:8px;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin:auto;padding:0px 15px;height:30px;}", "button.btn-md{padding:0px 15px;height:40px;}", "button.btn-sm{padding:0px 10px;height:30px;}", ".hover-from-transparent:hover{background-color:#37415c !important;color:#fff !important;}", "button:disabled{pointer-events:none;opacity:0.6;}"]));
};

Button.defaultProps = {
  size: 'md',
  icon: {},
  type: 'button',
  fullWidth: false,
  background: '#37415c',
  fontSize: 13,
  border: '1px solid #37415c',
  margin: 'auto',
  disabled: false
};
/* harmony default export */ var UI_Button = (Button);
// CONCATENATED MODULE: ./components/shared/UI/Select.jsx

var Select_jsx = external_react_default.a.createElement;


class Select_Select extends external_react_default.a.Component {
  constructor(props) {
    super(props);
    this.selectChange = this.selectChange.bind(this);
  }

  selectChange(event) {
    this.props.selectEncrypt(event.target.value);
  }

  render() {
    const option = this.props.dataOptions.map(option => Select_jsx("option", {
      key: option.value,
      value: option.value
    }, option.name));
    return Select_jsx(external_react_default.a.Fragment, null, Select_jsx("select", {
      defaultValue: 'rsa',
      required: true,
      style: this.props.style,
      onChange: this.selectChange,
      className: "jsx-3665154029"
    }, option), Select_jsx(style_default.a, {
      id: "3665154029"
    }, ["select.jsx-3665154029{cursor:pointer;outline:none;}", "option[value=\"default\"][disabled].jsx-3665154029{display:none;}", "option.jsx-3665154029{color:black;}"]));
  }

}

Select_Select.defaultProps = {
  dataOptions: []
};
/* harmony default export */ var UI_Select = (Select_Select);
// CONCATENATED MODULE: ./components/shared/UI/index.js



/* harmony default export */ var UI = __webpack_exports__["a"] = ({
  Input: UI_Input,
  Button: UI_Button,
  Select: UI_Select
});

/***/ }),

/***/ "SMlj":
/***/ (function(module, exports, __webpack_require__) {

var _Promise = __webpack_require__("eVuF");

const cookie = __webpack_require__("vmXh");

const axios = __webpack_require__("zr5I");

const jwtDecode = __webpack_require__("tlnx");

module.exports = {
  setToken: token => {
    cookie.set('token', token, {
      expires: 1
      /*1 day*/

    });
  },
  getToken: () => {
    return cookie.get('token');
  },
  getCookieByKey: key => {
    return cookie.get(key);
  },
  removeCookieByKey: key => {
    cookie.remove(key);
  },
  isLoggedUser: () => {
    return new _Promise(async (resolve, reject) => {
      const token = module.exports.getToken();

      try {
        if (token) {
          const user = await axios.get('/api/user/' + jwtDecode(token).userId);

          if (user) {
            if (user.data.error) reject(user.data.error);
            resolve(user);
          }
        } else reject("There isn't logged user");
      } catch (err) {
        reject(err);
      }
    });
  }
};

/***/ }),

/***/ "TUA0":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "XoMD":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("QTVn");

/***/ }),

/***/ "Z6Kq":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "aC71":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/promise");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "eVuF":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("aC71");

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hfKm":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("TUA0");

/***/ }),

/***/ "k1wZ":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "ltjX":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-properties");

/***/ }),

/***/ "oAEb":
/***/ (function(module, exports) {

module.exports = require("react-toastify");

/***/ }),

/***/ "oL/c":
/***/ (function(module, exports) {

module.exports = require("reactstrap");

/***/ }),

/***/ "pLtp":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("qJj/");

/***/ }),

/***/ "qJj/":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/keys");

/***/ }),

/***/ "tlnx":
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),

/***/ "vYYK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hfKm");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "vmXh":
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "wyBh":
/***/ (function(module, exports) {

module.exports = {
  EMAIL_PATTERN: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i,
  FULL_NAME_PATTERN: /^[\p{L}\s]*$/iu,
  UPPERCASE_LOWERCASE_PATTERN: /(?=.*[\p{Lu}])(?=.*[\p{Ll}])[\p{L}\s]+/u,
  DIGIT_PATTERN: /\d+/i,
  AT_LEAST_ONE_DIGIT_AND_UPPER: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/u,
  NOT_FOUND_CODE: 404,
  NOT_EXISTS: resource => `${resource} doesn't exist!`,
  ROLE_TYPES: {
    ADMIN: 'admin',
    USER: 'user'
  },
  ONLY_ENGLISH_LETTERS: /^[a-zA-Z]+$/i,
  ONLY_ENGLISH_LETTERS_WITH_DIGIT: /^(?=.*[A-Za-z])[A-Za-z0-9 _]*$/i,
  SPACE_PATTER: str => !!str.replace(/\s/g, '').length,
  EMAIL_VALIDATION: email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email),
  RANGE_SLIDER: [0, 10000],
  EMAIL_SUBJECT: 'Message from OVENO!'
};

/***/ }),

/***/ "xHqa":
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__("hfKm");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "y6vh":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/date/now");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });