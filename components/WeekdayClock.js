import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Svg, { Circle, Line, TextPath } from 'react-native-svg';

const WeekdayClock = props => {
    const screenWidth = Dimensions.get("window").width - 90;
    const dayArray = new Array(7).fill(1);
    const quarterArray = new Array(28).fill(1);


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
        const quarterMarks = quarterArray.map((quarter, index) => {
            const start = LinePoints((screenWidth / 2) - 10, index * 12.86);
            const end = LinePoints((screenWidth / 2) - 12, index * 12.86);
            return (
                <Line
                    stroke='#999'
                    strokeWidth={2}
                    strokeLinecap='square'
                    key={"wdc_q" + index}
                    x1={start.x}
                    x2={end.x}
                    y1={start.y}
                    y2={end.y}
                />
            );
        });

        //Creating the array of lines for the 28 marks for quarter-days
        const dayMarks = dayArray.map((day, index) => {
            const start = LinePoints((screenWidth / 2) - 10, index * 51.43);
            const end = LinePoints((screenWidth / 2) - 30, index * 51.43);
            return (
                <View>
                    <Line
                        stroke='#000'
                        strokeWidth={3}
                        strokeLinecap='round'
                        key={"wdc_d" + index}
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
                    strokeWidth={4}
                />

                {quarterMarks}
                {dayMarks}
                {DrawHand()}

                <Circle
                    width={20}
                    height={20}
                    cx={screenWidth / 2}
                    cy={screenWidth / 2}
                    r={10}
                    fill={'#000'}
                />
            </Svg>
        );
    }


    function DrawHand() {
        var day = new Date();
        var hourAngle = props.hour + (24 * day.getDay());
        hourAngle = (hourAngle / 168) * 360.0;

        const hourStart = LinePoints(0, hourAngle);
        const hourEnd = LinePoints((screenWidth / 2) * 0.85, hourAngle);

        return (
            <Svg width={screenWidth} height={screenWidth}>
                <Line
                    stroke="#000"
                    strokeWidth={5}
                    strokeLinecap='round'
                    x1={hourStart.x}
                    x2={hourEnd.x}
                    y1={hourStart.y}
                    y2={hourEnd.y}
                    style={{ position: 'absolute' }}
                />
            </Svg>
        );
    }


    return (
        <View style={styles.wrapper}>
            {DrawBackground()}

            <View style={{ fontFamily: 'serif', position: 'absolute', height: (screenWidth - 30), transform: [{ rotate: '' + ((0 * 51.43) + 25.714) + 'deg' }] }}>
                <Text>Sunday</Text>
            </View>
            <View style={{ fontFamily: 'serif', position: 'absolute', height: (screenWidth - 30), transform: [{ rotate: '' + ((1 * 51.43) + 25.714) + 'deg' }] }}>
                <Text>Monday</Text>
            </View>
            <View style={{ fontFamily: 'serif', position: 'absolute', height: (screenWidth - 30), justifyContent: 'flex-end', transform: [{ rotate: '' + ((2 * 51.43) + 25.714 -180) + 'deg' }] }}>
                <Text>Tuesday</Text>
            </View>
            <View style={{ fontFamily: 'serif', position: 'absolute', height: (screenWidth - 30), justifyContent:'flex-end', transform: [{ rotate: '' + ((3 * 51.43) + 25.714 - 180) + 'deg' }] }}>
                <Text>Wednesday</Text>
            </View>
            <View style={{ fontFamily: 'serif', position: 'absolute', height: (screenWidth - 30), justifyContent:'flex-end', transform: [{ rotate: '' + ((4 * 51.43) + 25.714 - 180) + 'deg' }] }}>
                <Text>Thursday</Text>
            </View>
            <View style={{ fontFamily: 'serif', position: 'absolute', height: (screenWidth - 30), transform: [{ rotate: '' + ((5 * 51.43) + 25.714) + 'deg' }] }}>
                <Text>Friday</Text>
            </View>
            <View style={{ fontFamily: 'serif', position: 'absolute', height: (screenWidth - 30), transform: [{ rotate: '' + ((6 * 51.43) + 25.714) + 'deg' }] }}>
                <Text>Saturday</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default WeekdayClock;