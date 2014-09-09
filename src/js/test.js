zippy.Application.create({
    name: 'EntityDesigner'
}, {
    alias: 'z.container',
    layout: 'z.rowlayout'
    items: [
        {
            alias: 'z.panel',
            title: 'first'
        },
        {
            alias: 'z.panel',
            title: 'second'
        },
        {
            alias: 'z.panel',
            title: 'third'
        }
    ]
})
return
var RowLayout = require('./RowLayout')
var ColumnLayout = require('./ColumnLayout')
var Row1ColumnN = require('./Row1ColumnN')
var ColumnNRow1 = require('./ColumnNRow1')

React.renderComponent(
    <Row1ColumnN>
        <div flex="1">left</div>
      <div layoutPadding="30">third</div>
      <div flex="1" layoutPadding="30">second</div>
  </Row1ColumnN>,
  document.getElementById('content')
)