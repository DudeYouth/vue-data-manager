"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var objectName = 'vue-data-manager';

function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]';
}

var Store =
/*#__PURE__*/
function () {
  function Store(data) {
    _classCallCheck(this, Store);

    this.init(data);
  }

  _createClass(Store, [{
    key: "init",
    value: function init(data) {
      var _this = this;

      if (!isObject(data)) {
        throw new Error('Store class params is not object!');
      }

      var _loop = function _loop(key) {
        var item = data[key];
        var obData = {};

        if (typeof item.data === 'function') {
          obData = item.data();

          if (!isObject(obData)) {
            throw new Error(objectName + ' store ' + key + '.data is not return object!');
          }
        } else if (!isObject(item.data)) {
          throw new Error(objectName + ' store ' + key + '.data must is object or function!');
        }

        if (item.watch && !isObject(item.watch)) {
          throw new Error(objectName + ' store ' + key + '.watch must is object!');
        }

        if (item.computed && !isObject(item.computed)) {
          throw new Error(objectName + ' store ' + key + '.computed must is object!');
        }

        if (item.methods && !isObject(item.methods)) {
          throw new Error(objectName + ' store ' + key + '.methods must is object!');
        }

        for (var computedPropsKey in item.computed) {
          var computedMethod = item.computed[computedPropsKey];
          var result = computedMethod.call(obData);

          if (typeof result === 'function') {
            throw new Error(objectName + ' store ' + key + '.computed.' + computedPropsKey + ' return is not a legal value!');
          }

          obData[computedPropsKey] = result;
        }

        var state = _this[key] = _vue.default.observable(obData);

        state.$watch = _vue.default.prototype.$watch.bind(state);
        state.$nextTick = _vue.default.nextTick.bind(state);
        state.$delete = _vue.default.delete.bind(state);
        state._watchers = [];

        if (item.watch) {
          var _loop2 = function _loop2(watchKey) {
            _vue.default.prototype.$watch.call(state, watchKey, function () {
              var _item$watch$watchKey;

              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              (_item$watch$watchKey = item.watch[watchKey]).call.apply(_item$watch$watchKey, [state].concat(args));
            });
          };

          for (var watchKey in item.watch) {
            _loop2(watchKey);
          }
        }

        if (item.computed) {
          var _loop3 = function _loop3(_computedPropsKey) {
            var computedMethod = item.computed[_computedPropsKey];

            _vue.default.prototype.$watch.call(state, computedMethod.bind(state), function (value) {
              state[_computedPropsKey] = value;
            });
          };

          for (var _computedPropsKey in item.computed) {
            _loop3(_computedPropsKey);
          }
        }

        for (var methodName in item.methods) {
          var method = item.methods[methodName];

          if (typeof method !== 'function') {
            throw new Error(objectName + ' store ' + key + '.methods.' + methodName + ' is not funtion!');
          }

          state[methodName] = item.methods[methodName].bind(state);
        }
      };

      for (var key in data) {
        _loop(key);
      }
    }
  }]);

  return Store;
}();

exports.default = Store;