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
        ></ValidationObserver> -->
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
          <v-file-input
            v-model="mainImg"
            chips
            label="MainImg"
            prepend-icon="mdi-file-image"
            outlined
          ></v-file-input>
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
              <v-btn color="primary" block dark>Save</v-btn>
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
export default {
  data: () => ({
    dialog: false,
    mainImg: null,
    MainTitle: null,
    SubTitle: null,
    Content: null,
    selectItems: ['Programming', 'Travel', 'Art', 'English'],
    selectValue: ['Programming', 'Travel', 'Art', 'English']
  }),
  methods: {
    open() {
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
    }
  }
}
</script>

<style></style>
