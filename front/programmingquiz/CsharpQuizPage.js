import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
  {
    id: '1',
    question: 'What is the correct way to declare a variable in C#?',
    options: ['int x = 5;', 'int: x = 5;', 'int x == 5;', 'int x = 5;'],
    correctAnswer: 'int x = 5;',
  },
  {
    id: '2',
    question: 'Which of the following is a valid C# data type?',
    options: ['String', 'int', 'float', 'All of the above'],
    correctAnswer: 'All of the above',
  },
  {
    id: '3',
    question: 'What keyword is used to create a class in C#?',
    options: ['class', 'create', 'new', 'def'],
    correctAnswer: 'class',
  },
  {
    id: '4',
    question: 'Which operator is used for concatenating strings in C#?',
    options: ['+', '&', '||', 'concat'],
    correctAnswer: '+',
  },
  {
    id: '5',
    question: 'What is the purpose of the `using` directive in C#?',
    options: ['To include namespaces', 'To declare variables', 'To create classes', 'To define methods'],
    correctAnswer: 'To include namespaces',
  },
  {
    id: '6',
    question: 'Which of the following is the correct syntax for a foreach loop in C#?',
    options: ['foreach (var item in collection)', 'for each (var item in collection)', 'foreach (item in collection)', 'for each (item in collection)'],
    correctAnswer: 'foreach (var item in collection)',
  },
  {
    id: '7',
    question: 'What does the `static` keyword indicate in C#?',
    options: ['The method belongs to the class rather than instances', 'The variable cannot be changed', 'The method is asynchronous', 'None of the above'],
    correctAnswer: 'The method belongs to the class rather than instances',
  },
  {
    id: '8',
    question: 'Which of the following is used to handle exceptions in C#?',
    options: ['catch', 'try-catch', 'error', 'All of the above'],
    correctAnswer: 'try-catch',
  },
  {
    id: '9',
    question: 'What is the output of the following code: `Console.WriteLine(10 + 5);`?',
    options: ['15', '10 + 5', 'Error', 'None of the above'],
    correctAnswer: '15',
  },
  {
    id: '10',
    question: 'Which method is used to start a thread in C#?',
    options: ['Start()', 'Run()', 'Execute()', 'Begin()'],
    correctAnswer: 'Start()',
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
      <Text style={styles.quizTitle}>C# Quiz</Text>
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
                onPress={() => navigation.navigate('CsharpCertificatePage', { score, result: 'Pass' })}
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
