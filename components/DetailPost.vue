<template>
  <v-dialog
    v-model="dialog"
    hide-overlay
    transition="dialog-bottom-transition"
    max-width="1000"
  >
    <v-card>
      <v-toolbar dark color="deep-purple">
        <v-btn @click="dialog = false" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- <v-btn @click="dialog = false" dark text>Save</v-btn> -->
        </v-toolbar-items>
      </v-toolbar>
      <v-img
        height="450"
        src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
      ></v-img>

      <v-card-title>{{ this.post.title }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <!-- <v-rating
            :length="length"
            :size="size"
            :value="4"
            readonly
          ></v-rating>-->
          <!-- 별점 readonly -->
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
        <div class="my-4 subtitle-1">{{ this.post.sub_title }}</div>
        <div>{{ this.post.content }}</div>
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
        <v-btn @click="reserve" color="deep-purple lighten-2" text
          >Reserve</v-btn
        >
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
    </v-card>-->
  </v-dialog>
</template>

<script>
import _ from 'lodash'
export default {
  data: () => ({
    dialog: false,
    post: {},
    loading: false,
    selection: 1,
    length: 5,
    size: 30
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
