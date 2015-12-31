'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _reactClass = require('react-class');

var _reactClass2 = _interopRequireDefault(_reactClass);

var _join = require('./join');

var _join2 = _interopRequireDefault(_join);

var _getPrefix = require('./getPrefix');

var _getPrefix2 = _interopRequireDefault(_getPrefix);

var _flex2className = require('./flex2className');

var _flex2className2 = _interopRequireDefault(_flex2className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var props2className = function props2className(props) {
  var prefix = (0, _getPrefix2.default)(props) + '-item';

  var className = (0, _join2.default)(props.className, prefix, (0, _flex2className2.default)(props, prefix));

  return className;
};

var FlexItem = (function (_Component) {
  _inherits(FlexItem, _Component);

  function FlexItem() {
    _classCallCheck(this, FlexItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FlexItem).apply(this, arguments));
  }

  _createClass(FlexItem, [{
    key: 'render',
    value: function render() {

      var props = this.props;
      var className = props2className(props);

      var allProps = (0, _objectAssign2.default)({}, props, {
        className: className
      });

      if (props.factory) {
        return props.factory(allProps);
      }

      return _react2.default.createElement('div', _extends({}, allProps, {
        __source: {
          fileName: '../../../../../src/Item.js',
          lineNumber: 37
        }
      }));
    }
  }]);

  return FlexItem;
})(_reactClass2.default);

FlexItem.defaultProps = {
  flex: 1
};

FlexItem.propTypes = {
  flex: _react.PropTypes.any,
  flexGrow: _react.PropTypes.any,
  flexShrink: _react.PropTypes.any,
  flexBasis: _react.PropTypes.any
};

exports.default = FlexItem;