import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './misc/TextButton'

class SingleDeck extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params

        return {
            title: `${deckId} - Deck`
        }
    }

    navigate = (page) => {
        const { navigation } = this.props;
        const { deckId } = navigation.state.params;

        navigation.navigate(
            page,
            { deckId }
        );
    }

    render() {
        const { deck } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {deck.title}
                </Text>
                <Text>
                    {deck.questions.length} cards
                </Text>
                <TextButton onPress={() => this.navigate('AddCard')}>
                    Add Card
                </TextButton>
                <TextButton onPress={() => this.navigate('Quiz')}>
                    Start Quiz
                </TextButton>
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
    }
});

const mapStateToProps = (state, { navigation }) => {
    const { deckId } = navigation.state.params;

    return {
        deckId,
        deck: state[deckId]
    };
}

export default connect(mapStateToProps)(SingleDeck);