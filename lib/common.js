var toStyle = require('to-style').object
var isNumeric = require('i-s').numeric

function getBorderSize(layout){
    var bordered   = layout.props.bordered
    var borderSize = bordered?
                        isNumeric(bordered)?
                        bordered: parseInt(bordered, 10) || 1
                        :
                        0

    return borderSize
}

function getFlex(item){
    var flex = item.props.flex

    return isNumeric(flex)?
                parseInt(flex, 10):
                0
}

function itemPadding(item, index, layout){

    var style = {}

    if (layout.props.layoutPadding){
        style.padding = layout.props.layoutPadding
    }
    if (item.props.layoutPadding){
        style.padding = item.props.layoutPadding
    }

    var borderSize = getBorderSize(layout)

    if (borderSize && index){
        var borderPos = layout.orientation == 'vertical'? 'border-top': 'border-left'

        style[borderPos + '-width'] = borderSize
        style[borderPos + '-style'] = 'solid'
    }

    var itemFlex = getFlex(item)

    if (itemFlex && itemFlex > 10){
        style.flex = itemFlex
    }

    return toStyle(style)
}

function itemClass(item, index, layout){
    var result = ['rf-layout-item']

    var borderSize = getBorderSize(layout)
    var itemFlex   = getFlex(item)

    if (itemFlex && itemFlex <= 10){
        result.push('u-flex-' + itemFlex)
    }

    if (borderSize && index){
        result.push('rf-bordered')
    }

    return result.join(' ')
}

module.exports = {

    getDefaultProps: require('./getDefaultProps'),

    renderChildren: require('./renderChildren')(itemClass, itemPadding)
}