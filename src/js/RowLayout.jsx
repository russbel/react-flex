/** @jsx React.DOM */

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