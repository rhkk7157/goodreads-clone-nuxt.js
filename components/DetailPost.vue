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
      <v-row align="center" justify="center">
        <v-img
          v-if="fileName != null"
          :src="`/uploads/` + fileName"
          v-bind:fileName="fileName"
          contain
          max-width="344"
          max-height="400"
        ></v-img>
        <div v-bind:fileName="fileName">{{ fileName }}</div>
        <v-btn @click="PostAndContentUpdate()">수정</v-btn>
      </v-row>
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
          ></v-rating>-->
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
        :items="comments"
        :page.sync="searchParams.page"
        :items-per-page="searchParams.limit"
        :loading="loading"
        :multi-sort="false"
        :must-sort="false"
        :sort-by="[]"
        :mobile-breakpoint="0"
        :expanded="expanded"
        @click:row="selectedComment"
        page.sync="searchParams.page"
        hide-default-footer
        disable-sort
        disable-filtering
        disable-pagination
        show-expand
        no-data-text="작성된 댓글이 없습니다."
        item-key="idx"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-carousel height="220">
              <v-carousel-item
                v-for="(chunk, i) in commentsChunks(item)"
                :key="i"
              >
                <v-row class="px-4">
                  <v-col v-for="(content, j) in chunk" :key="j" cols="2">
                    <div style="height:50px; margin:30px;">
                      <span style="font-size:20px;border:1px solid grey">
                        {{ item.content }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
            <div style="height:50px; margin:30px;">
              <span style="font-size:20px">{{ item.content }}</span>
              <!-- <v-btn @click="commentUpdate">수정</v-btn> -->
            </div>
          </td>
        </template>
        <template v-slot:item.commentLike="{ item }">
          <v-row fluid class="pa-4 mt-2">
            <v-col cols="12" md="5">
              <v-btn @click="likeComment(item.idx, 1)" color="blue lighten-2">
                <v-icon>mdi-thumb-up-outline</v-icon>
                {{ item.likes }}
              </v-btn>
            </v-col>
            <v-col cols="12" md="5">
              <v-btn @click="dislikeComment(item.idx, 2)" color="red lighten-2">
                <v-icon>mdi-thumb-down-outline</v-icon>
                {{ item.dislikes }}
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.commentUpdate="{ item }">
          <v-btn @click="commentUpdate(item)">수정</v-btn>
          <!-- <v-btn @click="commentUpdate(item)">수정</v-btn> -->
        </template>
      </v-data-table>
      <v-pagination
        v-model="searchParams.page"
        :length="pages"
        @input="onPage"
        @next="nextPage"
        @previous="previousPage"
        total-visible="12"
      ></v-pagination>
      <add-comment-dialog
        ref="AddCommentDialog"
        v-on:reloadComment="loadData"
      ></add-comment-dialog>
      <comment-input-password
        ref="CommentInputPassword"
      ></comment-input-password>
      <comment-update-dialog
        ref="CommentUpdateDialog"
        v-on:updated="close"
      ></comment-update-dialog>
      <post-update-dialog
        ref="PostUpdateDialog"
        @onClosed="cancel()"
      ></post-update-dialog>
    </v-card>
  </v-dialog>
</template>
<script>
import AddCommentDialog from '@/components/AddCommentDialog'
import CommentInputPassword from '@/components/CommentInputPassword'
import CommentUpdateDialog from '@/components/CommentUpdateDialog'
import PostUpdateDialog from '@/components/PostUpdateDialog'
import _ from 'lodash'
export default {
  components: {
    AddCommentDialog,
    CommentInputPassword,
    CommentUpdateDialog,
    PostUpdateDialog
  },
  data: () => ({
    dialog: false,
    post: {},
    total: 0,
    loading: false,
    selection: 1,
    length: 5,
    size: 30,
    comments: [],
    expanded: [],
    contents: [],
    fileName: '',
    commentUserIdx: null,
    loginUserIdx: null,
    headers: [
      {
        text: 'Idx',
        value: 'idx',
        align: 'center',
        sortable: false,
        width: '80'
      },
      {
        text: '내용',
        value: 'content',
        align: 'center',
        sortable: false,
        width: '160'
      },
      {
        text: '작성자',
        value: 'user_name',
        align: 'center',
        sortable: false,
        width: '80'
      },
      {
        text: '작성일자',
        value: 'created_at',
        align: 'center',
        sortable: false,
        width: '30'
      },
      {
        text: '좋아요',
        value: 'commentLike',
        align: 'center',
        sortable: false,
        width: '50'
      },
      {
        text: '',
        value: 'commentUpdate',
        align: 'center',
        sortable: false,
        width: '80'
      }
    ],
    searchParams: {
      page: 1,
      limit: 4
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
    this.loginUserIdx = this.$cookies.get('authUser').idx
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
    open(data) {
      alert('open')
      this.post = _.cloneDeep(data)
      this.dialog = true
      this.loadData()
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
    },
    async loadData() {
      const postIdx = this.post.idx || 0
      try {
        // const postIdx = this.post.idx
        this.loading = true
        const response = await this.$axios.get('/api/comment/' + postIdx, {
          params: this.searchParams
        })
        this.loading = false
        this.comments = _.get(response, 'data.rows', [])
        this.total = _.get(response, 'data.count', 0)
        this.searchParams.page = _.get(response, 'data.page', 1)
        this.commentUserIdx = this.comments.user_idx
      } catch (error) {
        alert(error)
      }
      //  조회수
      try {
        this.$axios.get('/api/posts/viewsUpdate', {
          params: {
            postIdx
          }
        })
      } catch (error) {}
      try {
        const contents = await this.$axios.get('/api/posts/findContents', {
          params: {
            postIdx
          }
        })
        this.contents = _.get(contents, 'data', [])
        this.fileName = this.contents.fileName
      } catch (error) {}
    },
    commentsChunks(comments) {
      return _.chunk(comments, 4)
    },
    selectedComment(comment, { expand, isExpanded }) {
      if (!expand) expand(isExpanded)
    },
    async likeComment(commentIdx, likesStatus) {
      const response = await this.$axios.get(
        '/api/comment/likes/' + commentIdx,
        {
          params: {
            user_idx: this.$cookies.get('authUser').idx,
            likes_status: likesStatus
          }
        }
      )
      if (response.status === 200) {
        alert('좋아요 클릭됨.')
        this.loadData()
      }
    },
    async dislikeComment(commentIdx, likesStatus) {
      const response = await this.$axios.get(
        '/api/comment/dislike/' + commentIdx,
        {
          params: {
            user_idx: this.$cookies.get('authUser').idx, // login idx
            likes_status: likesStatus
          }
        }
      )
      if (response.status === 200) {
        alert('싫어요 클릭됨.')
        this.loadData()
      }
    },
    commentUpdate(item) {
      this.$refs.CommentUpdateDialog.open(item)
    },
    PostAndContentUpdate() {
      const item = this.post
      this.$refs.PostUpdateDialog.open(item)
    }
  }
}
</script>

<style></style>
