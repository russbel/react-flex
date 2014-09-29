/** @jsx React.DOM */

'use strict'

var React = require('react')

var RowLayout    = require('./RowLayout')
var ColumnLayout = require('./ColumnLayout')

var common         = require('./common')
var renderChildren = common.renderChildren

module.exports = React.createClass({

    mixins: [
        common
    ],

    render: function(){
        var children = this.props.children.concat()

        var rowLayout = <RowLayout>
                            {children[children.length - 1]}
                        </RowLayout>

        var columnLayout = <ColumnLayout>
                            {children.slice(0, children.length - 1)}
                        </ColumnLayout>

        this.asChildLayout(columnLayout)
        this.asChildLayout(rowLayout)

        return (
            <div className={"rf-layout rf-composite rf-column-n-row-1 "+(this.props.horizontal?'rf-horizontal':'rf-vertical') + (' ' + (this.props.className||''))}>
                {this.renderChildren([columnLayout, rowLayout], this)}
            </div>
        )
    },

    asChildLayout: function(layout){
        var defaultProps = common.getDefaultProps()

        Object.keys(defaultProps).forEach(function(key){
            layout.props[key] = layout.props[key] || this.props[key]
        }, this)
    }
})