<template>
  <v-row>
    <v-row>
      <v-col v-for="n in total" :key="n" cols="12" lg="3">
        <v-card :items="posts" class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Theme</div>
              <v-list-item-title class="headline mb-1">Title</v-list-item-title>
              <v-list-item-subtitle>SubTitle</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile size="80">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn text>Button</v-btn>
            <v-btn text>Button</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-model="searchParams.page"
      :length="pages"
      @input="onPage"
      @next="nextPage"
      @previous="previousPage"
      total-visible="12"
    ></v-pagination>
  </v-row>
</template>
<script>
import _ from 'lodash'
export default {
  data: () => ({
    total: 0,
    posts: [],
    searchParams: {
      page: 1,
      limit: 12
    }
  }),
  computed: {
    pages() {
      return this.searchParams.limit
        ? Math.ceil(this.total / this.searchParams.limit)
        : 0
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    onPage(val) {
      this.searchParams.page = val
      this.loadData()
    },
    nextPage() {
      this.searchParams.page++
      this.loadData()
    },
    previousPage() {
      this.searchParams.page--
      this.loadData()
    },
    async loadData() {
      const response = await this.$axios.get('/api/posts/', {
        params: this.searchParams
      })
      this.posts = _.get(response, 'data.rows', [])
      this.total = _.get(response, 'data.count', 0)
      this.searchParams.page = _.get(response, 'data.page', 1)
    }
  }
}
</script>

<style></style>
