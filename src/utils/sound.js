let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playTone = (freq1, freq2, type, vol, duration) => {
  try {
    const context = getAudioContext();
    if (!context) return;
    
    const osc = context.createOscillator();
    const gain = context.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq1, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq2, context.currentTime + duration * 0.5);
    
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(vol, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(context.destination);
    
    osc.start();
    osc.stop(context.currentTime + duration);
  } catch (e) {
    console.error('Audio playback failed', e);
  }
};

export const playPopSound = () => playTone(600, 200, 'sine', 0.2, 0.1);
export const playLikeSound = () => playTone(800, 1200, 'sine', 0.15, 0.08);
export const playRepostSound = () => {
  playTone(400, 800, 'triangle', 0.1, 0.05);
  setTimeout(() => playTone(600, 1000, 'triangle', 0.1, 0.05), 60);
};
export const playSaveSound = () => playTone(1200, 300, 'sine', 0.15, 0.1);
