/** @jsx React.DOM */
var RowLayout = require('./RowLayout')
var ColumnLayout = require('./ColumnLayout')
var Row1ColumnN = require('./Row1ColumnN')
var ColumnNRow1 = require('./ColumnNRow1')

React.renderComponent(
    <Row1ColumnN>
        <div flex="1">left</div>
      <div layoutPadding="30">third</div>
      <div flex="1" layoutPadding="30">second</div>
  </Row1ColumnN>,
  document.getElementById('content')
)