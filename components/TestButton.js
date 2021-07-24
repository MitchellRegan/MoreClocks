import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const TestButton = props => {
    const [state, updateState] = useState(
        {
            counter: 0
        }
    );


    function UpdateCounter() {
        updateState({
            counter: state.counter + 1
        });
    }


    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.button} onPress={() => UpdateCounter()}>
                <Text>Current Count: {state.counter}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 20
    },

    button: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 15,
    },
})

export default TestButton;