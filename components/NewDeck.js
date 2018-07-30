import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { saveDeck, getDecks } from '../utils/api';

import TextButton from './misc/TextButton';

class NewDeck extends React.Component {
    state = {
        input: ''
    }

    handleSubmit = () => {
        const { input } = this.state;
        const { navigation, dispatch } = this.props;

        const obj = {
            title: input,
            questions: []
        }

        dispatch(addDeck({
            [input]: obj
        }));

        this.setState({
            input: ''
        })

        saveDeck(input, obj)
            .then(() => navigation.navigate(
                'Deck',
                { deckId: input }
            ));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Enter Title
                </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(input) => this.setState({ input })}
                />

                <TextButton onPress={this.handleSubmit}>
                    Submit
                </TextButton>

                {/* <TextButton onPress={() => {
                    getDecks()
                        .then((data) => alert(data))
                }}>
                    Fetch Data
                    </TextButton>
                <TextButton onPress={() => {
                    alert(JSON.stringify(this.props.store))
                }}>
                    Fetch Store
                    </TextButton> */}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    textInput: {
        marginTop: 20,
        height: 60,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        width: '100%'
    },
});

const mapStateToProps = (state) => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(NewDeck);