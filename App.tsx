
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AudioService } from './services';
import { useRecording } from './hooks';



export default function App() {
  const { recording, startRecording, stopRecording} = useRecording();
  const showPlaybutton = useMemo(() => !!recording?.uri && !recording.isRecording, [recording]);

  async function playSound() {
    if(recording) {
      
      await AudioService.playAudio(recording.uri);
    }
  }


  return (
    <View style={styles.container}>
      <Button
        title={recording?.isRecording ? "Stop Recording" : "Start Recording"}
        onPress={recording?.isRecording ? stopRecording : startRecording}
      />
      <Text>Duration: {recording?.duration}</Text>

      {showPlaybutton && <Button title="Play Sound" onPress={playSound} />}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
