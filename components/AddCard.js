import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { saveCard } from '../utils/api';

import TextButton from './misc/TextButton';

class AddCard extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params

        return {
            title: `${deckId} - Add Card`
        }
    }

    state = {
        question: '',
        answer: ''
    }

    handleSubmit = () => {
        const { question, answer } = this.state;
        const { dispatch, deckId, navigation } = this.props;

        if (question === '' || answer === '') {
            alert('Please fill out all the fields!');
            return;
        }

        const card = {
            question,
            answer
        }

        dispatch(addCard(deckId, card));

        saveCard(deckId, card)
            .then(() => {
                navigation.navigate(
                    'Deck',
                    { deckId }
                );
            })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.element}>
                    <Text style={styles.title}>
                        Question
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(question) => this.setState({ question })}
                    />
                </View>
                <View style={styles.element}>
                    <Text style={styles.title}>
                        Answer
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(answer) => this.setState({ answer })}
                    />
                </View>
                <TextButton onPress={this.handleSubmit}>
                    Submit
                </TextButton>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginBottom: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    element: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    textInput: {
        marginTop: 20,
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
        padding: 5
    },
});

const mapStateToProps = (state, { navigation }) => {
    const { deckId } = navigation.state.params;

    return {
        deckId,
        deck: state[deckId]
    };
}

export default connect(mapStateToProps)(AddCard);