<script>
import axios from "axios";

export default {
    name: "singupVue",
    data() {
        return {
            name: "",
            firstname: "",
            email: "",
            password: ""
        }
    },
    components: {
    },
    computed:{
        data(){
            const data = new FormData();
            data.set("client", "bonjour")
            data.set("image", {"file" :document.getElementById("picture")});
            
            return data;
        }
        
    },
    methods:{
        send(event){
            event.preventDefault();
            console.log(document.getElementById('singup'));
            let data = new FormData();
            data.append("client", `{"email": "${this.email}", "name": "${this.name}", "firstname": "${this.firstname}", "password": "${this.password}"}`);
            data.append("image", document.getElementById('picture').files[0]);
                axios.post("http://localhost:5000/api/auth/singup", data)
                .then(() => {
                    alert("Compte créé")
                    this.$router.push({path: '/'});
                    
                    
                })
                .catch(err => console.log(err));
                
        },
        getpicture(){
            let btn_picture = document.getElementById('picture');
            let label_picture = document.getElementById('label_picture');
            label_picture.innerText = btn_picture.files[0].name;
        }
    }
}


</script>


<template>
    <div :class="$style.div">
    <img src="../assets/Groupomania_Logos/icon-left-font-monochrome-black.svg" alt="" :class="$style.div_logo">
    <form  :class="$style.form" id="singup">
        <fieldset :class="$style.field">
            <legend :class="$style.field_titre">Inscrivez-vous</legend>

            <label for="email">Email</label>
            <input :class="$style.field_btn" type="email" name="email" required="true" autocomplete="email" v-model="email" >

            <label for="name">Nom</label>
            <input :class="$style.field_btn" type="text" name="name" required="true" v-model="name" >

            <label for="firstname">Prénom</label>
            <input :class="$style.field_btn" type="text" name="firstname" required="true" v-model="firstname" >

            <label for="picture">Photo de profile</label>
            <label for="picture" :class="$style.picture_profile" id="label_picture">Choisir une image...</label>
            <input :class="$style.field_btn_picture" type="file" id="picture" name="image" required="true" @change="getpicture()"> 

            <label for="password">Mot de passe</label>
            <input :class="$style.field_btn" type="password" name="password" id="password" required="true" v-model="password"> 
            
            <input :class="$style.field_send" type="submit" id="envoi_login" @click="send($event)">
            
        </fieldset>
    </form>
    <router-link :class="$style.div_login" to="/"> Connectez-vous </router-link>
    <router-view/>
</div>
</template>



<style lang="scss" module>

.div{
    border-radius: 2%;
    box-shadow: 1px 1px 5px 0px rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    position: absolute;
    width: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(#909cc2, #e54b4b );
    padding: 20px 0px;

    &_logo{
        width : 600px;
    }

    &_login{
        font-size: 18px;

        &:hover{
            color: #084887;
        }
    }
}

.form{
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
    
    label{
        font-size: 19px;
        padding-bottom: 5px;
    }

    .picture_profile{
        display: block;
        cursor: pointer;
        position: relative;
        height: 65px;
        text-align: center;
        font-size: 17px;
        color: black;
        margin-bottom: 20px;
        min-width: 200px;
        max-width: 200px;
        height: 35px;
        padding: 10px;
        border: 0px;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0px 0px 0px 1px rgba(1, 1, 1, 0.222);
        overflow: hidden;
        text-overflow: ellipsis;
        z-index: 1;

        
    }
}
.field{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
    border: 0px;
    

    &_titre{
        text-align: center;
        font-size: 30px;
    }

    &_btn{
        margin-bottom: 20px;
        width: 200px;
        height: 35px;
        padding: 10px;
        border: 0px;
        border-radius: 10px;
        box-shadow: 0px 0px 0px 1px rgba(1, 1, 1, 0.222);
        font-size: 17px;
        &:focus-visible{
            outline: none;
        }
    }
    &_btn_picture{
        display: none;
        z-index: 0;

        &:focus-visible{
            outline: none;
        }
    }
    &_send{
        cursor: pointer;
        width: 150px;
        height: 40px;
        border-radius: 10px;
        background-color: #909cc2;
        border: 0px;
        margin-top: 20px;
        transform: scale(1);

        &:focus-visible{
            outline: none;
            border: 1px solid;
            border-color: rgba(255,255,255,1);
            transform: scale(1.1);
        }
        &:hover{
            transform: scale(1.1);
        }
    }
}



</style>