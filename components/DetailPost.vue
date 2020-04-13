<template>
  <v-dialog v-model="dialog" class="text-center fill-height" max-width="500">
    <v-card>
      <v-card-title>detail</v-card-title>
      <v-card-text></v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$emit('onClosed')
    },
    cancel() {
      this.dialog = false
    }
  }
}
</script>

<style></style>
