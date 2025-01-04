import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
  {
    id: '1',
    question: 'What is the correct syntax for including a header file in C?',
    options: ['#include <header>', '#include "header"', '#include <header.h>', 'All of the above'],
    correctAnswer: '#include <header.h>',
  },
  {
    id: '2',
    question: 'Which of the following is not a valid data type in C?',
    options: ['int', 'float', 'char', 'real'],
    correctAnswer: 'real',
  },
  {
    id: '3',
    question: 'What is the correct way to declare a function in C?',
    options: ['void function_name()', 'function_name() void', 'function_name() : void', 'void function_name;'],
    correctAnswer: 'void function_name()',
  },
  {
    id: '4',
    question: 'What does the `printf` function do in C?',
    options: ['Reads input from the user', 'Prints output to the console', 'Allocates memory', 'Returns a value'],
    correctAnswer: 'Prints output to the console',
  },
  {
    id: '5',
    question: 'What is the size of an `int` in C?',
    options: ['2 bytes', '4 bytes', '8 bytes', 'Depends on the system'],
    correctAnswer: 'Depends on the system',
  },
  {
    id: '6',
    question: 'Which operator is used to access a structure member in C?',
    options: ['->', '.', ':', '#'],
    correctAnswer: '.',
  },
  {
    id: '7',
    question: 'What will the following code print: `printf("%d", 5 + 2);`?',
    options: ['7', '5 + 2', 'Error', 'None of the above'],
    correctAnswer: '7',
  },
  {
    id: '8',
    question: 'Which of the following is a correct loop construct in C?',
    options: ['for loop', 'while loop', 'do-while loop', 'All of the above'],
    correctAnswer: 'All of the above',
  },
  {
    id: '9',
    question: 'What is the purpose of the `return` statement in a function?',
    options: ['To exit the function', 'To return a value to the caller', 'Both A and B', 'None of the above'],
    correctAnswer: 'Both A and B',
  },
  {
    id: '10',
    question: 'What does the `malloc` function do in C?',
    options: ['Allocates memory', 'Frees memory', 'Reallocates memory', 'None of the above'],
    correctAnswer: 'Allocates memory',
  },
];

export default function QuizPage({ navigation }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const getOptionStyle = (questionId, option) => {
    const isSelected = selectedAnswers[questionId] === option;
    const isCorrect = option === questions.find(q => q.id === questionId).correctAnswer;

    // Show correct answer when submitted
    if (score !== null) {
      if (isCorrect) return styles.correctOption; // Correct answer styling
      if (isSelected && !isCorrect) return styles.wrongOption; // Wrong answer styling
    }

    // Change selected option color
    if (isSelected) return styles.selectedOption; // Light blue for selected option

    // Default styling
    return styles.optionButton;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quizTitle}>C Quiz</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            {item.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={getOptionStyle(item.id, option)}
                onPress={() => handleOptionSelect(item.id, option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      {score === null ? (
        <Button title="Submit Quiz" onPress={calculateScore} />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.scoreText}>Your Score: {score}/{questions.length}</Text>
          {score >= 7 ? (
            <>
              <Text style={styles.passText}>Congratulations, you passed!</Text>
              <Button
                title="Get Certificate"
                onPress={() => navigation.navigate('CCertificatePage', { score, result: 'Pass' })}
              />
            </>
          ) : (
            <Text style={styles.failText}>You failed, better luck next time!</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c6dff7',
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  correctOption: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#d0f0d0', // Light green for correct answers
  },
  wrongOption: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f0d0d0', // Light red for incorrect answers
  },
  selectedOption: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#add8e6', // Light blue for selected option
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  passText: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
  },
  failText: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
});
