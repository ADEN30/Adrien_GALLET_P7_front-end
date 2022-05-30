<template>
  <Login :class="$style.login"/>
    
</template>

<script>
import Login from '@/components/Login.vue';

export default {
  name: 'aboutView',
  components: {
    Login
  }
}
</script>

<style lang="scss" module>

.login{
  position: relative;
  margin-top: 70px;
  left: 50%;
}
  
</style>