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
    <v-card>
      <v-card style="height:70px" color="primary">
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
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
        <v-btn @click="insertStore" class="ma-2">상품등록</v-btn>
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
import _ from 'lodash'
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
      title: 'hyeri',
      user: null
    }
  },
  computed: {
    adminUserName() {
      console.log('------------')
      if (!this.$store.state.authUser) {
        return
      } else {
        console.log('useroo')
      }
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
    insertStore() {
      this.$refs.InsertStore.open()
    },
    async signOut() {
      console.log('logout클릭')
      await this.$store
        .dispatch('logout')
        .then(() => this.$router.push('/signin'))
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped></style>
