


<template>
    <SinglePost :class="$style.post"/>
</template>

<script>
import SinglePost from '../components/accueil/SingleCard.vue'
export default {
    name: "SingleView",
    components:{
        SinglePost
    }
}
</script>


<style lang="scss" module>

.post{
    margin: auto;
}
body{
    padding: 50px;
}
</style>