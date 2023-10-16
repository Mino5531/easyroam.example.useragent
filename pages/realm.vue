<script>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      realm: {}
    }
  },
  async fetch () {
    const { store, $config } = this.$nuxt.context
    const { apiURL } = $config
    this.realm = await fetch(`${apiURL}/api/realm`, {
      headers: {
        Authorization: `${store.$auth.strategy.token.get()}`,
        'x-api-version': '1.0'
      }
    }).then(async (res) => {
      if (res.ok) {
        const json = await res.json()
        if (json.result === 'ok') {
          return json.data
        } else {
          this.request_id = json.request_id
          throw new Error(json.error_description)
        }
      } else {
        const json = await res.json()
        this.request_id = json.request_id
        throw new Error(json.error_description)
      }
    })
  }
})
</script>
<template>
  <div>
    <div v-if="$fetchState.pending">
      <b-spinner label="Spinning" />
    </div>
    <div v-else>
      <h5>My Realm</h5>
      <p>
        Your realm is <b>{{ realm.realmName }}</b><br>
        Your realms display name is <b>{{ realm.displayName||"not set" }}</b><br>
        Max profiles is set to <b>{{ realm.maxProfiles }}</b><br>
        Max validity is set to <b>{{ realm.maxValid }}</b>
      </p>
    </div>
  </div>
</template>
