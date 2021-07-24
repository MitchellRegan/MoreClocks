import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const SegmentedFaceClock = props => {
    const screenWidth = Dimensions.get("window").width - 60;
    const secArray = new Array(60).fill(1);
    const minArray = new Array(60).fill(1);
    const hourArray = new Array(12).fill(1);


    /**
     * Finds the (x,y) coordinates for endpoints used in drawing lines
     * @param {any} radius_
     * @param {any} angle_
     */
    function LinePoints(radius_, angle_) {
        var radians = ((angle_ - 90) * Math.PI) / 180.0;

        return {
            x: (screenWidth / 2) + (radius_ * Math.cos(radians)),
            y: (screenWidth / 2) + (radius_ * Math.sin(radians))
        }
    }


    function DrawBackground() {
        //Creating the array of lines for the 60 minute marks
        const secondMarks = secArray.map((minute, index) => {
            const start = LinePoints((screenWidth / 2) - 14, index * 6);
            const end = LinePoints((screenWidth / 2) - 16, index * 6);
            return (
                <Line
                    stroke='#000'
                    strokeWidth={2}
                    strokeLinecap='square'
                    key={"sfc_sec" + index}
                    x1={start.x}
                    x2={end.x}
                    y1={start.y}
                    y2={end.y}
                />
            );
        });

        //Creating the array of lines for the 60 minute marks
        const minuteMarks = minArray.map((minute, index) => {
            var startPx = 10;
            var endPx = 20;
            if (index % 5 == 0) {
                startPx = 5;
                endPx = 25;
            }

            const start = LinePoints((screenWidth / 2.5) - startPx, index * 6);
            const end = LinePoints((screenWidth / 2.5) - endPx, index * 6);
            return (
                <Line
                    stroke='white'
                    strokeWidth={2}
                    strokeLinecap='square'
                    key={"sfc_min" + index}
                    x1={start.x}
                    x2={end.x}
                    y1={start.y}
                    y2={end.y}
                />
            );
        });

        //Creating the array of lines for the 12 hour marks
        const hourMarks = hourArray.map((hour, index) => {
            const start = LinePoints((screenWidth / 4) - 10, index * 30);
            const end = LinePoints((screenWidth / 4) - 26, index * 30);
            return (
                <View>
                    <Line
                        stroke='#000'
                        strokeWidth={6}
                        strokeLinecap='round'
                        key={"sfc_hourText" + index}
                        x1={start.x}
                        x2={end.x}
                        y1={start.y}
                        y2={end.y}
                    />
                </View>
            );
        });

        return (
            <Svg width={screenWidth} height={screenWidth}>
                <Circle
                    width={screenWidth}
                    height={screenWidth}
                    cx={screenWidth / 2}
                    cy={screenWidth / 2}
                    r={(screenWidth / 2) - 2}
                    fill={'#fff'}
                    stroke={'#000'}
                    strokeWidth={2}
                    key={"sfc_circle0"}
                />
                <Circle
                    width={screenWidth / 3}
                    height={screenWidth / 3}
                    cx={screenWidth / 2}
                    cy={screenWidth / 2}
                    r={(screenWidth / 2.5)}
                    fill={'#000'}
                    stroke={'#999'}
                    strokeWidth={4}
                    key={"sfc_circle1"}
                />
                <Circle
                    width={screenWidth / 3}
                    height={screenWidth / 3}
                    cx={screenWidth / 2}
                    cy={screenWidth / 2}
                    r={(screenWidth / 4)}
                    fill={'#fff'}
                    stroke={'#999'}
                    strokeWidth={4}
                    key={"sfc_circle2"}
                />

                {secondMarks}
                {minuteMarks}
                {hourMarks}
                {DrawHands()}
            </Svg>
        );
    }


    function DrawHands() {
        var hourAngle = props.hour;
        if (hourAngle > 12) {
            hourAngle -= 12;
        }
        hourAngle = (hourAngle / 12) * 360.0;

        const hourStart = LinePoints((screenWidth / 4) - 5, hourAngle);
        const hourEnd = LinePoints((screenWidth / 4) - 35, hourAngle);

        //Getting the line points for the minute hand
        var minAngle = (props.min / 60) * 360.0;
        const minStart = LinePoints((screenWidth / 2.5) - 5, minAngle);
        const minEnd = LinePoints((screenWidth / 2.5) - 35, minAngle);

        //Getting the line points for the second hand
        var secAngle = (props.sec / 60) * 360.0;
        const secStart = LinePoints((screenWidth / 2) - 15, secAngle);
        const secEnd = LinePoints((screenWidth / 2) - 15, secAngle);

        return (
            <Svg width={screenWidth} height={screenWidth}>
                <Line
                    stroke="red"
                    strokeWidth={10}
                    strokeLinecap='square'
                    x1={hourStart.x}
                    x2={hourEnd.x}
                    y1={hourStart.y}
                    y2={hourEnd.y}
                    key={"sfc_hourHand"}
                    style={{ position: 'absolute' }}
                />
                <Line
                    stroke="red"
                    strokeWidth={8}
                    strokeLinecap='square'
                    x1={minStart.x}
                    x2={minEnd.x}
                    y1={minStart.y}
                    y2={minEnd.y}
                    key={"sfc_minHand"}
                    style={{ position: 'absolute' }}
                />
                <Line
                    stroke="red"
                    strokeWidth={16}
                    strokeLinecap='round'
                    x1={secStart.x}
                    x2={secEnd.x}
                    y1={secStart.y}
                    y2={secEnd.y}
                    key={"sfc_secHand"}
                    style={{ position: 'absolute' }}
                />
            </Svg>
        );
    }


    return (
        <View style={styles.wrapper}>
            {DrawBackground()}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 5,
        padding: 10,
    },
})

export default SegmentedFaceClock;