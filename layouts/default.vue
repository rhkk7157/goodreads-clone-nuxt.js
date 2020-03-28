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
    <v-app-bar :clipped-left="clipped" app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-tabs
        :centered="true"
        :icons-and-text="true"
        fixed-tabs
        background-color="primary"
        dark
      >
        <v-tab>
          Option
        </v-tab>
        <v-tab>
          Another Selection
        </v-tab>
        <v-tab>
          Items
        </v-tab>
        <v-tab>
          Another Screen
        </v-tab>
      </v-tabs>
      <v-btn @click="signup" class="ma-2">SignUp</v-btn>
      <v-btn @click="signin" class="ma-2">SignIn</v-btn>
    </v-app-bar>
    <v-content style="border:1px solid red">
      <v-container fluid grid-list-xl>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
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
  </v-app>
</template>

<script>
import SignInDialog from '../components/SignInDialog'
import SignUpDialog from '../components/SignUpDialog'
export default {
  components: {
    SignInDialog,
    SignUpDialog
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '상점 등록하기',
          to: '/DashboardLayout/InsertStore'
        },
        {
          icon: 'mdi-chart-bubble',
          title: '_blank',
          to: '/DashboardLayout/KoreanFood'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '혜리고~~'
    }
  },
  methods: {
    signin() {
      this.$refs.SignInDialog.open()
    },
    signup() {
      this.$refs.SignUpDialog.open()
    }
  }
}
</script>
<style scoped></style>
