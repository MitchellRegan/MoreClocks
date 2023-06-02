import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

const unitLength = Dimensions.get('window').width * 0.09;

export default class FibColorClock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showText: false
        };
    }


    /**
     * Returns a hex color string for what color a box should be
     * @param {number} value_ The number value of the box that will be colored
     * @returns {string} The hex code string for the box's color
     */
    FindBGColor = function (value_) {
        var hours = this.props.hour;
        if (hours > 12) {
            hours -= 12;
        }
        var min = Math.floor(this.props.min / 5);
        var fibValues = [5, 3, 2, 1, 0];

        var colorCode = 0;

        for (var i = 0; i < fibValues.length; i++) {
            var fibVal = fibValues[i];
            if (fibVal == 0) {
                fibVal = 1;
            }

            //By default the color code is 0 (white)
            colorCode = 0;
            if (hours > fibVal - 1) {
                hours -= fibVal;
                colorCode += 1;
            }

            if (min > fibVal - 1) {
                min -= fibVal;
                colorCode += 2;
            }

            if (value_ == fibValues[i]) {
                switch (colorCode) {
                    case 1: return '#f00'; //Hours only are red
                    case 2: return '#00f'; //Minutes only are blue
                    case 3: return '#0c0'; //Both hours and minutes are green
                    default: return '#fff'; //Neither hours or minutes is white
                }
            }
        }
    }


    /**
     * Returns a string for the background color image for what color a box should be.
     * @param {number} value_ The number value of the box that will be colored
     * @returns {string} The hex code string for the box's color
     */
    FindBGImage = function (value_) {
        var hours = this.props.hour;
        if (hours > 12) {
            hours -= 12;
        }
        var min = Math.floor(this.props.min / 5);
        var fibValues = [5, 3, 2, 1, 0];

        var colorCode = 0;

        for (var i = 0; i < fibValues.length; i++) {
            var fibVal = fibValues[i];
            if (fibVal == 0) {
                fibVal = 1;
            }

            //By default the color code is 0 (white)
            colorCode = 0;
            if (hours > fibVal - 1) {
                hours -= fibVal;
                colorCode += 1;
            }

            if (min > fibVal - 1) {
                min -= fibVal;
                colorCode += 2;
            }

            if (value_ == fibValues[i]) {
                switch (colorCode) {
                    case 1: return require("../assets/images/red_light.png"); //Hours only are red
                    case 2: return require("../assets/images/blue_light.png"); //Minutes only are blue
                    case 3: return require("../assets/images/green_light.png"); //Both hours and minutes are green
                    default: return require("../assets/images/off_light.png"); //Neither hours or minutes is white
                }
            }
        }
    }


    /**
     * Returns a hex color string for what color one of the edge lines should be
     * @param {number} value_ The number value of the edge line that will be colored
     * @returns {string} The hex code string for the box's color
     */
    FindLineColor = function (value_) {
        var min = this.props.min % 5;

        if (value_ <= min) {
            return '#ffff45';
        }

        return '#000';
    }


    /**
     * Returns an image path string for what color one of the edge lines should be.
     * @param {number} value_ The number value of the edge line that will be colored.
     * @param {boolean} horizontal_ True if this is for a horizontal line, False if this is for a vertical line.
     * @returns {string} The image path string for the box's color.
     */
    FindLineImage = function (value_, horizontal_) {
        var min = this.props.min % 5;

        if (value_ <= min) {
            if (horizontal_) {
                return require("../assets/images/yellow_light_horizontal.png");
            }
            else {
                return require("../assets/images/yellow_light_vertical.png");
            }
        }

        if (horizontal_) {
            return require("../assets/images/off_light_horizontal.png");
        }
        else {
            return require("../assets/images/off_light_vertical.png");
        }
    }


    /**
     * Function called from TouchableOpacity to toggle the state.showText boolean
     * */
    ToggleText = function () {
        this.setState((prevState) => {
            return ({
                showText: !prevState.showText
            });
        });
    }

    
    render() {
        return (
            <View style={styles.wrapper}>
                {/*<View style={[{ backgroundColor: this.FindLineColor(1) }, styles.longMinLine]} />*/}
                <ImageBackground style={styles.longMinLine} source={this.FindLineImage(1, true)} />

                <View style={styles.clockBox}>
                    {/*<View style={[{ backgroundColor: this.FindLineColor(4) }, styles.tallMinLine]} />*/}
                    <ImageBackground style={styles.tallMinLine} source={this.FindLineImage(4, false)} />

                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            {/*===== Top-Left Square =====*/}
                            <ImageBackground
                                style={[{ width: (2 * unitLength), height: (2 * unitLength) }, styles.box]}
                                source={this.FindBGImage(2)}
                                resizeMode='cover'
                            >
                                {(this.state.showText) && <Text style={styles.boxValueText}>2</Text>}
                            </ImageBackground>

                            {/*===== Smallest Squares =====*/}
                            <View>
                                <ImageBackground
                                    style={[{ width: (unitLength), height: (unitLength) }, styles.box]}
                                    source={this.FindBGImage(1)}
                                    resizeMode='cover'
                                >
                                    {(this.state.showText) && <Text style={styles.boxValueText}>1</Text>}
                                </ImageBackground>
                                <ImageBackground
                                    style={[{ width: (unitLength), height: (unitLength) }, styles.box]}
                                    source={this.FindBGImage(1)}
                                    resizeMode='cover'
                                >
                                    {(this.state.showText) && <Text style={styles.boxValueText}>1</Text>}
                                </ImageBackground>
                            </View>
                        </View>

                        {/*===== Bottom-Left Square =====*/}
                        <ImageBackground
                            style={[{ width: (3 * unitLength), height: (3 * unitLength) }, styles.box]}
                            source={this.FindBGImage(3)}
                            resizeMode='cover'
                        >
                            {(this.state.showText) && <Text style={styles.boxValueText}>3</Text>}
                        </ImageBackground>
                    </View>

                    {/*===== Biggest Square =====*/}
                    <ImageBackground
                        style={[{ width: (5 * unitLength), height: (5 * unitLength) }, styles.box]}
                        source={this.FindBGImage(5)}
                        resizeMode='cover'
                    >
                        {(this.state.showText) && <Text style={styles.boxValueText}>5</Text>}
                    </ImageBackground>

                    {/*<View style={[{ backgroundColor: this.FindLineColor(2) }, styles.tallMinLine]} />*/}
                    <ImageBackground style={styles.tallMinLine} source={this.FindLineImage(2, false)}/>
                </View>

                {/*<View style={[{ backgroundColor: this.FindLineColor(3) }, styles.longMinLine]} />*/}
                <ImageBackground style={styles.longMinLine} source={this.FindLineImage(3, true)} />


                {/* ====== Instruction Text ====== */}
                {(!this.state.showText) && <TouchableOpacity style={styles.button} onPress={() => this.ToggleText()}>
                    <Text style={styles.buttonText}>[Show Instructions]</Text>
                </TouchableOpacity>}

                {(this.state.showText) && <TouchableOpacity style={styles.button} onPress={() => this.ToggleText()}>
                    <Text style={styles.buttonText}>[Hide Instructions]</Text>
                </TouchableOpacity>}

                {(this.state.showText) && <View>
                    <Text style={styles.helpText}>How to read this clock:</Text>
                    <Text style={styles.helpText}>Hours = Red + Green</Text>
                    <Text style={styles.helpText}>Minutes = (Blue + Green x 5) + Yellow</Text>
                    <Text style={styles.helpTextSmall}>(Note: Each yellow bar = 1 Minute)</Text>
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {

    },

    longMinLine: {
        borderColor: '#000',
        //borderWidth: 1,
        height: 8,
        shadowColor: 'rgba(0, 0, 0, 0.75)',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 10
    },

    tallMinLine: {
        borderColor: '#000',
        //borderWidth: 1,
        width: 8,
        shadowColor: 'rgba(0, 0, 0, 0.75)',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 10
    },

    clockBox: {
        flexDirection: 'row',
        shadowColor: 'rgba(0, 0, 0, 0.75)',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 10
    },

    box: {
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
    },

    boxValueText: {
        fontFamily: 'serif',
        color: '#888',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
    },

    helpText: {
        fontFamily: 'serif',
        color: '#fff',
        fontSize: 14,
        alignSelf: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    helpTextSmall: {
        fontFamily: 'serif',
        color: '#fff',
        fontSize: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    button: {
        backgroundColor: 'rgb(166,166,166, 0.6)',
        alignSelf: 'center',
        margin: 20,
    },

    buttonText: {
        fontFamily: 'serif',
        color: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 'bold',
        fontSize: 18,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    }
})