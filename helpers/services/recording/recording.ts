import {
  MAX_RECORDING_DURATION_IN_SECONDS,
  ONE_SECOND_AS_MILISECONDS,
} from "../../../contants";
import { RecorderStatusInterface } from "../../../interfaces/recorder";

export default class RecordingContaier {
  recorder: any;

  constructor(recorder: any) {
    this.recorder = recorder;
  }

  getRecordingDurationInSeconds(status: RecorderStatusInterface) {
    const durationMillis: number = status.durationMillis || 0;

    return Math.floor(durationMillis / ONE_SECOND_AS_MILISECONDS);
  }

  checkRecordingDurationExceeds(duration: number) {
    return duration >= MAX_RECORDING_DURATION_IN_SECONDS;
  }
}
