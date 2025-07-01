import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';

import correctSoundFile from '../assets/audio/correct.mp3';
import wrongSoundFile from '../assets/audio/wrong.mp3';
import completeSoundFile from '../assets/audio/complete.mp3';
import clickSoundFile from '../assets/audio/click.mp3';
import backgroundSoundFile from '../assets/audio/background.mp3';
import celebrationSoundFile from '../assets/audio/celebration.mp3';

const soundFiles = {
  correct: correctSoundFile,
  wrong: wrongSoundFile,
  complete: completeSoundFile,
  click: clickSoundFile,
  background: backgroundSoundFile,
  celebration: celebrationSoundFile,
};

// Cache Howl instances by sound name
const soundInstances = {};

const useSound = (soundName, options = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);
  const { volume = 1, loop = false, autoplay = false } = options;

  useEffect(() => {
    if (!soundFiles[soundName]) {
      console.warn(`Sound ${soundName} does not exist!`);
      return;
    }

    if (!soundInstances[soundName]) {
      soundInstances[soundName] = new Howl({
        src: [soundFiles[soundName]],
        volume,
        loop,
        autoplay,
        onplay: () => setIsPlaying(true),
        onend: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
      });
    } else {
      // Update volume and loop for existing instance only if changed
      const instance = soundInstances[soundName];
      if (instance.volume() !== volume) instance.volume(volume);
      if (instance.loop() !== loop) instance.loop(loop);
      if (autoplay && !instance.playing()) {
        instance.play();
      }
    }

    soundRef.current = soundInstances[soundName];

    // Cleanup function: optional unload on unmount (commented for reuse)
    return () => {
      // soundRef.current?.unload();
      soundRef.current = null;
    };
  }, [soundName, volume, loop, autoplay]);

  const play = useCallback(
    (playOptions = {}) => {
      if (soundRef.current) {
        const { startTime = 0, volume: playVolume } = playOptions;

        if (playVolume !== undefined) {
          soundRef.current.volume(playVolume);
        }

        soundRef.current.seek(startTime);
        soundRef.current.play();
      }
    },
    []
  );

  const stop = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  }, []);

  const pause = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const fade = useCallback((from, to, duration) => {
    if (soundRef.current) {
      soundRef.current.fade(from, to, duration);
    }
  }, []);

  return {
    play,
    stop,
    pause,
    fade,
    isPlaying,
    soundInstance: soundRef.current,
  };
};

// Preload all sounds when module loads (optional)
if (typeof window !== 'undefined') {
  Object.values(soundFiles).forEach((src) => new Howl({ src: [src], preload: true }));
}

export default useSound;
