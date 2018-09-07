import * as React from "react";
import Clock, { IClockProps } from "./Clock";

class ClocksHolder extends React.Component<IClocksHolderProps, IClocksHolderState> {

    constructor(props: IClocksHolderProps) {
        super(props);
        this.state = {clocks: this.props.clocks || []};
    }

    public render() {

        const isSmooth = this.props.areSmooth;
        const clocks = this.state.clocks.map(
            (clock) => 
            <Clock 
                key={this.state.clocks.indexOf(clock)} 
                offset={clock.offset} 
                isSmooth={isSmooth ? isSmooth : clock.isSmooth}
                location={clock.location} 
            />
        );

        return(
            <div className="clocksHolder">
                {clocks}
            </div>
        );
    }
}

interface IClocksHolderProps extends React.ClassAttributes<ClocksHolder> {
    areSmooth?: boolean;
    clocks?: IClockProps[];
}

interface IClocksHolderState extends React.ComponentState {
    clocks: IClockProps[];
}

export default ClocksHolder;