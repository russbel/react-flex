import React, { PropTypes } from 'react'
import assign from 'object-assign'
import Component from 'react-class'

import join from './join'
import getPrefix from './getPrefix'
import flex2className from './flex2className'

const props2className = (props) => {
  const prefix = getPrefix(props)

  const column = !!props.column
  const row = !column && !!props.row
  const reverse = props.reverse ? '-reverse' : ''

  let className = join(
    props.className,
    prefix,

    flex2className(props, prefix),

    props.inline?
      `${prefix}-inline`:
      null,

    props.alignItems?
      `${prefix}-align-items-${props.alignItems}`:
      null,

    props.alignContent?
      `${prefix}-align-content-${props.alignContent}`:
      null,

    props.justifyContent?
      `${prefix}-justify-content-${props.justifyContent}`:
      null,

    props.wrap?
      `${prefix}-wrap`:
      null,

    row?
      `${prefix}-row${reverse}`:
      null,

    column?
      `${prefix}-column${reverse}`:
      null
  )

  return className
}

class Flex extends Component {

  render(){
    const props = this.props
    const Factory = props.factory || React.createFactory('div');
    const className = props2className(props)

    const allProps = assign({}, props, {
      className
    })

    if (props.factory){
      return props.factory(allProps);
    }

    return <div {...allProps} />
  }
}

Flex.defaultProps = {
  row: true,
  wrap: true
}

Flex.propTypes = {

  flex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),

  inline: PropTypes.bool,
  
  row: PropTypes.bool,
  column: PropTypes.bool,
  wrap: PropTypes.bool,

  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
  justifyContent: PropTypes.string
}

export default Flex