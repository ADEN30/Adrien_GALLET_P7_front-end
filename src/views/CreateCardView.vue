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
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2%;
    box-shadow: 1px 1px 5px 0px rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    width: 500px;
    background: linear-gradient(#909cc2, #e54b4b );
    padding: 20px 0px;
    margin-bottom: 20px;

    @media screen and (max-width: 510px) {
                width: 300px;
            }
}
</style>