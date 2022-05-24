<template>
  <SingupVue :class="$style.singup"/>
    
</template>

<script>
import SingupVue from '@/components/Singup.vue';

export default {
  name: 'singupView',
  components: {
    SingupVue
  }
}
</script>

<style lang="scss" module>
.singup{
  position: relative;
  margin-top: 70px;
  left: 50%;
  transform: translateX(-50%);
}
</style>