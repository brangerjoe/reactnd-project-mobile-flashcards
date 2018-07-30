import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';

class DeckList extends React.Component {
    state = {
        ready: false,
        bounceValue: new Animated.Value(1)
    }

    componentDidMount() {
        const { dispatch } = this.props;

        getDecks()
            .then((decks) => dispatch(receiveDecks(JSON.parse(decks))))
            .then(() => this.setState({ ready: true }));
    }

    navigate = (key) => {
        const { navigation } = this.props;
        const { bounceValue } = this.state;

        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 2 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4 })
        ]).start()

        navigation.navigate(
            'Deck',
            { deckId: key }
        );
    }

    render() {
        const { decks } = this.props;
        const { ready } = this.state;

        if (!ready) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        } else if (Object.keys(decks).length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>There are no decks. Why not create one?</Text>
                </View>
            )
        }


        return (
            <ScrollView>
                {Object.keys(decks).map((key) => {
                    const deck = decks[key];

                    return (
                        <View key={key}>
                            <TouchableOpacity style={styles.deck} onPress={() => this.navigate(key)}>
                                <Animated.Text style={[styles.title, { transform: [{ scale: this.state.bounceValue }] }]}>{deck.title}</Animated.Text>
                                <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    deck: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,
        color: '#444'

    }
});

const mapStateToProps = (decks) => {
    return {
        decks
    };
};

export default connect(mapStateToProps)(DeckList);