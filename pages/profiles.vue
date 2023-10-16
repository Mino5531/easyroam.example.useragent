<script>
import Vue from 'vue'

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export default Vue.extend({
  data () {
    return {
      profiles: []
    }
  },
  async fetch () {
    const { store, $config } = this.$nuxt.context
    const { apiURL } = $config
    this.profiles = await fetch(`${apiURL}/api/profile`, {
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
  },
  methods: {
    async requestProfile () {
      const { store, $config } = this.$nuxt.context
      const { apiURL } = $config
      const guid = crypto.randomUUID()
      const data = {
        format: 'pkcs12',
        allowAuth: false,
        DeviceType: 'Other'
      }
      const profile = await fetch(`${apiURL}/api/profile/${guid}_prf`, {
        headers: {
          Authorization: `${store.$auth.strategy.token.get()}`,
          'x-api-version': '1.0',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
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
      const blob = b64toBlob(profile.data, 'application/x-pkcs12')
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `${profile.name}.p12`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      this.$fetch()
    },
    async revokeProfile (serial) {
      const { store, $config } = this.$nuxt.context
      const { apiURL } = $config
      await fetch(`${apiURL}/api/profile/${serial}`, {
        headers: {
          Authorization: `${store.$auth.strategy.token.get()}`,
          'x-api-version': '1.0'
        },
        method: 'DELETE'
      })
      this.$fetch()
    }
  }
})
</script>
<template>
  <div>
    <div v-if="$fetchState.pending">
      <b-spinner label="Spinning" />
    </div>
    <div v-else>
      <div style="display: flex;">
        <h5>Profiles</h5>
        <a class="btn btn-outline-primary ml-auto" @click="requestProfile">New Profile</a>
      </div>
      <div v-for="profile in profiles" :key="profile.serial">
        <b-card class="mb-2 mt-2">
          <b-card-text style="display: flex;">
            <p>Name: {{ profile.name }}</p>
            <a class="btn btn-outline-danger ml-auto" @click="revokeProfile(profile.serial)">Revoke</a>
          </b-card-text>
          <b-card-text>Serial: {{ profile.serial }}<br>Device type: {{ profile.deviceType }}</b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>
