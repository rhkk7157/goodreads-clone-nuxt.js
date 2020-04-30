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
          prepend-icon="mdi-comment-account-outline"
          type="text"
          outlined
        ></v-text-field>
        <v-textarea
          v-model="comment"
          label="내용"
          prepend-icon="mdi-comment-text-outline"
          type="text"
          outlined
        ></v-textarea>
        <v-text-field
          v-model="password"
          type="password"
          label="비밀번호를 입력해주세요"
          prepend-icon="mdi-lock-outline"
          outlined
        ></v-text-field>
        <v-row>
          <v-col cols="12" md="3"></v-col>
          <v-col cols="12" md="3">
            <v-btn value="Like">
              <span>Like</span>
              <v-icon>mdi-thumb-up-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn value="disLike">
              <span>disLike</span>
              <v-icon>mdi-thumb-down-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn @click="signIn" color="primary" block dark>Save</v-btn>
        </v-card-actions>
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
