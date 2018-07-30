import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { blue, white } from '../../utils/colors'

export default function TextButton({ onPress, children, style = {} }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: white
    },
    button: {
        marginTop: 10,
        padding: 20,
        width: '100%',
        backgroundColor: blue,
        borderRadius: 8
    }
})