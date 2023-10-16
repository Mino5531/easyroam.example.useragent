<script>
import Vue from 'vue'

export default Vue.extend({
  middleware: ['auth'],
  auth: false
})
</script>
