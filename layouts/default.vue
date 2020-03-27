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
      <v-avatar right class="ml-3 mr-3" size="36px">
        <v-img alt="Avatar" src="/g.png" contain />
      </v-avatar>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn class="ma-2">SignUp</v-btn>
      <v-btn @click="login" class="ma-2">SignIn</v-btn>
      <!-- <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="ID"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="5">
              <v-text-field label="Password"></v-text-field>
            </v-col>
            <v-col>
              <v-btn>로그인</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form> -->
    </v-app-bar>

    <v-content>
      <v-container fluid grid-list-xl>
        <!-- <v-layout row justify-center>
          <v-flex xs1>
            <v-btn color="purple">한식</v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn color="purple">분식</v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn color="purple">양식</v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn color="purple">일식</v-btn>
          </v-flex>
        </v-layout> -->
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-btn color="purple">A</v-btn> -->
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
  </v-app>
</template>

<script>
import SignInDialog from '../components/SignInDialog'
export default {
  components: {
    SignInDialog
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
          title: '한식',
          to: '/DashboardLayout/KoreanFood'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '혜리'
    }
  },
  methods: {
    login() {
      this.$refs.SignInDialog.open()
    }
  }
}
</script>
<style scoped></style>
