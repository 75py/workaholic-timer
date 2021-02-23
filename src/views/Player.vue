<template>
  <div id="player">
    <DigitalClock @onTimeChanged="onTimeChanged"></DigitalClock>
    <p><img id="image" alt=""></p>
  </div>
</template>

<style scoped>
#image {
  width: 100%;
}
</style>

<script lang="ts">
import database from '../common/database'
import sound from '../common/sound'
import {channel} from '../common/broadcast'
import DigitalClock from "../components/DigitalClock.vue";

const playTimeSignal = function (hour) {
  database.loadTimeSignal(hour).then(timeSignal => {
    sound.playSound(timeSignal.value)
  })
}

const sendTimeSignalNotification = function (title, message, hour) {
  if (process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, {
        body: message,
        data: {
          hour: hour,
          type: 'timeSignal'
        }
      })
    })
  } else {
    const n = new Notification(title, {
      body: message,
    })
    n.onclick = function () {
      playTimeSignal(hour)
    }
  }
}

const sendNotification = function (title, message, type) {
  if (process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, {
        body: message,
        data: {
          type: type
        }
      })
    })
  } else {
    new Notification(title, {
      body: message,
    })
  }
}

export default {
  components: {
    DigitalClock
  },
  mounted: function () {
    database.loadImage().then(result => {
      document.getElementById('image').setAttribute('src', result.value)
    })

    this.initializeNotification()
  },
  unmounted: function () {
    channel.removeEventListener('message', messageEventListener)
  },
  methods: {
    onTimeChanged: async function (date, dateStr, timeStr) {
      document.title = document.hasFocus() ? 'Workaholic Timer' : dateStr + ' ' + timeStr

      if (date.getSeconds() != 0) {
        return
      }
      if (date.getMinutes() == 0) {
        sendTimeSignalNotification('時報', date.getHours() + '時になりました！', date.getHours())
      } else if (date.getMinutes() == 20 || date.getMinutes() == 40 || date.getMinutes() == 1) {
        sendNotification('20分経過', '20秒遠くを見よう！', '20minTimer')
      }
    }
    ,
    initializeNotification() {
      Notification.requestPermission().then(function (result) {
        console.log(result)

        if (result === 'granted') {
          channel.addEventListener('message', messageEventListener)
        }
      })
    },
  }
}

const messageEventListener = function (event) {
  console.log('message received')
  if (event.data.type === "notificationclick" && event.data.data.type === 'timeSignal') {
    playTimeSignal(event.data.data.hour)
  }
}
</script>