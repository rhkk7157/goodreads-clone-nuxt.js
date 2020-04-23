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
      <v-row justify="space-between">
        <v-row>
          <v-card-text>
            {{ this.post.title }}
          </v-card-text>
        </v-row>
        <v-col cols="12" md="5">
          <v-img
            height="200"
            width="200"
            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
          ></v-img>
        </v-col>
        <v-col cols="12" md="5"> </v-col>
      </v-row>
    </v-card>
    <!-- <v-card>
      <v-card-title class="primary" primary-title>
        -----
        <v-spacer />
      </v-card-title>

      <v-container>
        <v-row></v-row>
      </v-container>
    </v-card>-->
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
