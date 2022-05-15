


<template>
    <NavBar/>
    <SinglePost :class="$style.post"/>
</template>

<script>
import SinglePost from '../components/accueil/SingleCard.vue';
import NavBar from '../components/accueil/NavBar.vue';
export default {
    name: "SingleView",
    components:{
        SinglePost,
        NavBar
    }
}
</script>


<style lang="scss" module>

.post{
    position: relative;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>