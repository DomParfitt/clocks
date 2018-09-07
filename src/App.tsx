import * as React from 'react';
import './App.css';

import { IClockProps } from './Clock';
import ClocksHolder from './ClocksHolder';

class App extends React.Component {
  public render() {
    const clocks: IClockProps[] = [];
    clocks.push({offset: 0, isSmooth: true, location: "London"});
    clocks.push({offset: 4, isSmooth: true});
    clocks.push({offset: -10, isSmooth: false});
    clocks.push({offset: 11, isSmooth: true});
    return (
      <ClocksHolder clocks={clocks} areSmooth={true}/>
    );
  }
}

export default App;
