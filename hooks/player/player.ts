import { useState } from "react";
import { AudioService } from "../../services";
import { PlayerAudioInterface } from "../../interfaces";
import audio from "../../services/audio";

export default function usePlayer() {
  const [audioFiles, setAudioFiles] = useState<PlayerAudioInterface[] | []>([]);

  function updateAudio(audioId: number | string, audio: PlayerAudioInterface) {
    const filteredAudioFiles = audioFiles.filter(
      (audioFile) => audioFile.id !== audioId
    );

    filteredAudioFiles.push(audio);
    setAudioFiles(filteredAudioFiles);
  }

  async function playAudio(audioId: number | string) {
    const audioFile = audioFiles.find((audio) => audio?.id === audioId);

    if (!audioFile?.uri) return;

    await stopAllAudios();

    const audio = await AudioService.getAudio(audioFile.uri);
    audioFile.audio = audio;

    await audio.playAsync();

    updateAudio(audioId, audioFile);
  }

  async function stopAudio(audioId: number | string) {
    const audioFile = audioFiles.find((audio) => audio?.id === audioId);

    if (!audioFile?.audio) return;

    await audioFile.audio.stopAsync();

    delete audioFile.audio;

    updateAudio(audioId, audioFile);
  }

  async function stopAllAudios() {
    const promises: any[] = [];
    audioFiles.forEach((audioFile: PlayerAudioInterface) =>
      promises.push(stopAudio(audioFile.id))
    );

    await Promise.all(promises);
  }

  return { playAudio, stopAudio, setAudios: setAudioFiles };
}
