export default {
    playSound(src) {
        const audio = new Audio(src)
        audio.volume = 0.1
        audio.play()
    }
}
