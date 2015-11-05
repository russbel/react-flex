import React from 'react';
import { render } from 'react-dom';
import Slide from 'react-slide';

import { Flex, Item } from 'react-flex'
import 'react-flex/index.css'

import './index.css'

const Slider = (props) => {

  const handleStyle = {
    width: 20,
    height: 20,
    borderRadius: 10,
    background: '#3ABBEC'
  }

  const renderHandle = (props) => {
    return <div {...props}>
      <span style={{marginLeft: 10, position: 'absolute', left: '100%', visibility: props.mouseDown? 'visible':'hidden'}}>{props.value}</span>
    </div>
  }

  return <div>
    <Slide
      {...props}
      handleFactory={renderHandle}
      style={{marginTop: 10, display: 'inline-block'}}
      orientation="vertical"
      handleStyle={handleStyle}
      trackRadius={5}
      startValue={1}
      endValue={12}
    />
  </div>
}

const values = {
  side: 2,
  content: 5
}

const change = (name) => {
  return (value) => {
    console.log(name, value)
    values[name] = value;
    renderApp();
  }
}

const border = '3px solid #00B8FF'

const App = (props) => {
  return <Flex
    column
    alignItems="stretch"
  >
    <div style={{padding: 50, borderBottom: border}}>
      Drag slider handle to change flex value
    </div>

    <Flex flex alignItems="stretch">
      <Item flex={values.side} style={{background: '#E5F2F7', padding: 10}}>
        Sidebar - flex {values.side}
        <Slider
          value={values.side}
          onChange={change('side')}
        />
      </Item>
      <Item flex={values.content} style={{background: '#D0FFD7', padding: 10, borderLeft: border}}>
        Content - flex {values.content}
        <div style={{textAlign: 'right'}}>
          <Slider
            value={values.content}
            onChange={change('content')}
          />
        </div>
      </Item>
      
    </Flex>

    <div style={{padding: 50, borderTop: border}}>
      <a href="https://github.com/zippyui/react-flex">https://github.com/zippyui/react-flex</a>
    </div>
  </Flex>
}

const renderApp = () => {
  render(
    <App />,
    document.getElementById('content')
  )
}

renderApp();