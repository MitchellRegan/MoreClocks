import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class WashingtonClock extends Component {
    constructor(props) {
        super(props);
    }


    /**
     * Finds the number of years
     * */
    FindYears = function () {
        var currentDate = new Date();
        var waDate = new Date(2017, 3, 22, 9, 0);
        var timeDiff = currentDate.getTime() - waDate.getTime();
        var msInYear = 31536000000;

        var years = 0;
        while (timeDiff >= msInYear) {
            years += 1;
            timeDiff -= msInYear;

            if (timeDiff < msInYear) {
                return years;
            }
        }

        return years;
    }


    /**
     * Finds the number of total days
     * */
    FindDays = function () {
        var currentDate = new Date();
        var waDate = new Date(2017, 3, 22, 9, 0);
        var timeDiff = currentDate.getTime() - waDate.getTime();
        var msInYear = 31536000000;
        var msInDay = 86400000;

        timeDiff -= this.FindYears() * msInYear;

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

        //Apr 22 - May 22 (30 days)
        if (days > 30) {
            days -= 30;

            //May 22 - June 22 (31 days)
            if (days > 31) {
                days -= 31;

                //June 22 - July 22 (30 days)
                if (days > 30) {
                    days -= 30;

                    //July 22 - Aug 22 (31 days)
                    if (days > 31) {
                        days -= 31;

                        //Aug 22 - Sep 22 (31 days)
                        if (days > 31) {
                            days -= 31;

                            //Sep 22 - Oct 22 (30 days)
                            if (days > 30) {
                                days -= 30;

                                //Oct 22 - Nov 22 (31 days)
                                if (days > 31) {
                                    days -= 31;

                                    //Nov 22 - Dec 22 (30 days)
                                    if (days > 30) {
                                        days -= 30;

                                        //Dec 22 - Jan 22 (31 days)
                                        if (days > 31) {
                                            days -= 31;

                                            //Jan 22 - Feb 22 (31 days)
                                            if (days > 31) {
                                                days -= 31;

                                                //Feb 22 - Mar 22 (28 days)
                                                if (days > 28) {
                                                    days -= 28;

                                                    //Mar 22 - Apr 22 (31 days)
                                                    if (days > 31) {
                                                        days -= 31;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return days;
    }


    /**
     * Finds the number of months
     * */
    FindMonths = function () {
        var days = this.FindDays();

        //Apr 22 - May 22 (30 days)
        if (days < 30) {
            return 0;
        }
        //May 22 - June 22 (31 days)
        if (days < 61) {
            return 1;
        }
        //June 22 - July 22 (30 days)
        if (days < 91) {
            return 2;
        }
        //July 22 - Aug 22 (31 days)
        if (days < 122) {
            return 3;
        }
        //Aug 22 - Sep 22 (31 days)
        if (days < 153) {
            return 4;
        }
        //Sep 22 - Oct 22 (30 days)
        if (days < 183) {
            return 5;
        }
        //Oct 22 - Nov 22 (31 days)
        if (days < 214) {
            return 6;
        }
        //Nov 22 - Dec 22 (30 days)
        if (days < 244) {
            return 7;
        }
        //Dec 22 - Jan 22 (31 days)
        if (days < 275) {
            return 8;
        }
        //Jan 22 - Feb 22 (31 days)
        if (days < 306) {
            return 9;
        }
        //Feb 22 - Mar 22 (28 days)
        if (days < 334) {
            return 10;
        }
        //Mar 22 - Apr 22 (31 days)
        if (days < 365) {
            return 11;
        }

        return -1;
    }


    /**
     * Finds the number of hours
     * */
    FindHours = function () {
        var currentDate = new Date();
        var hours = currentDate.getHours() - 9;
        if (hours < 0) {
            hours += 24;
        }
        //var minutes = (currentDate.getMinutes() - (currentDate.getHours() * 60) / 60);
        var minutes = currentDate.getMinutes() / 60;
        var minText = "";

        if (minutes > 0.375 && minutes < 0.875) {
            minText = ".5";
        }
        else if (minutes > 0.875) {
            hours += 1;
        }

        return "" + hours + minText;
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.highlight} />

                <Text style={styles.title}>Time Since</Text>
                <Text style={styles.title}>April 22, 2017 at 7am PT</Text>

                <Text style={styles.timeText}>{this.FindYears()} Years</Text>
                <Text style={styles.timeText}>{this.FindMonths()} Months</Text>
                <Text style={styles.timeText}>{Math.floor(this.FindDaysOfMonth() / 7)} Weeks</Text>
                <Text style={styles.timeText}>{this.FindDaysOfMonth() % 7} Days</Text>
                <Text style={styles.timeText}>~{this.FindHours()} Hours</Text>
            </View>
        )
    }
}


function FindTime() {
    var currentDate = new Date();
    var waDate = new Date(2017, 4, 22, 9, 0);
    var timeDiff = currentDate.getTime() - waDate.getTime();

    //Converting the miliseconds to days
    var days = timeDiff / (1000 * 60 * 60 * 24);


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
        fontSize: 34,
        color: '#fff',
    },

    highlight: {
        position: 'absolute',
        top: '0%',
        bottom: '55%',
        left: '0%',
        right: '0%',
        backgroundColor: '#34c2de',
        borderBottomColor: '#00d28a',
        borderBottomWidth: 6,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
    }
});