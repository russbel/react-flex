'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _join = require('./join');

var _join2 = _interopRequireDefault(_join);

var _getPrefix = require('./getPrefix');

var _getPrefix2 = _interopRequireDefault(_getPrefix);

var _flex2className = require('./flex2className');

var _flex2className2 = _interopRequireDefault(_flex2className);

var props2className = function props2className(props) {
  var prefix = (0, _getPrefix2['default'])(props) + '-item';

  var className = (0, _join2['default'])(props.className, prefix, (0, _flex2className2['default'])(props, prefix));

  return className;
};

var FlexItem = function FlexItem(props) {

  var className = props2className(props);

  var allProps = (0, _objectAssign2['default'])({}, props, {
    className: className
  });

  if (props.factory) {
    return props.factory(allProps);
  }

  return _react2['default'].createElement('div', allProps);
};

FlexItem.defaultProps = {
  flex: 1
};

FlexItem.propTypes = {
  flex: _react.PropTypes.any,
  flexGrow: _react.PropTypes.any,
  flexShrink: _react.PropTypes.any,
  flexBasis: _react.PropTypes.any
};

exports['default'] = FlexItem;
module.exports = exports['default'];