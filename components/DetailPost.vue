<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    style="overflow: hidden"
    max-width="700"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn @click="dialog = false" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>detail</v-toolbar-title>
      </v-toolbar>
    </v-card>
    <!-- <v-card>
      <v-card-title class="primary" primary-title>
        -----
        <v-spacer />
      </v-card-title>

      <v-container>
        <v-row></v-row>
      </v-container>
    </v-card> -->
  </v-dialog>
</template>

<script>
import _ from 'lodash'
export default {
  data: () => ({
    dialog: false,
    post: {}
  }),
  methods: {
    open(data) {
      this.post = _.cloneDeep(data)
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
