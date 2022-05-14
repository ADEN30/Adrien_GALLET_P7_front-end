<template>
<div :class="$style.box">
    <FormProfile :class="$style.box_form" :actuel_email="this.email" :actuel_name="this.name" :actuel_firstname="this.firstname" :actuel_picture="this.picture" @update-profile="update_picture" />
        <img :class="$style.box_image" :src="this.picture" alt="">
        
    </div>
</template>

<script>
import axios from 'axios'
import FormProfile from '../components/accueil/FormProfile.vue'
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
        FormProfile
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
            this.picture = payload.picture;
        }
    }
}
</script>

<style lang="scss" module>
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &_image{
        position: relative;
        transform: translate(-100%, -60%);
        width: 200px;
        border-radius: 50%;
    }
}
</style>