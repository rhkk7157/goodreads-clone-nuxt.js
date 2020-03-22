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
    <v-app-bar :clipped-left="clipped" fixed app style="border:1px solid grey">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-avatar right class="ml-3 mr-3" size="36px">
        <v-img alt="Avatar" src="/g.png" contain />
      </v-avatar>
      <v-toolbar-title v-text="title" />

      <v-spacer />
    </v-app-bar>
    <!-- <v-img src="/goodreads.png" style="max-width:100%" contain /> -->
    <!-- /header -->

    <v-content style="border:1px solid red" class="fill-height bg" fluid>
      <v-container style="border:3px solid red">
        <nuxt />
      </v-container>
    </v-content>

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
    </v-footer>
  </v-app>
</template>

<script>
export default {
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
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'GoodReads-Clone'
    }
  }
}
</script>
<style scoped></style>
