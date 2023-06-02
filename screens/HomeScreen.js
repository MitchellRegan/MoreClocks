import React, {Component} from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';

//Components
import FaceClock from '../components/FaceClock';
import TwelveHourClock from '../components/TwelveHourClock';
import MetricClock from '../components/MetricClock';
import MilitaryClock from '../components/MilitaryClock';
import CountdownClock from '../components/CountdownClock';
import BinaryClock from '../components/BinaryClock';
import WeekdayClock from '../components/WeekdayClock';
import SegmentedClock from '../components/SegmentedFaceClock';
import FibonacciClock from '../components/FibonacciClock';
import FibColorClock from '../components/FibColorClock';

//SVG Icons
import FourClocksOn from '../assets/icons/four_clocks_on.svg';
import FourClocksOff from '../assets/icons/four_clocks_off.svg';
import FaceOn from '../assets/icons/face_on.svg';
import FaceOff from '../assets/icons/face_off.svg';
import SegmentedOn from '../assets/icons/segmented_on.svg';
import SegmentedOff from '../assets/icons/segmented_off.svg';
import WeekOn from '../assets/icons/week_on.svg';
import WeekOff from '../assets/icons/week_off.svg';
import BinaryOn from '../assets/icons/binary_on.svg';
import BinaryOff from '../assets/icons/binary_off.svg';
import FibSpiralOn from '../assets/icons/fib_spiral_on.svg';
import FibSpiralOff from '../assets/icons/fib_spiral_off.svg';
import FibColorOn from '../assets/icons/fib_color_on.svg';
import FibColorOff from '../assets/icons/fib_color_off.svg';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clockShown: 0,
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


    //Function to change which clock is currently being displayed
    ShowClock = function (clockID_) {
        this.setState((prevState) => {
            return ({
                ...prevState,
                clockShown: clockID_
            });
        });
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <ImageBackground
                    style={styles.bgImage}
                    source={require("../assets/images/moreClocks_bg_green.png")}
                    resizeMode='cover'
                >
                    <Text style={styles.whyText}>Too  Many</Text>
                    <Text style={styles.whyTextBig}>CLOCKS       </Text>
                    <Text style={styles.pointlessText}>A Pointless App by Mitch Regan</Text>


                    {(this.state.clockShown == 0) && <View style={styles.swipeView}>
                        <TwelveHourClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                        <MilitaryClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                        <CountdownClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                        <MetricClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>}

                    {(this.state.clockShown == 1) && <View style={styles.swipeView}>
                        <Text style={styles.title}>Face Clock</Text>
                        <FaceClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>}

                    {(this.state.clockShown == 2) && <View style={styles.swipeView}>
                        <Text style={styles.title}>Weekday Clock</Text>
                        <WeekdayClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>}

                    {(this.state.clockShown == 3) && <View style={styles.swipeView}>
                        <Text style={styles.title}>Segmented Clock</Text>
                        <SegmentedClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>}

                    {(this.state.clockShown == 4) && <View style={styles.swipeView}>
                        <Text style={styles.title}>Binary Clock</Text>
                        <BinaryClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>}

                    {(this.state.clockShown == 5) && <View style={styles.swipeView}>
                        <Text style={styles.title}>Fibonacci Spiral Clock</Text>
                        <FibonacciClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>}

                    {(this.state.clockShown == 6) && <View style={styles.swipeView}>
                        <Text style={styles.title}>Fibonacci Color Clock</Text>
                        <FibColorClock hour={this.state.hour} min={this.state.min} sec={this.state.sec} />
                    </View>}

                    {/* Buttons for toggling which clock is displayed */}
                    <View style={styles.displayButtonRow}>
                        {(this.state.clockShown == 0) && <FourClocksOn style={styles.displayButton} width={55} height={55} />}
                        {(this.state.clockShown != 0) && <TouchableOpacity onPress={() => this.ShowClock(0)}>
                            <FourClocksOff style={styles.displayButton} width={40} height={40} />
                        </TouchableOpacity>}

                        {(this.state.clockShown == 1) && <FaceOn style={styles.displayButton} width={55} height={55} />}
                        {(this.state.clockShown != 1) && <TouchableOpacity onPress={() => this.ShowClock(1)}>
                            <FaceOff style={styles.displayButton} width={40} height={40} />
                        </TouchableOpacity>}

                        {(this.state.clockShown == 2) && <WeekOn style={styles.displayButton} width={55} height={55} />}
                        {(this.state.clockShown != 2) && <TouchableOpacity onPress={() => this.ShowClock(2)}>
                            <WeekOff style={styles.displayButton} width={40} height={40} />
                        </TouchableOpacity>}

                        {(this.state.clockShown == 3) && <SegmentedOn style={styles.displayButton} width={55} height={55} />}
                        {(this.state.clockShown != 3) && <TouchableOpacity onPress={() => this.ShowClock(3)}>
                            <SegmentedOff style={styles.displayButton} width={40} height={40} />
                        </TouchableOpacity>}

                        {(this.state.clockShown == 4) && <BinaryOn style={styles.displayButton} width={55} height={55} />}
                        {(this.state.clockShown != 4) && <TouchableOpacity onPress={() => this.ShowClock(4)}>
                            <BinaryOff style={styles.displayButton} width={40} height={40} />
                        </TouchableOpacity>}

                        {(this.state.clockShown == 5) && <FibSpiralOn style={styles.displayButton} width={55} height={55} />}
                        {(this.state.clockShown != 5) && <TouchableOpacity onPress={() => this.ShowClock(5)}>
                            <FibSpiralOff style={styles.displayButton} width={40} height={40} />
                        </TouchableOpacity>}

                        {(this.state.clockShown == 6) && <FibColorOn style={styles.displayButton} width={55} height={55} />}
                        {(this.state.clockShown != 6) && <TouchableOpacity onPress={() => this.ShowClock(6)}>
                            <FibColorOff style={styles.displayButton} width={40} height={40} />
                        </TouchableOpacity>}
                    </View>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: '#2b5197',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    bgImage: {
        flex: 1,
        width: '100%'
    },

    whyText: {
        fontFamily: 'serif',
        fontSize: 20,
        color: '#fff',
        marginTop: 20,
        marginBottom: -10,
        marginLeft: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    whyTextBig: {
        fontFamily: 'serif',
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 15,
        textDecorationLine: 'underline',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    pointlessText: {
        fontFamily: 'serif',
        fontSize: 14,
        color: '#fff',
        marginTop: -5,
        marginBottom: 20,
        marginLeft: 22,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    title: {
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    swipeView: {
        alignItems: 'center',
        backgroundColor: 'rgba(166,166,166,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        paddingTop: 10,
        paddingBottom: 10,
        width: '90%',
        marginTop: 20,
        alignSelf: 'center'
    },

    displayButtonRow: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    }
});