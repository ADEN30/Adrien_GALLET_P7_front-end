<template>
<NavBar/>
<div :class="$style.box">
    <img :class="$style.box_image" :src="this.picture" alt="">
    <FormProfile :class="$style.box_form" :actuel_email="this.email" :actuel_name="this.name" :actuel_firstname="this.firstname" :actuel_picture="this.picture" @update-profile="update_picture" />
    </div>
</template>

<script>
import axios from 'axios'
import FormProfile from '../components/accueil/FormProfile.vue'
import NavBar from '../components/accueil/NavBar.vue';
export default {
    name: 'profileView',
    data(){
        return {
            email: "",
            name: "",
            firstname: "",
            picture: "",
        }
    },
    components:{
        FormProfile,
        NavBar
    },
    async beforeCreate(){
        const reponse = await axios.get(`http://localhost:5000/api/auth/user/profil`, {withCredentials: true});
        const donnee = reponse.data;
        console.log(donnee)
        this.email = donnee.email_user;
        this.name = donnee.name_user;
        this.firstname = donnee.firstname_user;
        this.picture = donnee.picture_user;
    },
    methods:{
        update_picture(payload){
            this.picture = payload.picture_update;
        }
    }
}
</script>

<style lang="scss" module>
.box{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: min-content;
    &_image{
        position: relative;
        top: 250px;
        left: 20px;
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 50%;
        z-index: 2;
    }
}
</style>