import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';

const FaceClock = props => {
    const screenWidth = Dimensions.get("window").width - 60;
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


    function RomanNumeral(hour_) {

        switch (hour_) {
            case 0: return "XII";
            case 1: return "I";
            case 2: return "II";
            case 3: return "III";
            case 4: return "IV";
            case 5: return "V";
            case 6: return "VI";
            case 7: return "VII";
            case 8: return "VIII";
            case 9: return "IX";
            case 10: return "X";
            case 11: return "XI";
            default: return "0";
        }
    }


    function DrawBackground() {
        //Creating the array of lines for the 60 minute marks
        const minuteMarks = minArray.map((minute, index) => {
            const start = LinePoints((screenWidth / 2) - 10, index * 6);
            const end = LinePoints((screenWidth / 2) - 12, index * 6);
            return (
                <Line
                    stroke='white'
                    strokeWidth={2}
                    strokeLinecap='square'
                    key={"fc_m" + index}
                    x1={start.x}
                    x2={end.x}
                    y1={start.y}
                    y2={end.y}
                />
            );
        });

        //Creating the array of lines for the 12 hour marks
        const hourMarks = hourArray.map((hour, index) => {
            const start = LinePoints((screenWidth / 2) - 10, index * 30);
            const end = LinePoints((screenWidth / 2) - 20, index * 30);
            const hourText = LinePoints((screenWidth / 2) - 35, index * 30);
            return (
                <View>
                    <Line
                        stroke='white'
                        strokeWidth={3}
                        strokeLinecap='round'
                        key={"fc_h" + index}
                        x1={start.x}
                        x2={end.x}
                        y1={start.y}
                        y2={end.y}
                    />
                    <Text
                        textAnchor='middle'
                        fontSize='12'
                        fontWeight='bold'
                        fontFamily='serif'
                        fill='white'
                        alignmentBaseline='central'
                        key={"fc_t" + index}
                        x={hourText.x}
                        y={hourText.y}
                    >
                        {RomanNumeral(index)}
                    </Text>
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
                    fill={'#000'}
                    stroke={'#fff'}
                    strokeWidth={2}
                />

                {minuteMarks}
                {hourMarks}
                {DrawHands()}

                <Circle
                    width={20}
                    height={20}
                    cx={screenWidth / 2}
                    cy={screenWidth / 2}
                    r={10}
                    fill={'#fff'}
                />
            </Svg>
        );
    }


    function DrawHands() {
        var hourAngle = props.hour;
        if (hourAngle > 12) {
            hourAngle -= 12;
        }
        hourAngle = (hourAngle / 12) * 360.0;

        const hourStart = LinePoints(0, hourAngle);
        const hourEnd = LinePoints((screenWidth / 2) * 0.5, hourAngle);

        //Getting the line points for the minute hand
        var minAngle = (props.min / 60) * 360.0;
        const minStart = LinePoints(0, minAngle);
        const minEnd = LinePoints((screenWidth / 2) * 0.85, minAngle);

        //Getting the line points for the second hand
        var secAngle = (props.sec / 60) * 360.0;
        const secStart = LinePoints(0, secAngle);
        const secEnd = LinePoints((screenWidth / 2) * 0.9, secAngle);

        return (
            <Svg width={screenWidth} height={screenWidth}>
                <Line
                    stroke="white"
                    strokeWidth={10}
                    strokeLinecap='square'
                    x1={hourStart.x}
                    x2={hourEnd.x}
                    y1={hourStart.y}
                    y2={hourEnd.y}
                    style={{ position: 'absolute' }}
                />
                <Line
                    stroke="white"
                    strokeWidth={6}
                    strokeLinecap='square'
                    x1={minStart.x}
                    x2={minEnd.x}
                    y1={minStart.y}
                    y2={minEnd.y}
                    style={{ position: 'absolute' }}
                />
                <Line
                    stroke="red"
                    strokeWidth={2}
                    strokeLinecap='square'
                    x1={secStart.x}
                    x2={secEnd.x}
                    y1={secStart.y}
                    y2={secEnd.y}
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

    title: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
    },
})

export default FaceClock;