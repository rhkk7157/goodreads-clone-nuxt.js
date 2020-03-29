<template>
  <v-dialog
    v-model="dialog"
    class="text-center fill-height"
    style="overflow: hidden"
    max-width="500"
  >
    <v-card fluid class="pa-4 mt-2">
      <v-card-title>SIGN UP</v-card-title>
      <v-container>
        <v-row>
          <v-switch
            v-model="newMemberSignUp"
            label="신규 회원가입하기"
            class="pa-0 ma-0 ml-4"
            color="primary"
            hide-details
            inset
            dense
          >
          </v-switch>
          <v-switch
            v-model="snsSignUp"
            label="SNS계정 회원가입"
            class="pa-0 ma-0 ml-4"
            color="primary"
            hide-details
            inset
            dense
          >
          </v-switch>
        </v-row>
      </v-container>
      <v-card-text v-show="newMemberSignUp">
        <v-form>
          <v-text-field
            v-model="id"
            label="이름을 입력해주세요"
            prepend-icon="mdi-tag-text-outline"
            type="text"
          />
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
          <v-text-field
            v-model="address"
            label="주소를 입력해주세요"
            prepend-icon="mdi-home"
          >
          </v-text-field>
        </v-form>
        <v-card-actions>
          <v-btn color="primary" block dark>회원가입</v-btn>
        </v-card-actions>
      </v-card-text>

      <!-- <v-card-title>
        SNS 계정 회원가입
      </v-card-title> -->
      <v-card-text v-show="snsSignUp">
        <div class="my-2">
          <v-btn color="yellow" block>Kakao ID로 회원가입</v-btn>
        </div>
        <div class="my-2">
          <v-btn color="green" block dark>네이버ID로 회원가입</v-btn>
        </div>
        <div class="my-2">
          <v-btn color="black" block dark>facebook ID로 회원가입</v-btn>
        </div>
      </v-card-text>
      <!-- <v-card-actions> </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    newMemberSignUp: false,
    snsSignUp: false,
    address: null,
    password: null,
    id: null
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
      this.diaglog = false
    }
  }
}
</script>

<style></style>
