<template>
    <NavBar />
    <FormCard :class="$style.post"/>
</template>

<script>
import FormCard from '../components/accueil/FormCard.vue';
import NavBar from '../components/accueil/NavBar.vue'
export default {
    components:{
        FormCard,
        NavBar
    }
}
</script>


<style lang="scss" module>

.post{
    position: relative;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
}
</style>