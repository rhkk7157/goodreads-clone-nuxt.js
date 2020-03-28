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
            label="아이디를 입력해주세요"
            name="login"
            prepend-icon="mdi-account"
            type="text"
          />
          <v-text-field
            id="password"
            v-model="password"
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
      </v-card-actions>
      <v-card-actions>
        <!-- <v-checkbox
          v-model="checkbox"
          color="red"
          label="아이디 저장"
          class="fill-height"
        ></v-checkbox> -->
        <!-- <v-spacer /> -->
        <v-btn color="primary" block dark>Login</v-btn>
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
    password: null
  }),
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

<style></style>
