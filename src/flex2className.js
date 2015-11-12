import join from './join'
import props2flex from './props2flex'

export default (props, prefix) => {
  const flex = props2flex(props)
  const flexGrow = props.flexGrow
  const flexShrink = props.flexShrink
  const flexBasis = props.flexBasis

  let className = join(

    flex != null?
      `${prefix}--flex-${flex}`:
      null,

    flexGrow != null?
      `${prefix}--flex-grow-${flexGrow}`:
      null,

    flexShrink != null?
      `${prefix}--flex-shrink-${flexShrink}`:
      null,

    flexBasis != null?
      `${prefix}--flex-basis-${flexBasis}`:
      null
  )

  return className
}