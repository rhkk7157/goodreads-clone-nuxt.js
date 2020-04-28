<template>
  <v-row>
    <v-row>
      <v-flex v-for="item in posts" :key="item.idx" xs12 sm4>
        <v-col cols="auto">
          <v-card class="mx-auto" max-width="344" raised>
            <v-list-item
              @click="detailPost(item)"
              three-line
              style="cursor:pointer"
            >
              <v-list-item-content>
                <div class="overline mb-4">{{ item.category }}</div>
                <v-list-item-title class="headline mb-2">{{
                  item.title
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  item.sub_title
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar tile size="80">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-icon
                @click="likePost(item)"
                style="cursor:pointer;padding:2px;"
                >mdi-heart</v-icon
              >
              <span>{{ item.likes }}</span>
              <v-icon style="cursor:pointer;padding:2px"
                >mdi-comment-text-outline</v-icon
              >
              <span>{{ item.comments }}</span
              >&nbsp;&nbsp;
              <v-icon style="cursor:pointer;padding:2px">mdi-eye</v-icon>
              <span>{{ item.views }}</span
              >&nbsp;&nbsp;
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
    <detail-post ref="DetailPost"></detail-post>
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
    totalLikes: 0,
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
      // categoryNum : null
      const response = await this.$axios.get('/api/posts/main/' + categoryNum, {
        params: this.searchParams
      })
      this.posts = _.get(response, 'data.rows', [])
      this.total = _.get(response, 'data.count', 0)
      this.searchParams.page = _.get(response, 'data.page', 1)
      console.log(this.posts)
    },
    async likePost(item) {
      try {
        // item.idx , user_idx,
        const response = await this.$axios.get('/api/posts/likePost', {
          params: {
            post_idx: item.idx,
            user_idx: item.user_idx
          }
        })
        this.totalLikes = _.get(response, 'data', 0) // data.count
        console.log(this.totalLikes)
      } catch (error) {
        alert(error)
      }
      try {
      } catch (error) {}
    },
    detailPost(item) {
      this.$refs.DetailPost.open(item)
    }
  }
}
</script>

<style></style>
