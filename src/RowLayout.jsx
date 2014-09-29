/** @jsx React.DOM */

'use strict'

var React = require('react')

module.exports = React.createClass({

    mixins: [
        require('./common')
    ],

    orientation: 'horizontal',

    getInitialState: function(){
        return {}
    },

    render: function(){
        return (
            <div className="rf-row rf-layout">
                {this.renderChildren()}
            </div>
        )
    }
})