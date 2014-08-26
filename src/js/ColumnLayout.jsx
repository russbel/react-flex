/** @jsx React.DOM */

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