<template>
  <div class="preference">
    <h1>Preference</h1>
    <h2>画像</h2>
    <p><input type="file" id="image-file-button"></p>
    <p>
      <img id="image-output" width="300" alt="">
    </p>
    <h2>時報</h2>
    <table v-for="h of 24" :key="h">
      <tr>
        <th><label :for="`time-signal-${h - 1}`">{{ h - 1 }}時</label></th>
        <td><input type="file" :id="`time-signal-${h - 1}`"></td>
        <td>
          <button :id="`time-signal-button-${h - 1}`">Play {{ fileNames[h - 1] }}</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import database from '../common/database'
import sound from '../common/sound'

export default {
  data: function () {
    return {
      fileNames: {},
    }
  },
  methods: {
    drawImage(dataUrl) {
      document.getElementById('image-output').setAttribute('src', dataUrl)
    },
  },
  mounted: function () {
    const drawImage = this.drawImage

    database.loadImage().then(saved => {
      drawImage(saved.value)
    })

    database.loadTimeSignals().then(signals => {
      signals.forEach(s => {
        this.fileNames[s.hour] = s.name
      })
    })

    const imageFileButton = document.getElementById('image-file-button')
    imageFileButton.onchange = (e) => {
      console.log(e)
      const reader = new FileReader()
      if (e && e.target) {
        const files = e.target.files
        if (files && files.length > 0) {
          reader.readAsDataURL(files[0])
          reader.onload = function (e2) {
            const imageSource = e2.target.result
            console.log(imageSource)

            drawImage(String(imageSource))

            database.saveImage('main', files[0].name, String(imageSource))
          }
        }
      }
    }

    for (let h = 0; h < 24; h++) {
      const button = document.getElementById("time-signal-button-" + h)
      button.onclick = function () {
        database.loadTimeSignal(h).then(a => {
          sound.playSound(a.value)
        }).catch(e => {
          console.log(e)
        })
      }

      const file = document.getElementById("time-signal-" + h)
      const fileNames = this.fileNames
      file.onchange = (e) => {
        console.log(e)
        const reader = new FileReader()
        if (e && e.target) {
          const files = e.target.files
          if (files && files.length > 0) {
            reader.readAsDataURL(files[0])
            reader.onload = function (e2) {
              const music = e2.target.result
              console.log(music)
              sound.playSound(String(music))

              database.saveTimeSignal(h, files[0].name, String(music))
              fileNames[h] = files[0].name
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.preference {
  text-align: center;
}

#image-canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>