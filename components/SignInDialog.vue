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
