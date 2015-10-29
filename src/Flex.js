import React, { PropTypes } from 'react'
import join from './join'
import props2flex from './props2flex'

const DIV = React.createFactory('div')

const getPrefix = (props) => {
  return props.classNamePrefix || 'react-flex'
}

const props2className = (props) => {
  const prefix = getPrefix(props)
  const flex = props2flex(props)

  const column = !!props.column
  const row = !column && !!props.row

  let className = join(
    props.className,
    prefix,

    props.alignItems?
      `${prefix}-align-items-${props.alignItems}`:
      null,

    flex != null?
      `${prefix}--flex-${flex}`:
      null,

    props.justifyContent?
      `${prefix}-justify-content-${props.justifyContent}`:
      null,

    props.wrap?
      `${prefix}-wrap`:
      null,

    row?
      `${prefix}-row`:
      null,

    column?
      `${prefix}-column`:
      null
  )

  return className
}

const Flex = (props) => {

  const Factory = props.factory || DIV
  const className = props2className(props)

  return <div {...props} className={className} />

}

Flex.defaultProps = {
  row: true,
  wrap: true
}

Flex.propTypes = {
  flex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),

  row: PropTypes.bool,
  column: PropTypes.bool,
  wrap: PropTypes.bool,

  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
  justifyContent: PropTypes.string
}

export default Flex