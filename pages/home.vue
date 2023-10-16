<script>
import Vue from 'vue'

export default Vue.extend({
  auth: true
})
</script>
<template>
  <div>
    <h5>Home</h5>
    <p>If you can read this, then you have been successfully authenticated!</p>
    <p>
      Your user-id is: <b>{{ $auth.user.sub }}</b> <br>
      Your pairwise-id is: <b>{{ $auth.user.pairwise_id }}</b> <br>
      Your session-id is: <b>{{ $auth.user.sid }}</b>
    </p>
  </div>
</template>
