import { MAX_RECORDING_DURATION_IN_SECONDS } from "../../../contants";
import { Audio } from "expo-av";
import shortid from "shortid";

export default class RecordingContainer {
  private recording?: any;
  uri: string;
  duration: number;
  isRecording: boolean;
  id: string;

  constructor(recording: any) {
    this.id = shortid.generate();
    this.recording = recording;
    this.duration = 0;
    this.isRecording = false;
    this.uri = "";
  }

  async start() {
    await this.recording.prepareToRecordAsync(
      Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
    );
    return this.recording.startAsync();
  }

  async stopAndUnload() {
    await this.recording.stopAndUnloadAsync();
    this.isRecording = false;
    this.uri = await this.recording.getURI();
  }

  async checkRecordingDurationExceeds() {
    return this.duration >= MAX_RECORDING_DURATION_IN_SECONDS;
  }

  async addStatusUpdateListener(f: Function) {
    this.recording.setOnRecordingStatusUpdate(f);
  }
}
