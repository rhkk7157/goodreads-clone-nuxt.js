<template>
  <v-dialog
    v-model="dialog"
    class="text-center fill-height"
    style="overflow: hidden"
    max-width="700"
  >
    <v-card fluid class="pa-4 mt-2">
      <v-toolbar dark color="black">
        <v-btn @click="dialog = false" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-title>comment</v-card-title>
      <v-form>
        <v-text-field
          v-model="userId"
          label="아이디"
          prepend-icon="mdi-book-open-variant"
          type="text"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="comment"
          label="내용"
          prepend-icon=""
          type="text"
          outlined
        ></v-text-field>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    total: 0,
    dialog: false,
    comment: null,
    userId: null,
    searchParams: {
      page: 1,
      limit: 5
    }
  }),
  computed: {
    pages() {
      return this.searchParams.limit
        ? Math.ceil(this.total / this.searchParams.limit)
        : 0
    }
  },
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
