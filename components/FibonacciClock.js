import React, {Component} from 'react';
import { StyleSheet, View, Animated } from 'react-native';

//SVG icons
import FibonacciSpiral from '../assets/icons/FibonacciSpiral.svg';
import TimeTicks from '../assets/icons/TimeTicks.svg';

export default class FibonacciClock extends Component {
    constructor(props) {
        super(props);
    }


    FindAngle = function () {
        var angle = (this.props.sec) + (this.props.min * 60) + (this.props.hour * 3600);
        angle = 360 * (angle / 43200);
        return '' + angle + 'deg';
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <TimeTicks height={300} width={300} style={styles.timeTickmarks} />

                <Animated.View style={{ transform: [{ rotate: this.FindAngle() }] }}>
                    <FibonacciSpiral height={300} width={300} />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    timeTickmarks: {
        position: 'absolute',
    }
})