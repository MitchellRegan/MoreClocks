import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

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
                    case 3: return '#0f0'; //Both hours and minutes are green
                    default: return '#fff'; //Neither hours or minutes is white
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
                <View style={[{backgroundColor: this.FindLineColor(1)}, styles.longMinLine]} />

                <View style={styles.clockBox}>
                    <View style={[{ backgroundColor: this.FindLineColor(4) }, styles.tallMinLine]} />

                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[{ backgroundColor: this.FindBGColor(2), width: (2 * unitLength), height: (2 * unitLength) }, styles.box]}>
                                {(this.state.showText) && <Text style={styles.boxValueText}>2</Text>}
                            </View>

                            <View>
                                <View style={[{ backgroundColor: this.FindBGColor(1), width: (unitLength), height: (unitLength) }, styles.box]}>
                                    {(this.state.showText) && <Text style={styles.boxValueText}>1</Text>}
                                </View>
                                <View style={[{ backgroundColor: this.FindBGColor(0), width: (unitLength), height: (unitLength) }, styles.box]}>
                                    {(this.state.showText) && <Text style={styles.boxValueText}>1</Text>}
                                </View>
                            </View>
                        </View>

                        <View style={[{ backgroundColor: this.FindBGColor(3), width: (3 * unitLength), height: (3 * unitLength) }, styles.box]}>
                            {(this.state.showText) && <Text style={styles.boxValueText}>3</Text>}
                        </View>
                    </View>

                    <View style={[{ backgroundColor: this.FindBGColor(5), width: (5 * unitLength), height: (5 * unitLength) }, styles.box]}>
                        {(this.state.showText) && <Text style={styles.boxValueText}>5</Text>}
                    </View>

                    <View style={[{ backgroundColor: this.FindLineColor(2) }, styles.tallMinLine]} />
                </View>

                <View style={[{ backgroundColor: this.FindLineColor(3) }, styles.longMinLine]} />

                {(!this.state.showText) && <TouchableOpacity style={styles.button} onPress={() => this.ToggleText()}>
                    <Text style={styles.buttonText}>Show Instructions</Text>
                </TouchableOpacity>}

                {(this.state.showText) && <TouchableOpacity style={styles.button} onPress={() => this.ToggleText()}>
                    <Text style={styles.buttonText}>Hide Instructions</Text>
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
        borderWidth: 1,
        height: 8,
    },

    tallMinLine: {
        borderColor: '#000',
        borderWidth: 1,
        width: 8,
    },

    clockBox: {
        flexDirection: 'row',
    },

    box: {
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
    },

    boxValueText: {
        color: '#888',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
    },

    helpText: {
        color: '#fff',
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: 'bold',
    },

    helpTextSmall: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center',
        fontWeight: 'bold',
    },

    button: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        margin: 20,
    },

    buttonText: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 'bold',
        fontSize: 20
    }
})