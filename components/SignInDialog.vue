<template>
  <v-dialog
    v-model="dialog"
    class="text-center fill-height"
    style="overflow: hidden"
    max-width="400"
  >
    <v-card fluid class="pa-4 mt-2">
      <v-card-title>로그인</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="id"
            @keydown.enter="signIn"
            label="아이디를 입력해주세요"
            name="login"
            prepend-icon="mdi-account"
            type="text"
          />
          <v-text-field
            id="password"
            v-model="password"
            @keydown.enter="signIn"
            label="비밀번호를 입력해주세요"
            name="password"
            prepend-icon="mdi-key"
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-checkbox
          v-model="checkbox"
          color="red"
          label="아이디저장"
          class="fill-height"
        ></v-checkbox>
        <v-card-text v-html="errorMessage" style="border:1px solid solid" />
      </v-card-actions>
      <v-card-actions>
        <v-btn @click="signIn" color="primary" block dark>Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import _ from 'lodash'
export default {
  data: () => ({
    dialog: false,
    checkbox: false,
    id: null,
    password: null,
    errorMessage: ''
  }),
  // mounted() {
  //   const authUser = this.$cookies.get('authUser')
  //   this.id = (authUser && authUser.user_id) || null
  //   this.checkbox = !!authUser
  // },
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
    },
    async signIn() {
      if (!this.id) {
        this.errorMessage = 'ID를 입력해주세요'
        this.dialog = true
        return
      }
      if (!this.password) {
        this.errorMessage = 'Password를 입력해주세요'
        this.dialog = true
        return
      }
      try {
        await this.$store
          .dispatch('login', {
            id: this.id,
            password: this.password
          })
          .then(() => {
            if (this.$store.state.authUser) {
              this.$cookies.set('authUser', this.$store.state.authUser)
            } else {
              this.$cookies.remove('authUser')
            }
            this.redirect()
          })
          .catch((error) => {
            console.log(error)

            // const errorName = _.get(error, 'response.data.name', null)

            // if (errorName === 'PASSWORD_ERROR') {
            //   this.errorMessage = '아이디와 비밀번호를 확인해주세요.'
            //   this.dialog = true
            // } else if (errorName === 'NOT_FOUND_ID') {
            //   // this.errorMessage = '아이디를 찾을 수 없습니다.'
            //   this.errorMessage = '아이디와 비밀번호를 확인해주세요.'
            //   this.dialog = true
            // } else if (errorName === 'INVALID_PARAMETERS') {
            //   this.errorMessage = '잘못된 요청입니다.'
            //   this.dialog = true
            // } else if (errorName === 'BLOCKED') {
            //   this.errorMessage = '중지된 사용자입니다.'
            //   this.dialog = true
            // } else if (errorName === 'PASSWORD_EMPTY') {
            //   this.errorMessage =
            //     '비밀번호가 등록되지 않은 사용자입니다. (관리자 문의)'
            //   this.dialog = true
            // } else {
            //   this.errorMessage = '로그인 할 수 없습니다. (관리자 문의)'
            //   this.dialog = true
            // }
          })
      } catch (e) {
        this.returnMsg = e.message
      }
    },
    redirect() {
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
