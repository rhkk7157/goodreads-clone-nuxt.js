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
          readonly
        ></v-text-field>
        <v-textarea
          ref="Comment"
          v-model="comment"
          label="내용"
          prepend-icon="mdi-comment-text-outline"
          type="text"
          outlined
        ></v-textarea>
        <v-text-field
          ref="Password"
          v-model="password"
          type="password"
          label="비밀번호를 입력해주세요"
          prepend-icon="mdi-lock-outline"
          outlined
        ></v-text-field>
        <!-- <v-row fluid class="pa-4 mt-2">
          <v-col cols="12" md="3"></v-col>
          <v-col cols="12" md="3">
            <v-btn value="Like" color="blue lighten-2">
              <span>Like</span>
              <v-icon>mdi-thumb-up-outline</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn value="disLike" color="red lighten-2">
              <span>disLike</span>
              <v-icon>mdi-thumb-down-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row> -->
        <v-card-actions>
          <v-btn @click="commentSave()" color="primary" block dark>Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
// import _ from 'lodash'
export default {
  data: () => ({
    total: 0,
    dialog: false,
    comment: null,
    userId: null,
    password: null,
    postIdx: null,
    searchParams: {
      page: 1,
      limit: 5
    }
  }),
  mounted() {
    const authUser = this.$cookies.get('authUser')
    this.userId = (authUser && authUser.user_id) || null
  },
  methods: {
    open(postIdx) {
      this.postIdx = postIdx
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$emit('onClosed')
    },
    cancel() {
      this.dialog = false
    },
    async commentSave() {
      await this.$axios
        .get('/api/comment/insert/', {
          params: {
            user_idx: this.$cookies.get('authUser').idx,
            comment: this.comment,
            password: this.password,
            post_idx: this.postIdx
          }
        })
        .then((response) => {
          if (response.status === 200) {
            alert('댓글이 입력되었습니다.')
            this.dialog = false
            this.comment = ''
            this.password = ''
          }
        })
    },
    formValidation() {
      if (!this.$refs.Comment.validate(true)) {
        return false
      }
      if (!this.$refs.Password.validate(true)) {
        return false
      }

      return true
    }
  }
}
</script>
