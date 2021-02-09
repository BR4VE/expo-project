import { Audio } from "expo-av";
import { RecordingContainer } from "../../helpers";

class AudioService {
  private api: any;

  constructor(api: any) {
    this.api = api;
  }

  async configureAudioSettings() {
    await this.api.requestPermissionsAsync();
    await this.api.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
  }

  async getConfiguredRecordingInstance() {
    const recording = new this.api.Recording();
    return new RecordingContainer(recording);
  }

  async playAudio(uri: string) {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  }
}

export default new AudioService(Audio);

// getRecordingDurationInSeconds(status: RecordingStatusInterface) {
//   const durationMillis: number = status.durationMillis || 0;

//   return Math.floor(durationMillis / ONE_SECOND_AS_MILISECONDS);
// }

// checkRecordingDurationExceeds(duration: number) {
//   return duration >= MAX_RECORDING_DURATION_IN_SECONDS;
// }
