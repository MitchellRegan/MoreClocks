import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const TwelveHourClock = props => {
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


    function OverTwelve(hours_) {
        if (hours_ > 12) {
            if (hours_ - 12 < 10) {
                return "0" + (hours_ - 12);
            }
            else {
                return "" + (hours_ - 12);
            }
        }

        if (hours_ < 10) {
            if (hours_ == 0) {
                return "12";
            }
            else {
                return "0" + hours_;
            }
        }

        return "" + hours_
    }


    function AMorPM(hours_) {
        if (hours_ > 11) {
            return "PM";
        }

        return "AM";
    }


    return (
        <View style={styles.wrapper}>
            <View style={styles.highlight} />
            <Text style={styles.title}>12-Hour</Text>
            <Text style={styles.time}>{OverTwelve(props.hour)}:{LeadingZero(props.min)}:{LeadingZero(props.sec)} {AMorPM(props.hour)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '75%',
        borderWidth: 1,
        borderColor: '#bbb',
        margin: 5,
        padding: 3,
        alignItems: 'center',
        backgroundColor: '#0C7A01'
    },

    title: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    time: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 32,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    highlight: {
        position: 'absolute',
        top: '0%',
        bottom: '65%',
        left: '0%',
        right: '0%',
        backgroundColor: '#35BA27',
    }
})

export default TwelveHourClock;