'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _join = require('./join');

var _join2 = _interopRequireDefault(_join);

var _props2flex = require('./props2flex');

var _props2flex2 = _interopRequireDefault(_props2flex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props, prefix) {
  var flex = (0, _props2flex2.default)(props);
  var flexGrow = props.flexGrow;
  var flexShrink = props.flexShrink;
  var flexBasis = props.flexBasis;

  var className = (0, _join2.default)(flex != null ? prefix + '--flex-' + flex : null, flexGrow != null ? prefix + '--flex-grow-' + flexGrow : null, flexShrink != null ? prefix + '--flex-shrink-' + flexShrink : null, flexBasis != null ? prefix + '--flex-basis-' + flexBasis : null);

  return className;
};