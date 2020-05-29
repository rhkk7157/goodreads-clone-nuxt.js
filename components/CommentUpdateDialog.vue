<template>
  <v-dialog
    v-model="dialog"
    class="text-center fill-height"
    style="overflow: hidden"
    max-width="700"
  >
    <h1>Update</h1>
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
        <v-card-actions>
          <v-btn @click="commentUpdate()" color="primary" block dark
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import _ from 'lodash'
export default {
  data: () => ({
    dialog: false,
    comment: null,
    userId: null,
    password: null,
    postIdx: null,
    commentPost: null
  }),
  mounted() {
    const authUser = this.$cookies.get('authUser')
    this.userId = (authUser && authUser.user_id) || null
  },
  methods: {
    open(item) {
      this.commentPost = _.cloneDeep(item)
      this.comment = this.commentPost.content
      this.dialog = true
      console.log(this.commentPost)
    },
    close() {
      this.dialog = false
      this.$emit('onClosed')
    },
    cancel() {
      this.dialog = false
    },
    async commentUpdate() {
      // const postIdx = this.commentPost.idx
      await this.$axios.get('/api/comment/updated/', {
        params: {
          user_idx: this.$cookies.get('authUser').idx,
          comment: this.comment,
          password: this.password,
          commentIdx: this.commentPost.idx,
          postIdx: this.commentPost.post_idx
        }
      })
    }
  }
}
</script>
