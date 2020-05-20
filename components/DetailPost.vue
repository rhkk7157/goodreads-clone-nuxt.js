<template>
  <v-dialog
    v-model="dialog"
    hide-overlay
    transition="dialog-bottom-transition"
    max-width="900"
  >
    <v-card>
      <v-toolbar dark color="black">
        <v-btn @click="dialog = false" icon dark>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- <v-img :src="'https://localhost:3000/'" height="400"></v-img> -->
      <v-card-title>{{ this.post.title }}</v-card-title>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :length="length"
            :size="size"
            :value="4"
            readonly
          ></v-rating>
          <!-- 별점 readonly -->
          <!-- <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating> -->
          <!-- <div class="grey--text ml-4">4.5</div> -->
        </v-row>
        <div class="my-4 subtitle-1">{{ this.post.sub_title }}</div>
        <div>{{ this.post.content }}</div>
      </v-card-text>

      <v-card>
        <v-row>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-col cols="12" md="2">
            <v-btn @click="addComment()" color="primary">write</v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-data-table
        :headers="headers"
        :items-per-page="searchParams.limit"
        :loading="loading"
        :multi-sort="false"
        :must-sort="false"
        :sort-by="[]"
        :mobile-breakpoint="800"
        page.sync="searchParams.page"
        hide-default-footer
        disable-sort
        disable-filtering
        disable-pagination
        no-data-text="댓글없음."
      ></v-data-table>
      <v-pagination
        v-model="searchParams.page"
        :length="pages"
        @input="onPage"
        @next="nextPage"
        @previous="previousPage"
        total-visible="12"
      ></v-pagination>
      <add-comment-dialog ref="AddCommentDialog"></add-comment-dialog>
    </v-card>
  </v-dialog>
</template>
<script>
import _ from 'lodash'
import AddCommentDialog from '@/components/AddCommentDialog'
export default {
  components: {
    AddCommentDialog
  },
  data: () => ({
    dialog: false,
    post: {},
    total: 0,
    loading: false,
    selection: 1,
    length: 5,
    size: 30,
    headers: [
      {
        text: 'Idx',
        value: 'idx',
        align: 'left',
        sortable: false,
        width: '80'
      },
      {
        text: 'UserName',
        value: 'idx',
        align: 'left',
        sortable: false,
        width: '80'
      },
      {
        text: 'Comment',
        value: 'idx',
        align: 'left',
        sortable: false,
        width: '80'
      },
      {
        text: 'Date',
        value: 'idx',
        align: 'left',
        sortable: false,
        width: '80'
      }
    ],
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
  methods: {
    onPage(val) {
      this.searchParams.page = val
      // this.loadData()
    },
    nextPage() {
      this.searchParams.page++
      // this.loadData()
    },
    previousPage() {
      this.searchParams.page--
      // this.loadData()
    },
    open(data) {
      this.post = _.cloneDeep(data)
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$emit('onClosed')
    },
    cancel() {
      this.dialog = false
    },
    addComment() {
      const postIdx = this.post.idx
      this.$refs.AddCommentDialog.open(postIdx)
    }
    // reserve() {
    //   this.loading = true
    //   setTimeout(() => (this.loading = false), 2000)
    // }
  }
}
</script>

<style></style>
