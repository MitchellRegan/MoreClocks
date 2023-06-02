import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class BinaryClock extends Component {
    constructor(props) {
        super(props);
    }


    /**
     * 
     * @param {any} numberToCheck_ The number to convert to binary
     */
    BinaryCheck = function (numberToCheck_) {
        //Boolean values for the positions of each bit in this number
        var bits = {
            one: false,
            two: false,
            four: false,
            eight: false,
            sixteen: false,
            thirtyTwo: false,
        }

        var num = numberToCheck_;
        if (num >= 32) {
            bits.thirtyTwo = true;
            num -= 32;
        }
        if (num >= 16) {
            bits.sixteen = true;
            num -= 16;
        }
        if (num >= 8) {
            bits.eight = true;
            num -= 8;
        }
        if (num >= 4) {
            bits.four = true;
            num -= 4;
        }
        if (num >= 2) {
            bits.two = true;
            num -= 2;
        }
        if (num > 0) {
            bits.one = true;
        }


        return (
            <View style={styles.bitGroup}>
                <Text style={styles.timeText}>{numberToCheck_}</Text>

                <View style={bits.one ? styles.bitOn : styles.bitOff} />
                <View style={bits.two ? styles.bitOn : styles.bitOff} />
                <View style={bits.four ? styles.bitOn : styles.bitOff} />
                <View style={bits.eight ? styles.bitOn : styles.bitOff} />
                <View style={bits.sixteen ? styles.bitOn : styles.bitOff} />
                <View style={bits.thirtyTwo ? styles.bitOn : styles.bitOff} />
            </View>
        );
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.bitView}>
                    <View style={styles.bitTextView}>
                        <Text style={styles.bitText}>1 --</Text>
                        <Text style={styles.bitText}>2 --</Text>
                        <Text style={styles.bitText}>4 --</Text>
                        <Text style={styles.bitText}>8 --</Text>
                        <Text style={styles.bitText}>16 -</Text>
                        <Text style={styles.bitText}>32 -</Text>
                    </View>

                    {this.BinaryCheck(this.props.hour)}
                    <View style={styles.verticalBar}/>
                    {this.BinaryCheck(this.props.min)}
                    <View style={styles.verticalBar} />
                    {this.BinaryCheck(this.props.sec)}

                    <View style={styles.bitTextView}>
                        <Text style={styles.bitText}>-- 1</Text>
                        <Text style={styles.bitText}>-- 2</Text>
                        <Text style={styles.bitText}>-- 4</Text>
                        <Text style={styles.bitText}>-- 8</Text>
                        <Text style={styles.bitText}>- 16</Text>
                        <Text style={styles.bitText}>- 32</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        width: '75%',
        margin: 5,
        padding: 10,
        alignItems: 'center',
    },

    bitView: {
        flexDirection: 'row'
    },

    bitTextView: {
        paddingTop: 27,
        alignItems: 'center'
    },

    bitGroup: {
        alignItems: 'center',
        width: '30%',
    },

    bitOn: {
        width: '60%',
        height: 30,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#fff'
    },

    bitOff: {
        width: '60%',
        height: 30,
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#000'
    },

    timeText: {
        width: 50,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'serif',
        fontSize: 16,
        textAlign: 'center',
        marginRight: 5,
        textAlignVertical: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    bitText: {
        height: 30,
        margin: 5,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'serif',
        fontSize: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10
    },

    verticalBar: {
        height: '90%',
        width: 1,
        backgroundColor: '#fff',
        alignSelf: 'center',
    }
})