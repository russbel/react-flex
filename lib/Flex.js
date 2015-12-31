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
  var prefix = (0, _getPrefix2.default)(props);

  var column = !!props.column;
  var row = !column && !!props.row;
  var reverse = props.reverse ? '-reverse' : '';

  var className = (0, _join2.default)(props.className, prefix, (0, _flex2className2.default)(props, prefix), props.inline ? prefix + '-inline' : null, props.alignItems ? prefix + '-align-items-' + props.alignItems : null, props.alignContent ? prefix + '-align-content-' + props.alignContent : null, props.justifyContent ? prefix + '-justify-content-' + props.justifyContent : null, props.wrap ? prefix + '-wrap' : null, row ? prefix + '-row' + reverse : null, column ? prefix + '-column' + reverse : null);

  return className;
};

var Flex = (function (_Component) {
  _inherits(Flex, _Component);

  function Flex() {
    _classCallCheck(this, Flex);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Flex).apply(this, arguments));
  }

  _createClass(Flex, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var Factory = props.factory || _react2.default.createFactory('div');
      var className = props2className(props);

      var allProps = (0, _objectAssign2.default)({}, props, {
        className: className
      });

      if (props.factory) {
        return props.factory(allProps);
      }

      return _react2.default.createElement('div', _extends({}, allProps, {
        __source: {
          fileName: '../../../../../src/Flex.js',
          lineNumber: 69
        }
      }));
    }
  }]);

  return Flex;
})(_reactClass2.default);

Flex.defaultProps = {
  row: true,
  wrap: true
};

Flex.propTypes = {

  flex: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool]),

  inline: _react.PropTypes.bool,

  row: _react.PropTypes.bool,
  column: _react.PropTypes.bool,
  wrap: _react.PropTypes.bool,

  alignItems: _react.PropTypes.string,
  alignContent: _react.PropTypes.string,
  justifyContent: _react.PropTypes.string
};

exports.default = Flex;