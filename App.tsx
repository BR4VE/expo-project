
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useRecorder, usePlayer } from './hooks';
import { PlayerAudioInterface } from './interfaces';
import { useForm } from "react-hook-form";
import { createPost } from './requests';

export default function App() {
  const { recording, startRecording, stopRecording} = useRecorder();
  const { playAudio, stopAudio, setAudios } = usePlayer();
  const { register, handleSubmit, setValue } = useForm();
  const recordingFinished = useMemo(() => !!recording?.uri && !recording.isRecording, [recording]);

  
  function play() {
    if(!recording) return;
    playAudio(recording.id)
  }

  async function handlePostCreation(formData: any) {
    const { title } = formData;
    try {
      const res = await createPost(title, recording);
    } catch(err) {
      console.log(err);
    }
    
  }

  useEffect(() => {
    if(!recording?.uri) return;
    const { id, uri } = recording;
    const audioFile: PlayerAudioInterface = { id, uri };
    setAudios([audioFile])
  }, [recording?.uri])

  useEffect(() => {
      register("title");
  }, [register]);

  


  return (
    <View style={styles.container}>
      <Text>Title:</Text>
      <TextInput onChangeText={text => setValue("title", text)} style={styles.textInput} />

      <Button
        title={recording?.isRecording ? "Stop Recording" : "Start Recording"}
        onPress={recording?.isRecording ? stopRecording : startRecording}
      />
      <Text>Duration: {recording?.duration}</Text>

      {recordingFinished && <Button title="Play Sound" onPress={play} />}

      {recordingFinished && <Button title="Create Post" onPress={handleSubmit(handlePostCreation)} />}


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

  textInput: { height: 40, width:300, borderColor: 'gray', borderWidth: 1 }
});
