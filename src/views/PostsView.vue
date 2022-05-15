<script>
import PostsVue from '../components/accueil/CardVue.vue'
import NavBar from '../components/accueil/NavBar.vue';

export default {
    name: 'PostsView',
    components: {
        PostsVue,
        NavBar
    }
}
</script>



<template>
  <NavBar :class="$style.nav" />
  <PostsVue :class="$style.posts"/>
</template>


<style lang='scss' module>

.posts{
  position: relative;
  top: 20px;
  left: 45%;
  transform: translateX(-50%);
}
</style>