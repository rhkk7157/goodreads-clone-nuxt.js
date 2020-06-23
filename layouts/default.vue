<template>
  <v-app dark>
    <v-card>
      <v-card style="height:70px;" color="primary">
        <v-card-title class="text-center justify-center py-1">
          <v-spacer />
          <v-card-actions>
            <div v-if="this.$store.state.authUser === null">
              <v-btn @click="signup" class="ma-2">SignUp</v-btn>
              <v-btn @click="signin" class="ma-2">SignIn</v-btn>
            </div>
            <div v-else>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <div v-on="on" text style="cursor: pointer; margin-top:5px">
                    <span v-if="adminUserName != ''" class="font-weight-white"
                      >{{ adminUserName }} 님</span
                    >
                    <span v-else></span>
                  </div>
                </template>
                <v-list>
                  <v-divider />
                  <v-list-item @click="signOut">
                    <v-list-item-title>로그아웃</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-actions>
        </v-card-title>
      </v-card>
      <v-tabs
        v-model="MenuTab"
        min-width="30"
        background-color="transparent"
        color="primary"
        grow
      >
        <v-tab
          v-for="(item, i) in items"
          :key="i"
          @click="categoryItem(i)"
          style="cursor:pointer"
          >{{ item.tab }}</v-tab
        >
      </v-tabs>
      <v-card-title class="text-center justify-center py-1">
        <v-spacer />
        <v-btn @click="insertBook" class="ma-2">상품등록</v-btn>
      </v-card-title>
      <v-content>
        <v-container fluid grid-list-xl>
          <MainItemDialog
            ref="MainItemDialog"
            v-bind:categoryIndex="categoryIndex"
          ></MainItemDialog>
          <!-- <nuxt /> -->
          <!-- <v-tabs-items v-model="MenuTab">
            <v-tab-item v-for="(item, i) in items" :key="i">
              <v-card color="basil" flat>
                <v-card-text>{{ item.content }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>-->
        </v-container>
      </v-content>
    </v-card>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
    <!-- /header -->

    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; Hyeri</span>
      <v-switch
        v-model="$vuetify.theme.dark"
        :label="$vuetify.theme.dark ? 'dark' : 'light'"
        class="pa-0 ma-0 ml-4"
        color="primary"
        hide-details
        inset
        dense
      ></v-switch>
      <v-dialog v-model="Errordialog" max-width="320" light class="text-center">
        <v-card class="pa-0 text-center">
          <v-card-title class="dialog-title mb-1"></v-card-title>
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
    </v-footer>-->
    <SignInDialog ref="SignInDialog"></SignInDialog>
    <SignUpDialog ref="SignUpDialog"></SignUpDialog>
    <InsertBook ref="InsertBook"></InsertBook>
  </v-app>
</template>
<script>
import SignInDialog from '../components/SignInDialog'
import SignUpDialog from '../components/SignUpDialog'
import MainItemDialog from '../components/MainItemDialog'
import InsertBook from '../components/InsertBook'
import _ from 'lodash'

export default {
  components: {
    SignInDialog,
    SignUpDialog,
    MainItemDialog,
    InsertBook
  },
  data() {
    return {
      errorMessage: '',
      Errordialog: false,
      fixed: false,
      MenuTab: null,
      categoryIndex: 0,
      items: [
        // { tab: 'Cook' },
        { tab: 'Travel' },
        { tab: 'Art' },
        { tab: 'Webtoon' }
      ],
      title: 'hyeri'
      // items: [
      //   {
      //     icon: 'mdi-apps',
      //     title: 'Welcome',
      //     to: '/'
      //   },
      //   {
      //     icon: 'mdi-chart-bubble',
      //     title: '상점 등록하기',
      //     to: '/DashboardLayout/InsertStore'
      //   },
      // ],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
    }
  },
  computed: {
    adminUserName() {
      // console.log(this.$store.state)
      return _.get(this.$store.state, 'authUser.username', 'null') || 'null'
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
    },
    signin() {
      this.$refs.SignInDialog.open()
    },
    signup() {
      this.$refs.SignUpDialog.open()
    },
    insertBook() {
      const authUser = this.$store.state.authUser
      if (authUser === null) {
        this.errorMessage = '로그인 해주세요.'
        this.Errordialog = true
      } else {
        this.$refs.InsertBook.open(authUser)
      }
    },
    categoryItem(i) {
      this.categoryIndex = i
    },
    async signOut() {
      await this.$store
        .dispatch('logout')
        .then(() => window.location.reload(true))
    }
  }
}
</script>
<style scoped></style>
