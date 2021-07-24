import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const CountdownClock = props => {
    /**
     * Adds a leading zero to number values to keep spacing correct
     * @param {number} time_ The number value for hours, minutes, or seconds to check
     * @returns {string} A string of the number that includes a leading zero if time_ is less than 10
     */
    function LeadingZero(time_) {
        if (time_ < 10) {
            return "0" + time_;
        }

        return "" + time_;
    }


    return (
        <View style={styles.wrapper}>
            <View style={styles.highlight} />
            <Text style={styles.title}>Countdown</Text>
            <Text style={styles.time}>{LeadingZero(23 - props.hour)}:{LeadingZero(59 - props.min)}:{LeadingZero(60 - props.sec)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '75%',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#bbb',
        margin: 5,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#928A0A'
    },

    title: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    },

    time: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 36,
        color: '#fff',
    },

    highlight: {
        position: 'absolute',
        top: '0%',
        bottom: '65%',
        left: '0%',
        right: '0%',
        backgroundColor: '#BBB215',
        borderBottomColor: '#EBDE20',
        borderBottomWidth: 6,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
    }
})

export default CountdownClock;