import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class MattFreedomClock extends Component {
    constructor(props) {
        super(props);
    }


    /**
     * Finds the number of total days
     * */
    FindDays = function () {
        var currentDate = new Date();
        var freeDate = new Date(2021, 6, 30, 10, 30);
        var timeDiff = freeDate.getTime() - currentDate.getTime();
        var msInYear = 31536000000;
        var msInDay = 86400000;

        if (currentDate.getHours() < 9) {
            timeDiff -= msInDay;
        }

        var days = 0;
        while (timeDiff >= msInDay) {
            days += 1;
            timeDiff -= msInDay;

            if (timeDiff < msInDay) {
                return days;
            }
        }

        return days;
    }


    /**
     * Finds the number of days since the last month
     * */
    FindDaysOfMonth = function () {
        var days = this.FindDays();

        if (days < 0) {
            return 0;
        }

        return days;
    }


    /**
     * Finds the number of hours
     * */
    FindHours = function () {
        var currentDate = new Date();
        var hours = currentDate.getHours() - 10;
        if (hours < 0) {
            //hours += 24;
        }

        hours = 24 - hours;

        return "" + hours;
    }


    FindMinutes = function () {
        var currentDate = new Date();
        var min = currentDate.getMinutes() - 30;
        if (min < 0) {
            min += 60;
        }

        min = 60 - min;

        return "" + min;
    }


    FindMilliseconds = function () {
        var currentDate = new Date();
        var ms = new Date(2021, 6, 30, 10, 30).getTime() - currentDate.getTime();

        return ms;
    }


    FindSeconds = function () {
        var currentDate = new Date();
        var sec = new Date(2021, 6, 30, 10, 30).getTime() - currentDate.getTime();
        sec = Math.floor(sec / 1000);

        return sec;
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.highlight} />

                <Text style={styles.title}>Time Until</Text>
                <Text style={styles.title}>July 30, 2021 at 10:30 AM</Text>

                <Text style={styles.timeTextSmall}>{Math.floor(this.FindDaysOfMonth() / 7)} Weeks</Text>
                <Text style={styles.timeTextSmall}>{this.FindDaysOfMonth() % 7} Days</Text>
                <Text style={styles.timeTextSmall}>{this.FindHours()} Hours</Text>
                <Text style={styles.timeTextSmall}>{this.FindMinutes()} Minutes</Text>

                <Text style={styles.timeText}>OR</Text>
                <Text style={styles.timeTextSmall}>{this.FindMilliseconds()} Ms</Text>

                <Text style={styles.timeText}>OR</Text>
                <Text style={styles.timeTextSmall}>{this.FindSeconds()} Sec</Text>

                <Text style={styles.timeText}>OR</Text>
                <Text style={styles.timeTextSmall}>{Math.floor(this.FindSeconds() / 60)} Min</Text>

                <Text style={styles.timeText}>OR</Text>
                <Text style={styles.timeTextSmall}>{Math.floor(this.FindSeconds() / 3600)} Hr</Text>
            </View>
        )
    }
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
        backgroundColor: '#008457'
    },

    title: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    },

    timeText: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 28,
        color: '#fff',
        marginTop: 5, 
        marginBottom: -5,
    },

    timeTextSmall: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff',
        marginBottom: -10
    },
});