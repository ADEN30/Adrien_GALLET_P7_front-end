<script>
import PostsVue from '../components/accueil/CardVue.vue'

export default {
    name: 'PostsView',
    components: {
        PostsVue
    }
}
</script>



<template>
   <PostsVue :class="$style.posts"/>
</template>


<style lang='scss' module>
body{
  background-color: #0848875c;
  }
  .posts{
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>