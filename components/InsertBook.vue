<template>
  <v-dialog
    v-model="dialog"
    class="text-center fill-height"
    style="overflow: hidden"
    max-width="700"
  >
    <v-card fluid class="pa-4 mt-2">
      <v-card-title>insert</v-card-title>
      <v-card-text>
        <!-- <ValidationObserver
          ref="observer"
          v-slot="{ validate, reset }"
        ></ValidationObserver>-->
        <v-form>
          <v-text-field
            v-model="MainTitle"
            label="책이름"
            prepend-icon="mdi-book-open-variant"
            type="text"
            outlined
          />
          <v-text-field
            v-model="SubTitle"
            label="한줄설명"
            prepend-icon="mdi-plus-circle"
            type="text"
            outlined
          />
          <v-textarea
            v-model="Content"
            label="책내용"
            outlined
            rows="3"
            auto-grow
            row-height="25"
            prepend-icon="mdi-comment-text-multiple-outline"
          ></v-textarea>
          <input ref="inputUpload" @change="onFileSelected" type="file" />
          <!-- <v-file-input
            ref="inputUpload"
            @change="onFileSelected"
            accept="image/*"
            single
            prepend-icon="mdi-file-image"
            outlined
          ></v-file-input>-->
          <v-card-text>{{ message }}</v-card-text>
          <v-select
            v-model="selectValue"
            :items="selectItems"
            label="category"
            prepend-icon="mdi-format-list-bulleted"
            type="text"
            outlined
          />
          <v-row>
            <v-col cols="12" md="6">
              <v-btn @click="insertBook" color="primary" block dark>Save</v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn @click="clear" block dark>Clear</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import _ from 'lodash'
export default {
  data: () => ({
    user: {},
    dialog: false,
    mainImg: null,
    MainTitle: null,
    SubTitle: null,
    Content: null,
    message: null,
    selectItems: ['Cook', 'Travel', 'Art', 'WebToon'],
    selectValue: ['Cook', 'Travel', 'Art', 'WebToon']
  }),
  methods: {
    open(data) {
      this.user = _.cloneDeep(data)
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$emit('onClosed')
    },
    cancel() {
      this.dialog = false
    },
    clear() {
      this.MainTitle = ''
      this.SubTitle = ''
      this.Content = ''
      this.mainImg = ''
      this.selectValue = ''
      this.$refs.observer.reset()
    },
    onFileSelected($event) {
      this.mainImg = this.$refs.inputUpload.files[0]
      // const files = $event.target.files || $event.target.files
      // const form = this.getFormData(files)
      // if (files) {
      //   if (files.length > 0) {
      //     this.filename = [...files].map((file) => file.name).join(', ')
      //   } else {
      //     this.filename = null
      //   }
      // } else {
      //   this.filename = $event.target.value.split('\\').pop()
      // }
    },
    // getFormData(files) {
    //   const forms = []
    //   for (const file of files) {
    //     const form = new FormData()
    //     form.append('data', file, file.name)
    //     forms.push(form)
    //   }
    //   return forms
    // },
    async insertBook() {
      const formData = new FormData()
      console.log(formData)
      formData.append('file', this.mainImg)
      // const authUser = this.$cookies.get('authUser')
      // try {
      //   const response = await this.$axios.get('/api/posts/insert/', {
      //     params: {
      //       user_idx: this.user.idx,
      //       title: this.MainTitle,
      //       sub_title: this.SubTitle,
      //       content: this.Content,
      //       category: this.selectValue
      //     }
      //   })
      //   this.dialog = false
      //   console.log(response)
      // } catch (error) {}

      if (!this.mainImg) {
        this.message = 'no file'
      }
      const img = await this.$axios.post('/api/posts/img/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(img)
    }
  }
}
</script>

<style></style>
