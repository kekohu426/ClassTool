import { useEffect, useRef } from 'react';

export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;

  private constructor() {
    this.initAudioContext();
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('音频上下文初始化失败:', error);
    }
  }

  private createSound(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private createChord(frequencies: number[], duration: number) {
    frequencies.forEach(freq => {
      this.createSound(freq, duration);
    });
  }

  playPoints1() {
    // 简单的叮咚声
    this.createSound(523, 0.2); // C5
  }

  playPoints3() {
    // 上升音调
    this.createSound(523, 0.15); // C5
    setTimeout(() => this.createSound(659, 0.15), 100); // E5
  }

  playPoints5() {
    // 和弦音效
    this.createChord([523, 659, 784], 0.3); // C5, E5, G5
  }

  playPoints10() {
    // 胜利音效
    this.createSound(523, 0.1); // C5
    setTimeout(() => this.createSound(659, 0.1), 100); // E5
    setTimeout(() => this.createSound(784, 0.1), 200); // G5
    setTimeout(() => this.createSound(1047, 0.3), 300); // C6
  }

  playHomework() {
    // 作业提交音效
    this.createSound(440, 0.2); // A4
    setTimeout(() => this.createSound(523, 0.2), 150); // C5
  }

  playRankUp() {
    // 排名上升音效
    this.createSound(659, 0.1); // E5
    setTimeout(() => this.createSound(784, 0.1), 100); // G5
    setTimeout(() => this.createSound(1047, 0.2), 200); // C6
  }

  playLevelUp() {
    // 等级提升音效
    this.createChord([523, 659, 784, 1047], 0.5); // 大和弦
  }
}

export function useSoundManager() {
  const soundManager = useRef<SoundManager>();

  useEffect(() => {
    soundManager.current = SoundManager.getInstance();
    
    // 用户交互后激活音频上下文
    const handleUserInteraction = () => {
      if (soundManager.current && (soundManager.current as any).audioContext?.state === 'suspended') {
        (soundManager.current as any).audioContext.resume();
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  return soundManager.current;
}