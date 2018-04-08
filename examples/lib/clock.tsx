import * as React from 'react';
import { Component, createElement, ReactElement } from 'react';
import HelloWorld from './helloworld';

export default class Clock extends Component<{}, { date: Date }> {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    console.log('component did mount');
  }

  componentWillUnmount() {
    console.log('component will unmount');
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div onClick={this.tick.bind(this)} className='hello'>
        <HelloWorld/>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}