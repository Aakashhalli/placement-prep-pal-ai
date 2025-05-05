
import React, { useState, useRef, useEffect } from 'react';
import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioRecorderAutoProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  isDisabled: boolean;
}

const AudioRecorderAuto: React.FC<AudioRecorderAutoProps> = ({ onRecordingComplete, isDisabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const silenceTimeoutRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Set up audio analysis for silence detection
      const audioContext = new AudioContext();
      const audioSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      audioSource.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkSilence = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        
        if (average < 10) { // Silence threshold
          if (silenceTimeoutRef.current === null) {
            silenceTimeoutRef.current = window.setTimeout(() => {
              if (isRecording) {
                stopRecording();
              }
            }, 1500); // Stop after 1.5 seconds of silence
          }
        } else {
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
            silenceTimeoutRef.current = null;
          }
        }

        if (isRecording) {
          requestAnimationFrame(checkSilence);
        }
      };

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        onRecordingComplete(audioBlob);
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
      checkSilence();

    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Button
      onClick={isRecording ? stopRecording : startRecording}
      disabled={isDisabled}
      className={`px-6 py-3 rounded-lg ${
        isRecording 
          ? 'bg-accent-red hover:bg-accent-red/80 animate-pulse' 
          : 'bg-accent-blue hover:bg-accent-blue/80'
      }`}
    >
      <Mic className={`w-6 h-6 ${isRecording ? 'animate-pulse' : ''}`} />
    </Button>
  );
};

export default AudioRecorderAuto;
