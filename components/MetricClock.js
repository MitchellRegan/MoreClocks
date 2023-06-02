import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const MetricClock = props => {
    function GetMetric() {
        var seconds = props.sec;
        seconds += 60 * props.min;
        seconds += 3600 * props.hour;
        seconds = seconds / 8640;

        return seconds.toFixed(4);
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.highlight}/>
            <Text style={styles.title}>Metric</Text>
            <Text style={styles.time}>{GetMetric()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '75%',
        borderWidth: 2,
        borderColor: '#bbb',
        margin: 5,
        padding: 3,
        alignItems: 'center',
        backgroundColor: '#4c0463'
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
        fontSize: 36,
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
        backgroundColor: '#63117d',
    }
})

export default MetricClock;