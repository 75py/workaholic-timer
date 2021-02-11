<template>
  <div class="clock">
    <p>{{ dateStr }} {{ timeStr }}</p>
  </div>
</template>

<script>
const zeroPadding = (num, digit = 2) => {
  return (Array(digit).join('0') + num).slice(-digit)
}

export default {
  name: 'DigitalClock',
  data() {
    return {
      date: new Date(),
    }
  },
  computed: {
    dateStr() {
      return this.date.getFullYear() + '/' + zeroPadding(this.date.getMonth() + 1) + '/'
          + zeroPadding(this.date.getDate())
          + ' (' + ["日", "月", "火", "水", "木", "金", "土"][this.date.getDay()] + ')'
    },
    timeStr() {
      return zeroPadding(this.date.getHours()) + ':' + zeroPadding(this.date.getMinutes()) + ':' + zeroPadding(this.date.getSeconds())
    }
  },
  mounted() {
    this.setDate()
    setInterval(() => this.setDate(), 1000)
  },
  methods: {
    setDate() {
      this.date = new Date()
      this.$emit('onTimeChanged', this.date, this.dateStr, this.timeStr)
    },
  },
}
</script>

<style scoped>

</style>
