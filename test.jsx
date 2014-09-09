/** @jsx React.DOM */
var Row1ColumnN = require('./index').Row1ColumnN
var React = require('react')

React.renderComponent(
    <Row1ColumnN bordered="true">
        <div>hey</div>
        <div>second</div>
        <div flex="1" className="u-fill u-absolute">third</div>
    </Row1ColumnN>,
    document.getElementById('content')
)