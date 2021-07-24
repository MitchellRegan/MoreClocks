import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

//Components
import FaceClock from '../components/FaceClock';
import TwelveHourClock from '../components/TwelveHourClock';
import MetricClock from '../components/MetricClock';
import MilitaryClock from '../components/MilitaryClock';
import CountdownClock from '../components/CountdownClock';
import WashingtonClock from '../components/WashingtonClock';
import BinaryClock from '../components/BinaryClock';
import WeekdayClock from '../components/WeekdayClock';
import SegmentedClock from '../components/SegmentedFaceClock';
import FibonacciClock from '../components/FibonacciClock';
import FibColorClock from '../components/FibColorClock';
import MattFreedomClock from '../components/MattFreedomClock';
import TestButton from '../components/TestButton';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHidden: false,
            hour: 0,
            min: 0,
            sec: 0,
        };
    }


    //Sets the 1s time interval to update the state to the current time
    componentDidMount() {
        this.interval = setInterval(() => (this.SetStateTime()), 1000);
        //this.interval = setInterval(() => (this.setState(UpdateTime())), 1000);
    }


    //Clears the interval to prevent memory leaks
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    SetStateTime = function () {
        var time = new Date();
        
        this.setState((prevState) => {
            return ({
                ...prevState,
                hour: time.getHours(),
                min: time.getMinutes(),
                sec: time.getSeconds()
            });
        });
    }


    ToggleHidden = function () {
        this.setState((prevState) => {
            return ({
                ...prevState,
                showHidden: !this.state.showHidden
            });
        });
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => this.ToggleHidden()}>
                    <Text style={styles.whyText}>Many Clocks</Text>
                </TouchableOpacity>

                {/*(!this.state.showHidden) && <FaceClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />}
                {(!this.state.showHidden) && <TwelveHourClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />}
                {(!this.state.showHidden) && <MilitaryClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />}
                {(!this.state.showHidden) && <MetricClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />}
                {(!this.state.showHidden) && <CountdownClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />}

                {(this.state.showHidden) && <WashingtonClock />*/}

                <Swiper style={styles.swiper} showsButtons={true}>
                    <View style={styles.swipeView}>
                        <TwelveHourClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                        <MilitaryClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                        <CountdownClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                        <MetricClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>

                    <View style={styles.swipeView}>
                        <Text style={styles.title}>Face Clock</Text>
                        <FaceClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>

                    <View style={styles.swipeView}>
                        <Text style={styles.title}>Weekday Clock</Text>
                        <WeekdayClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>

                    <View style={styles.swipeView}>
                        <Text style={styles.title}>Segmented Clock</Text>
                        <SegmentedClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>

                    <View style={styles.swipeView}>
                        <BinaryClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>

                    <View style={styles.swipeView}>
                        <Text style={styles.title}>Fibonacci Spiral Clock</Text>
                        <FibonacciClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>

                    <View style={styles.swipeView}>
                        <Text style={styles.title}>Fibonacci Color Clock</Text>
                        <FibColorClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>

                    <View style={styles.swipeView}>
                        <Text style={styles.title}>Matt's Freedom Clock</Text>
                        <MattFreedomClock hour={this.state.hour} min={this.state.min} sec={this.state.sec}/>
                    </View>

                    {(this.state.showHidden) && <View style={styles.swipeView}>
                        <Text style={styles.title}>My Psychosis Clock</Text>
                        <WashingtonClock width={200}/>
                    </View>}
                </Swiper>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: '#2b5197',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    whyText: {
        fontFamily: 'serif',
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 40,
        marginBottom: 40,
    },

    title: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
    },

    swiper: {

    },

    swipeView: {
        alignItems: 'center',
    }
});