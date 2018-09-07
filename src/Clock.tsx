import * as React from "react";
import './Clock.css';

class Clock extends React.Component<IClockProps, IClockState> {

    constructor(props: IClockProps) {
        super(props);
        this.state = { time: new Date() };
    }

    public componentWillMount() {
        let tickSpeed = 1000;
        if (this.props.isSmooth) {
            tickSpeed = 100;
        }
        setInterval(() => this.tick(), tickSpeed);
    }

    public render() {
        const radius = 40;
        const xOrigin = 50;
        const yOrigin = 50;
        const millisAngle = this.getMilliseconds() / 1000;
        const secondsAngle = (this.getSeconds() / 60) +  (millisAngle / 60);
        const minutesAngle = (this.getMinutes() / 60) + (secondsAngle / 60);
        const hoursAngle = (this.getHours() / 12) + (minutesAngle / 12);
        const xSeconds = this.x(xOrigin, radius-5, Math.floor(360 * secondsAngle));
        const ySeconds = this.y(yOrigin, radius-5, 360 * secondsAngle);
        const xMinutes = this.x(xOrigin, radius-5, 360 * minutesAngle);
        const yMinutes = this.y(yOrigin, radius-5, 360 * minutesAngle);
        const xHours = this.x(xOrigin, radius-15, 360 * hoursAngle);
        const yHours = this.y(yOrigin, radius-15, 360 * hoursAngle);

        return (
            <div className="clock">
                <div className="location">{this.props.location}</div>
                <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle cx={xOrigin} cy={yOrigin} r={radius} fill="white" />
                    
                    <line x1={xOrigin} y1={yOrigin - radius} x2={xOrigin} y2={yOrigin - radius + 10}  />
                    <line x1={xOrigin} y1={yOrigin + radius} x2={xOrigin} y2={yOrigin + radius - 10}  />
                    <line x1={xOrigin + radius}y1={yOrigin} x2={xOrigin + radius - 10} y2={yOrigin}  />
                    <line x1={xOrigin - radius} y1={yOrigin} x2={xOrigin - radius + 10} y2={yOrigin}  />
                    
                    <line className="secondsHand" x1={xOrigin} y1={yOrigin} x2={xSeconds} y2={ySeconds} />
                    <line className="minutesHand" x1={xOrigin} y1={yOrigin} x2={xMinutes} y2={yMinutes}  />
                    <line className="hoursHand" x1={xOrigin} y1={yOrigin} x2={xHours} y2={yHours}  />
                    
                    <circle cx={xOrigin} cy={yOrigin} r="1.5"  fill="black" />
                </svg>
            </div>
        );
    }

    private getMilliseconds() {
        return this.state.time.getMilliseconds();
    }

    private getSeconds() {
        return this.state.time.getSeconds();
    }

    private getMinutes() {
        return this.state.time.getMinutes();
    }

    private getHours() {
        return this.state.time.getHours() + (this.props.offset === undefined ? 0 : this.props.offset);
    }

    private tick(): void {
        this.setState({ time: new Date() });
    }

    private x(origin: number, r: number, angle: number): number {
        return origin + r * Math.sin(angle * (Math.PI / 180));
    }

    private y(origin: number, r: number, angle: number): number {
        return origin - r * Math.cos(angle * (Math.PI / 180));
    }
}

export interface IClockProps extends React.ClassAttributes<Clock> {
    location?: string;
    isSmooth?: boolean;
    offset?: number;
}

export interface IClockState extends React.ComponentState {
    time: Date;
}

export default Clock;