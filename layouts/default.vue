<template>
  <v-app dark>
    <v-card>
      <v-card style="height:70px" color="primary">
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
                    <span class="font-weight-white"
                      >{{ adminUserName }} 님</span
                    >
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
        <v-tab v-for="(item, i) in items" :key="i">{{ item.tab }}</v-tab>
      </v-tabs>

      <v-card-title class="text-center justify-center py-1">
        <v-spacer />
        <v-btn @click="insertBook" class="ma-2">상품등록</v-btn>
      </v-card-title>
      <v-content>
        <v-container fluid grid-list-xl>
          <MainItemDialog ref="MainItemDialog"></MainItemDialog>
          <!-- <nuxt /> -->
          <!-- <v-tabs-items v-model="MenuTab">
            <v-tab-item v-for="(item, i) in items" :key="i">
              <v-card color="basil" flat>
                <v-card-text>{{ item.content }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items> -->
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

    <v-footer :fixed="fixed" app>
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
    </v-footer>
    <SignInDialog ref="SignInDialog"></SignInDialog>
    <SignUpDialog ref="SignUpDialog"></SignUpDialog>
    <InsertBook ref="InsertBook"></InsertBook>
  </v-app>
</template>
<script>
import _ from 'lodash'
import SignInDialog from '../components/SignInDialog'
import SignUpDialog from '../components/SignUpDialog'
import MainItemDialog from '../components/MainItemDialog'
import InsertBook from '../components/InsertBook'
export default {
  components: {
    SignInDialog,
    SignUpDialog,
    MainItemDialog,
    InsertBook
  },
  data() {
    return {
      // clipped: false,
      // drawer: false,
      fixed: false,
      MenuTab: null,
      items: [
        { tab: 'A', content: 'Tab1 Content' },
        { tab: 'B', content: 'Tab2 Content' },
        { tab: 'C', content: 'Tab3 Content' },
        { tab: 'D', content: 'Tab4 Content' }
      ],

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
      //   {
      //     icon: 'mdi-chart-bubble',
      //     title: '_blank',
      //     to: '/DashboardLayout/KoreanFood'
      //   }
      // ],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      title: 'hyeri'
    }
  },
  computed: {
    adminUserName() {
      return _.get(this.$store.state, 'authUser.username', 'null') || 'null'
    }
  },
  methods: {
    signin() {
      this.$refs.SignInDialog.open()
    },
    signup() {
      this.$refs.SignUpDialog.open()
    },
    insertBook() {
      this.$refs.InsertBook.open()
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
