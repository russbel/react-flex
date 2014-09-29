/** @jsx React.DOM */

'use strict'

var React = require('react')

module.exports = React.createClass({

    mixins: [require('./common')],

    orientation: 'vertical',

    getInitialState: function(){
        return {}
    },

    render: function(){
        return (
            <div className="rf-column rf-layout">
                {this.renderChildren()}
            </div>
        )
    }
})