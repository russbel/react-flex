/** @jsx React.DOM */
var React = require('react')

var RowLayout = require('./RowLayout')
var ColumnLayout = require('./ColumnLayout')

var common         = require('./common')
var renderChildren = common.renderChildren

module.exports = React.createClass({displayName: 'exports',

    mixins: [
        common
    ],

    render: function(){
        var children = this.props.children.concat()

        var rowLayout = RowLayout(null, 
                            children[0]
                        )

        var columnLayout = ColumnLayout(null, 
                            children.slice(1)
                        )

        this.asChildLayout(rowLayout)
        this.asChildLayout(columnLayout)

        return (
            React.DOM.div({className: "rf-layout rf-composite rf-row-1-column-n "+(this.props.horizontal?'rf-horizontal':'rf-vertical') + (' ' + (this.props.className||''))}, 
                this.renderChildren([rowLayout, columnLayout], this)
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