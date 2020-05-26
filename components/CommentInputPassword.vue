<template>
  <v-dialog
    v-model="dialog"
    class="text-center fill-height"
    style="overflow: hidden"
    max-width="400"
  >
    <v-card fluid class="pa-4 mt-2">
      <v-card-title>비밀번호 확인</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            id="password"
            v-model="password"
            @keydown.enter="password"
            label="비밀번호를 입력해주세요"
            name="password"
            prepend-icon="mdi-key"
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions> </v-card-actions>
      <v-card-actions>
        <v-btn @click="passwordCheck" color block dark>확인</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="Errordialog" max-width="320" light class="text-center">
      <v-card class="pa-0 text-center">
        <v-card-text v-html="errorMessage" />
        <v-spacer></v-spacer>
        <v-btn
          @click.native="Errordialog = false"
          color="#4b73df"
          class="dialog-confirm"
          style="border-radius: 0px"
          block
          >확인</v-btn
        >
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import _ from 'lodash'
export default {
  data: () => ({
    dialog: false,
    password: null,
    errorMessage: '',
    Errordialog: false,
    results: {}
  }),

  methods: {
    open(item) {
      this.results = _.cloneDeep(item)
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$emit('onClosed')
    },
    cancel() {
      this.dialog = false
    },
    passwordCheck() {
      if (!this.password) {
        this.errorMessage = 'Password를 입력해주세요'
        this.Errordialog = true
      }
    },
    redirect() {
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
