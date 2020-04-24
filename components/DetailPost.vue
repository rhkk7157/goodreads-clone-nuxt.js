<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    max-width="auto"
  >
    <!-- max-width="700"-->
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>

      <v-card-title>{{ this.post.title }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <!-- <v-icon>mdi-heart</v-icon> -->
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
          <div class="grey--text ml-4">4.5 (413)</div>
        </v-row>
        <div class="my-4 subtitle-1">
          {{ this.post.sub_title }}
        </div>
        <div>
          {{ this.post.content }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tonight's availability</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>5:30PM</v-chip>

          <v-chip>7:30PM</v-chip>

          <v-chip>8:00PM</v-chip>

          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="reserve" color="deep-purple lighten-2" text>
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- <v-card>
      <v-toolbar dark color="primary">
        <v-btn @click="dialog = false" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>detail</v-toolbar-title>
      </v-toolbar>
      <v-row justify="space-between">
        <v-row>
          <v-card-text>{{ this.post.title }}</v-card-text>
        </v-row>
        <v-col cols="12" md="5">
          <v-img
            height="200"
            width="200"
            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
          ></v-img>
        </v-col>
        <v-col cols="12" md="5"></v-col>
      </v-row>
    </v-card> -->
  </v-dialog>
</template>

<script>
import _ from 'lodash'
export default {
  data: () => ({
    dialog: false,
    post: {},
    loading: false,
    selection: 1
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
    },
    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    }
  }
}
</script>

<style></style>
