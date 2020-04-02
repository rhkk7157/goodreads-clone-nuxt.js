<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      label="E-mail"
      required
    ></v-text-field>
    <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
      label="Item"
      required
    ></v-select>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn @click="submit" class="mr-4">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
export default {}
</script>

<style></style>
