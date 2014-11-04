/** @jsx React.DOM */

'use strict';

var React = require('react')

var RowLayout = React.createFactory(require('./RowLayout'))
var ColumnLayout = React.createFactory(require('./ColumnLayout'))

var common         = require('./common')
var renderChildren = common.renderChildren

module.exports = React.createClass({

    displayName: 'Row1ColumnN',

    mixins: [
        common
    ],

    render: function(){
        var children = this.props.children.concat()

        var rowLayout = <RowLayout>
                            {children[0]}
                        </RowLayout>

        var columnLayout = <ColumnLayout>
                            {children.slice(1)}
                        </ColumnLayout>

        this.asChildLayout(rowLayout)
        this.asChildLayout(columnLayout)

        return (
            <div className={"rf-layout rf-composite rf-row-1-column-n "+(this.props.horizontal?'rf-horizontal':'rf-vertical') + (' ' + (this.props.className||''))}>
                {this.renderChildren([rowLayout, columnLayout], this)}
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