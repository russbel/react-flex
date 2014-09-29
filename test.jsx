/** @jsx React.DOM */
'use strict'

var Row1ColumnN = require('./index').Row1ColumnN
var React = require('react')

require('./index.styl')

React.renderComponent(
    <Row1ColumnN bordered="true">
        <div>hey</div>
        <div>second</div>
        <div flex="1" className="u-fill u-absolute">third</div>
    </Row1ColumnN>,
    document.getElementById('content')
)