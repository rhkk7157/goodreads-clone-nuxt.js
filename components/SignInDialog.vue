<template>
  <v-dialog
    v-model="dialog"
    class="text-center fill-height"
    style="overflow: hidden"
    max-width="600"
  >
    <v-card class="elevation-12">
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="id"
            label="아이디를 입력해주세요"
            name="login"
            prepend-icon="mdi-account-key"
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
        <v-spacer />
        <v-btn color="primary">Login</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-checkbox
          v-model="checkbox"
          color="red"
          label="아이디저장"
          class="fill-height"
        ></v-checkbox>
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
    // loadData() {
    //   console.log('1')
    // }
  }
}
</script>

<style></style>
