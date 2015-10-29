import React from 'react';
import { render } from 'react-dom';

import './src/index.css';

import { Flex } from './src'

const App = (props) => {
  return <Flex column style={{border: '3px solid magenta', height: 500, width: 400}}>
    <Flex style={{background: 'red' }} flex>
      1
    </Flex>
    <Flex style={{background: 'blue' }} flex={2}>
      2
    </Flex>
  </Flex>
}

render(
    <App />,
    document.getElementById('content')
)