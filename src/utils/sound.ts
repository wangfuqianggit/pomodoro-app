// Generate a simple beep sound using Web Audio API
let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

export function playAlarm() {
  const ctx = getAudioContext()

  // Play 3 short beeps
  for (let i = 0; i < 3; i++) {
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    const startTime = ctx.currentTime + i * 0.3
    gainNode.gain.setValueAtTime(0.3, startTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2)

    oscillator.start(startTime)
    oscillator.stop(startTime + 0.2)
  }
}

export function playTick() {
  const ctx = getAudioContext()
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.frequency.value = 600
  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(0.05, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 0.05)
}
