import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
  {
    id: '1',
    question: 'What is C++ primarily used for?',
    options: ['Web Development', 'Game Development', 'Machine Learning', 'Mobile Development'],
    correctAnswer: 'Game Development',
  },
  {
    id: '2',
    question: 'Which of the following is a feature of C++?',
    options: ['Object-Oriented Programming', 'Functional Programming', 'Procedural Programming', 'All of the above'],
    correctAnswer: 'All of the above',
  },
  {
    id: '3',
    question: 'What is the correct way to declare a function in C++?',
    options: ['void functionName()', 'functionName(): void', 'def functionName()', 'function functionName()'],
    correctAnswer: 'void functionName()',
  },
  {
    id: '4',
    question: 'Which of the following is a standard library in C++?',
    options: ['iostream', 'stdio', 'stdlib', 'All of the above'],
    correctAnswer: 'All of the above',
  },
  {
    id: '5',
    question: 'What is the output of `cout << 5 + 2;` in C++?',
    options: ['7', '52', '5 + 2', 'Error'],
    correctAnswer: '7',
  },
  {
    id: '6',
    question: 'What keyword is used to create a class in C++?',
    options: ['class', 'struct', 'object', 'define'],
    correctAnswer: 'class',
  },
  {
    id: '7',
    question: 'Which operator is used to access members of a class in C++?',
    options: ['->', '.', '::', '::[]'],
    correctAnswer: '.',
  },
  {
    id: '8',
    question: 'What is the purpose of the `new` keyword in C++?',
    options: ['To create a new variable', 'To allocate memory', 'To initialize an object', 'To define a function'],
    correctAnswer: 'To allocate memory',
  },
  {
    id: '9',
    question: 'Which of the following is a valid comment in C++?',
    options: ['// This is a comment', '/* This is a comment */', '# This is a comment', 'Both A and B'],
    correctAnswer: 'Both A and B',
  },
  {
    id: '10',
    question: 'What is the main function in C++?',
    options: ['void main()', 'int main()', 'main()', 'Both A and B'],
    correctAnswer: 'int main()',
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
      <Text style={styles.quizTitle}>C++ Quiz</Text>
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
                onPress={() => navigation.navigate('CppCertificatePage', { score, result: 'Pass' })}
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
