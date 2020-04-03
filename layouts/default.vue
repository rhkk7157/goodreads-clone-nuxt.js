<template>
  <v-app dark>
    <!-- 왼쪽 메뉴바 -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- /왼쪽 메뉴바 -->

    <!-- header -->
    <!-- <v-card-text :clipped-left="clipped" app color="primary"> -->
    <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->

    <!-- <v-btn @click="signup" class="ma-2">SignUp</v-btn>
    <v-btn @click="signin" class="ma-2">SignIn</v-btn>-->
    <v-card>
      <v-card color="primary">
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
        <v-card-title class="text-center justify-center py-1">
          <!-- <h1 class="font-weight-bold display-3 basil--text">예압</h1> -->
          <v-spacer />
          <v-btn @click="signup" class="ma-2">SignUp</v-btn>
          <v-btn @click="signin" class="ma-2">SignIn</v-btn>
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
      <!-- </v-card-text> -->
      <v-row v-cols="12" lg="3">
        <v-spacer></v-spacer>
        <v-btn @click="insertStore">click</v-btn>
      </v-row>
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
    <InsertStore ref="InsertStore"></InsertStore>
  </v-app>
</template>
<script>
import SignInDialog from '../components/SignInDialog'
import SignUpDialog from '../components/SignUpDialog'
import MainItemDialog from '../components/MainItemDialog'
import InsertStore from '../components/InsertStore'
export default {
  components: {
    SignInDialog,
    SignUpDialog,
    MainItemDialog,
    InsertStore
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      MenuTab: null,
      items: [
        { tab: 'A', content: 'Tab1 Content' },
        { tab: 'B', content: 'Tab2 Content' },
        { tab: 'C', content: 'Tab3 Content' },
        { tab: 'D', content: 'Tab4 Content' }
      ],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'hyeri'
    }
  },
  methods: {
    signin() {
      this.$refs.SignInDialog.open()
    },
    signup() {
      this.$refs.SignUpDialog.open()
    },
    insertStore() {
      this.$refs.InsertStore.open()
    }
  }
}
</script>
<style scoped></style>
