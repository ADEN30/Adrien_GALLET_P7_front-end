


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
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
}
body{
    background-color: #0848875c;
}
</style>