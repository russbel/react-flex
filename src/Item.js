import React, { PropTypes } from 'react'
import assign from 'object-assign'
import Component from 'react-class'

import join from './join'
import getPrefix from './getPrefix'
import flex2className from './flex2className'

const props2className = (props) => {
  const prefix = getPrefix(props) + '-item'

  let className = join(
    props.className,
    prefix,

    flex2className(props, prefix)
  )

  return className
}

class FlexItem extends Component {

  render(){

    const props = this.props
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

FlexItem.defaultProps = {
  flex: 1
}

FlexItem.propTypes = {
  flex: PropTypes.any,
  flexGrow: PropTypes.any,
  flexShrink: PropTypes.any,
  flexBasis: PropTypes.any
}

export default FlexItem