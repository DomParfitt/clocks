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

    public render(): JSX.Element {
        const radius = 40;
        const xOrigin = 50;
        const yOrigin = 50;

        return (
            <div className="clock">
                <div className="location">{this.props.location}</div>
                <svg width="200" height="200" viewBox="0 0 100 100">
                    <circle cx={xOrigin} cy={yOrigin} r={radius} fill="white" />

                    {this.renderMarkings(xOrigin, yOrigin, radius)}
                    {this.renderHands(xOrigin, yOrigin, radius)}

                    <circle cx={xOrigin} cy={yOrigin} r="1.5" fill="black" />
                </svg>
            </div>
        );
    }

    private renderMarkings(xOrigin: number, yOrigin: number, radius: number): JSX.Element {
        const markings = [];
        
        for (let i = 0; i < 12; i++) {
            const angle = 360 * i / 12;
            const x1 = this.x(xOrigin, radius - 10, angle);
            const y1 = this.y(yOrigin, radius - 10, angle)
            const x2 = this.x(xOrigin, radius, angle);
            const y2 = this.y(yOrigin, radius, angle);
            markings.push(<line className="hourMark" x1={x1} y1={y1} x2={x2} y2={y2} />);
        }

        for (let i = 0; i < 60; i++) {
            const angle = 360 * i / 60;
            const x1 = this.x(xOrigin, radius - 5, angle);
            const y1 = this.y(yOrigin, radius - 5, angle)
            const x2 = this.x(xOrigin, radius, angle);
            const y2 = this.y(yOrigin, radius, angle);
            markings.push(<line className="minuteMark" x1={x1} y1={y1} x2={x2} y2={y2} />);
        }

        return(
            <svg>
                {markings}
            </svg>
        );
    }

    private renderHands(xOrigin: number, yOrigin: number, radius: number): JSX.Element {
        const millisAngle = this.getMilliseconds() / 1000;
        const secondsAngle = (this.getSeconds() / 60) + (millisAngle / 60);
        const minutesAngle = (this.getMinutes() / 60) + (secondsAngle / 60);
        const hoursAngle = (this.getHours() / 12) + (minutesAngle / 12);
        const xSeconds = this.x(xOrigin, radius - 5, Math.floor(360 * secondsAngle));
        const ySeconds = this.y(yOrigin, radius - 5, 360 * secondsAngle);
        const xMinutes = this.x(xOrigin, radius - 5, 360 * minutesAngle);
        const yMinutes = this.y(yOrigin, radius - 5, 360 * minutesAngle);
        const xHours = this.x(xOrigin, radius - 15, 360 * hoursAngle);
        const yHours = this.y(yOrigin, radius - 15, 360 * hoursAngle);

        return (
            <svg>
                <line className="hoursHand" x1={xOrigin} y1={yOrigin} x2={xHours} y2={yHours} />
                <line className="minutesHand" x1={xOrigin} y1={yOrigin} x2={xMinutes} y2={yMinutes} />
                <line className="secondsHand" x1={xOrigin} y1={yOrigin} x2={xSeconds} y2={ySeconds} />
            </svg>
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
    hasHourMarks?: boolean;
    hasMinuteMarks?: boolean;
}

export interface IClockState extends React.ComponentState {
    time: Date;
}

export default Clock;