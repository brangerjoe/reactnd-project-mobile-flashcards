import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './misc/TextButton';
import { red, green, gray } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../App';

class QuizView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { deckId } = navigation.state.params

        return {
            title: `${deckId} - Quiz`
        }
    }

    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification)
    }

    state = {
        current: 0,
        points: 0,
        show: 'question'
    }

    nextQuestion = (questionWasCorrect) => {
        this.setState((prevState) => {
            return {
                current: prevState.current + 1,
                points: questionWasCorrect ? prevState.points + 1 : prevState.points
            };
        });
    }

    flipCard = () => {
        this.setState((prevState) => {
            return {
                show: prevState.show === 'question' ? 'answer' : 'question'
            }
        })
    }

    render() {
        const { deck } = this.props;
        const { current, points, show } = this.state;
        const questionAmount = deck.questions.length;

        if (questionAmount === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        This deck has no questions.
                    </Text>
                </View>
            )
        }
        else if (current >= questionAmount) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        All done!
                    </Text>
                    <Text style={styles.subtitle}>
                        You got {points} question(s) right, and {questionAmount - points} wrong. Good job maybe!
                    </Text>
                    <View style={styles.element}>
                        <TextButton onPress={() => {
                            this.setState({
                                current: 0,
                                points: 0,
                                show: 'question'
                            })
                        }}>
                            Reset Quiz
                        </TextButton>
                        <TextButton onPress={() => this.props.navigation.goBack()}>
                            Back to Deck
                        </TextButton>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {show === 'question'
                        ? deck.questions[current].question
                        : deck.questions[current].answer}
                </Text>
                <Text>Question {current + 1} of {questionAmount}</Text>
                <TextButton onPress={this.flipCard}>
                    View {show === 'question' ? 'Answer' : 'Question'}
                </TextButton>
                <View style={styles.element}>
                    <TextButton style={{ backgroundColor: green }} onPress={() => this.nextQuestion(true)}>
                        Correct
                    </TextButton>
                    <TextButton style={{ backgroundColor: red }} onPress={() => this.nextQuestion(false)}>
                        Incorrect
                    </TextButton>
                </View>
            </View>
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
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        color: gray
    }
});

const mapStateToProps = (state, { navigation }) => {
    const { deckId } = navigation.state.params

    return {
        deckId,
        deck: state[deckId]
    }
}

export default connect(mapStateToProps)(QuizView);