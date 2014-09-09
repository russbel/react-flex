/** @jsx React.DOM */
var React = require('react')

module.exports = React.createClass({displayName: 'exports',

    mixins: [require('./common')],

    orientation: 'vertical',

    getInitialState: function(){
        return {}
    },

    render: function(){
        return (
            React.DOM.div({className: "rf-column rf-layout"}, 
                this.renderChildren()
            )
        )
    }
})