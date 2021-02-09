import { useState, useEffect } from "react";

import { ObjectUtils, RecordingContainer } from "../../helpers";
import { AudioService, FileService } from "../../services";
import { RecordingStatusInterface } from "../../interfaces";
import { ONE_SECOND_AS_MILISECONDS } from "../../contants";

export default function useRecording() {
  const [recording, setRecording] = useState<RecordingContainer>();

  async function handleRecordingStatusUpdate(status: RecordingStatusInterface) {
    const { isRecording = false, durationMillis = 0 } = status;
    const durationSeconds = Math.floor(
      durationMillis / ONE_SECOND_AS_MILISECONDS
    );

    if (!recording) return;

    recording.duration = durationSeconds;
    recording.isRecording = isRecording;

    const durationExceeded = await recording.checkRecordingDurationExceeds();

    if (durationExceeded) stopRecording();

    const copiedRecording = ObjectUtils.cloneInstance(recording);
    setRecording(copiedRecording);
  }

  async function startRecording() {
    try {
      await AudioService.configureAudioSettings();
      const recording = await AudioService.getConfiguredRecordingInstance();
      setRecording(recording);
      await recording.start();
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    await recording?.stopAndUnload();
    const copiedRecording = ObjectUtils.cloneInstance(recording);
    setRecording(copiedRecording);
  }

  useEffect(() => {
    recording && recording.addStatusUpdateListener(handleRecordingStatusUpdate);
  }, [recording?.id]);

  useEffect(() => {
    return () => {
      recording?.uri.length && FileService.delete(recording.uri);
    };
  }, [recording?.uri]);

  return { startRecording, stopRecording, recording };
}
