<script>
import Vue from 'vue'

export default Vue.extend({
  mounted: function () {
    this.$auth.login()
  }
})
</script>
