import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const localVideos = [
  {
    _id: '1',
    uri: require('../assets/videos/cpp.mp4'), 
  },
];

export default function Cpp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState({}); 
  const [showQuizButton, setShowQuizButton] = useState(false); // New state for quiz button visibility
  const navigation = useNavigation();
  const videoRefs = useRef({}); 

  const fetchVideos = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handlePlayPause = (videoId) => {
    const currentRef = videoRefs.current[videoId];
    if (currentRef) {
      if (isPlaying[videoId]) {
        currentRef.pauseAsync();
        setIsPlaying((prev) => ({ ...prev, [videoId]: false }));
      } else {
        currentRef.playAsync();
        setIsPlaying((prev) => ({ ...prev, [videoId]: true }));
        setShowQuizButton(false); // Hide quiz button when video is played
      }
    }
  };

  const handlePlaybackStatusUpdate = (status, videoId) => {
    if (status.didJustFinish) {
      setShowQuizButton(true); // Show quiz button when video finishes
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.htmlInfoContainer}>
        <Text style={styles.htmlTitle}>Introduction to C++</Text>
        <Text style={styles.htmlDescription}>
        C++ is a high-level, general-purpose programming language created by Danish computer scientist Bjarne Stroustrup.        
         </Text>
    </View>

      <FlatList
        data={localVideos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.videoItem}>
            <View style={styles.videoContainer}>
              <Video
                ref={(ref) => (videoRefs.current[item._id] = ref)}
                source={item.uri}
                style={styles.videoPlayer}
                shouldPlay={isPlaying[item._id]}
                resizeMode="contain"
                useNativeControls={true}
                onPlaybackStatusUpdate={(status) => handlePlaybackStatusUpdate(status, item._id)} // Track status
              />

              {!isPlaying[item._id] && (
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => handlePlayPause(item._id)}
                >
                  <Icon name="play-circle-outline" size={64} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />

      {/* "Go to Quiz" Button - Render conditionally based on showQuizButton state */}
      {showQuizButton && (
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('CppQuizPage')}
        >
          <Text style={styles.quizButtonText}>Go to Quiz</Text>
        </TouchableOpacity>
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
  htmlInfoContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 5,
    elevation: 2,
  },
  htmlTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  htmlDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  videoItem: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 2,
  },
  videoContainer: {
    position: 'relative',
  },
  videoPlayer: {
    height: 200,
    borderRadius: 5,
  },
  playButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  quizButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
