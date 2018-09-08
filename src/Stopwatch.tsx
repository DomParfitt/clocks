import * as React from "react";
import Clock from "./Clock";

class Stopwatch extends React.Component<IStopwatchProps, IStopwatchState> {
    public render(): JSX.Element {
        return (
            <div>
                <div>
                    <Clock time={new Date('Jan 1 2000, 12:00:00')}/>
                </div>
                <button>Start</button>
                <button>Stop</button>
                <button>Pause</button>
            </div>
        );
    }
}

export interface IStopwatchProps extends React.ClassAttributes<Stopwatch> {

}

export interface IStopwatchState extends React.ComponentState {
    is?: boolean;
}

export default Stopwatch;