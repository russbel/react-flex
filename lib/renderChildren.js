/** @jsx React.DOM */

'use strict';

var React = require('react')

module.exports = function(itemClass, itemPadding){

    return function(children, layout){
        if (children && !Array.isArray(children)){
            children = [children]
        }

        return React.Children.map(children || this.props.children, function(item, index){
            return React.DOM.div({className: itemClass(item, index, this), style: itemPadding(item, index, this)}, item)
        }, layout || this)
    }
}