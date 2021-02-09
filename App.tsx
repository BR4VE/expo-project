
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useRecorder, usePlayer } from './hooks';
import { PlayerAudioInterface } from './interfaces';




export default function App() {
  const { recording, startRecording, stopRecording} = useRecorder();
  const { playAudio, stopAudio, setAudios } = usePlayer();
  const showPlaybutton = useMemo(() => !!recording?.uri && !recording.isRecording, [recording]);

  useEffect(() => {
    if(!recording?.uri) return;
    const { id, uri } = recording;
    const audioFile: PlayerAudioInterface = { id, uri };
    setAudios([audioFile])
  }, [recording?.uri])

  function play() {
    if(!recording) return;
    playAudio(recording.id)
  }


  return (
    <View style={styles.container}>
      <Button
        title={recording?.isRecording ? "Stop Recording" : "Start Recording"}
        onPress={recording?.isRecording ? stopRecording : startRecording}
      />
      <Text>Duration: {recording?.duration}</Text>

      {showPlaybutton && <Button title="Play Sound" onPress={play} />}


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
