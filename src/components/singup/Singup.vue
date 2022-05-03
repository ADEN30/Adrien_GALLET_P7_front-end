<script>
import NavLogin from '../login/NavLogin.vue';
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
        NavLogin
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
            /* const formulaire = document.getElementById("singup"); */
            console.log(document.getElementById('singup'));
            let data = new FormData();
            data.append("client", `{"email": "${this.email}", "name": "${this.name}", "firstname": "${this.firstname}", "password": "${this.password}"}`);
            data.append("image", document.getElementById('picture').files[0]);
                axios.post("http://localhost:5000/api/auth/singup", data)
                .then(response => {
                    if(response.data.ok)
                    JSON.parse(response.data);
                    
                    
                })
                .catch(err => console.log(err));
                
        }
    }
}
</script>


<template>
<NavLogin/>
    <div :class="$style.div">
    
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
            <input :class="$style.field_btn" type="file" id="picture" name="image" required="true"> 
        
            <label for="password">Mot de passe</label>
            <input :class="$style.field_btn" type="password" name="password" id="password" required="true" v-model="password"> 
            
            <input type="submit" id="envoi_login" @click="send($event)">
            
        </fieldset>
    </form>
</div>
</template>



<style lang="scss" module>

.div{
    position: absolute;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.field{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
    border: 0px;
    background: linear-gradient(rgba(189, 99, 99, 0.574), rgba(213, 18, 18, 0.625));

        &_titre{
            text-align: center;
            font-size: 30px;
            padding-bottom: 40px;
        }

        &_btn{
            margin-bottom: 20px;
            width: 200px;
            height: 35px;
            border-radius: 20px;
            box-shadow: 0px 0px 0px 1px rgba(1, 1, 1, 0.222);
    }
}
</style>