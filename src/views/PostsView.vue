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
  background-color: white;
  }
  .posts{
    margin: auto;
  }
</style>