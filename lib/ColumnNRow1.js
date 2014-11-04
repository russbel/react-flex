/** @jsx React.DOM */

'use strict';

var React = require('react')

var RowLayout    = React.createFactory(require('./RowLayout'))
var ColumnLayout = React.createFactory(require('./ColumnLayout'))

var common         = require('./common')
var renderChildren = common.renderChildren

module.exports = React.createClass({

    displayName: 'ColumnNRow1',

    mixins: [
        common
    ],

    render: function(){
        var children = this.props.children.concat()

        var rowLayout = RowLayout(null, 
                            children[children.length - 1]
                        )

        var columnLayout = ColumnLayout(null, 
                            children.slice(0, children.length - 1)
                        )

        this.asChildLayout(columnLayout)
        this.asChildLayout(rowLayout)

        return (
            React.DOM.div({className: "rf-layout rf-composite rf-column-n-row-1 "+(this.props.horizontal?'rf-horizontal':'rf-vertical') + (' ' + (this.props.className||''))}, 
                this.renderChildren([columnLayout, rowLayout], this)
            )
        )
    },

    asChildLayout: function(layout){
        var defaultProps = common.getDefaultProps()

        Object.keys(defaultProps).forEach(function(key){
            layout.props[key] = layout.props[key] || this.props[key]
        }, this)
    }
})