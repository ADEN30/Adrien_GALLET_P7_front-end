<template>
<NavBar/>
<div :class="$style.box">
    <img :class="$style.box_image" :src="this.picture" alt="">
    <div>
        <div :class="$style.delete_texte"  v-if="this.droit == 1">
            <label for="user">Email du compte à supprimer</label>
            <input type="text" name="user" required :class="$style.delete_texte_btn">
        </div>
        
        <input type="input" name="delete" value="Supprimer le compte" @click="delete_accunt" :class="$style.delete_btn">
    </div>
    
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
            droit: 2,
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
        this.droit = donnee.droit_user;
    },
    methods:{
        update_picture(payload){
            this.picture = payload.picture_update;
        },
       delete_accunt(){
            const rep = axios.delete(`http://localhost:5000/api/auth/user/profil`, { data:{ user: document.getElementsByName('user')[0].value},withCredentials: true});
            if(rep){
                if(this.droit == 2){
                    this.$router.replace({path: '/'});
                }
                alert("Compte supprimé");
            }
            else{
                alert("Impossible de supprimé le compte")
            }

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

.delete_btn{
    position: absolute;
    cursor: pointer;
    bottom: 5.3%;
    left: 5%;
    width: 130px;
    height: 40px;
    border-radius: 10px;
    background-color: #ff253a;
    border: 0px;
    transform: scale(1);
}
.delete_texte{
    position: absolute;
    bottom: 12%;
    left: 5%;
    width: min-content;
    &_btn{
        padding: 5px;
        margin-top: 5px;
        width: 190px;
        height: 25px;
        border-radius: 10px;
        border: 0px;
        transform: scale(1);
    }
}
</style>