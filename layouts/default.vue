<script>
import Vue from 'vue'

export default Vue.extend({
  methods: {
    login () {
      this.$auth.login()
    },
    logout () {
      this.$auth.logout()
    }
  }
})
</script>

<template>
  <div>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-normal">
        easyroam example
      </h5>
      <nav v-if="$auth.loggedIn" class="my-2 my-md-0 mr-md-3">
        <NuxtLink to="/home" class="p-2 text-dark">
          Home
        </NuxtLink>
        <NuxtLink to="/profiles" class="p-2 text-dark">
          Profiles
        </NuxtLink>
        <NuxtLink to="/realm" class="p-2 text-dark">
          My Realm
        </NuxtLink>
      </nav>
      <a v-if="$auth.loggedIn" class="btn btn-outline-primary" @click="logout">
        Sign out
      </a>
      <a v-else class="btn btn-outline-primary" @click="login">
        Sign in
      </a>
    </div>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>
