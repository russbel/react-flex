import React from 'react';
import { render } from 'react-dom';

import './src/index.css';

import { Flex, Item } from './src'

const App = (props) => {
  return <Flex
    row
    style={{border: '3px solid magenta', height: 500, width: 400}}
    alignContent="space-between"
  >
    <Item style={{background: 'red' }}>
      1
    </Item>

    <Item flex={10} style={{background: 'blue' }}>
      2
    </Item>
  </Flex>
}

render(
    <App />,
    document.getElementById('content')
)