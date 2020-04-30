<template>
  <div>
    <v-icon style="cursor:pointer;padding:2px;">mdi-heart</v-icon>
    <span style="border:3px solid pink">0</span>
    <v-icon style="cursor:pointer;padding:2px">mdi-comment-text-outline</v-icon>
    <span>0</span>
    <v-icon style="cursor:pointer;padding:2px">mdi-eye</v-icon>
    <span>0</span>
  </div>
</template>

<script>
export default {
  props: ['propsdata'],
  data: () => ({}),
  watch: {
    PropsData(item) {
      // console.log('123')

      console.log(item)

      // this.LikeCount(item)
    }
  },
  methods: {
    LikeCount(item) {
      console.log(item)
    }
  }
}
</script>

<style></style>
