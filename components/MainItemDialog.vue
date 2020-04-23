<template>
  <v-row>
    <v-row>
      <v-flex v-for="item in posts" :key="item.idx">
        <v-col cols="auto" style="border:1px solid black">
          <v-card class="mx-auto" max-width="344" raised>
            <v-list-item
              @click="detailPost(item)"
              three-line
              style="border:1px solid red; cursor:pointer"
            >
              <v-list-item-content>
                <div class="overline mb-4">{{ item.category }}</div>
                <v-list-item-title class="headline mb-2">
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.sub_title }}
                </v-list-item-subtitle>
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
      </v-flex>
    </v-row>
    <v-pagination
      v-model="searchParams.page"
      :length="pages"
      @input="onPage"
      @next="nextPage"
      @previous="previousPage"
      total-visible="12"
    ></v-pagination>
    <DetailPost ref="DetailPost"></DetailPost>
  </v-row>
</template>
<script>
import _ from 'lodash'
import DetailPost from './DetailPost'
export default {
  name: 'MainItemDialog',
  components: {
    DetailPost
  },
  props: {
    categoryIndex: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    total: 0,
    categoryNum: null,
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
  watch: {
    categoryIndex(i) {
      this.categoryNum = i
      this.loadData()
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
      const categoryNum = this.categoryNum
      const response = await this.$axios.get('/api/posts/', {
        params: {
          searchParams: this.searchParams,
          categoryNum
        }
      })
      this.posts = _.get(response, 'data.rows', [])
      this.total = _.get(response, 'data.count', 0)
      this.searchParams.page = _.get(response, 'data.page', 1)
    },
    detailPost(item) {
      this.$refs.DetailPost.open(item)
    }
  }
}
</script>

<style></style>
