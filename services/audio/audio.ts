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

  async getAudio(uri: string) {
    const { sound } = await Audio.Sound.createAsync({ uri });
    return sound;
  }
}

export default new AudioService(Audio);
