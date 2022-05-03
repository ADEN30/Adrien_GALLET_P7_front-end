
<script>
import axios from "axios";
import store from "@/store";
import NavLogin from './NavLogin.vue';
import io from 'socket.io-client';

export default {
    name: "LoginVue",
    data(){
        return {
            email: " ",
            password:"",
            socket: io("http://localhost:3000/")
        }
    },
    beforeUDestroy() {
            this.socket.on("connect", (socket)=>{
                        console.log(socket.id);
                    })
    },
    computed:{
        
    },
    components:{
        NavLogin
    },
    methods:{
        send(){
                axios.post("http://localhost:3000/api/auth/login", {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                    if(response.data.ok)
                    JSON.parse(response.data);
                    const token = response.data.token;
                    console.log(this.email+"::::"+ token);
                    store.state.user.token = token;
                    store.state.user.data = {userId: response.data.userId, droit: response.data.droit};
                    
                })
                .catch(err => console.log(err));
                
        }
    }
}

</script>


<template>
<NavLogin/>
<div :class="$style.div">
    
    <form  :class="$style.form">
        <fieldset :class="$style.field">
            <legend :class="$style.field_titre">Connectez-vous</legend>

            <label for="email">Email</label>
            <input :class="$style.field_btn" type="email" name="email" required="true" autocomplete="email" v-model="email" >
        
        
            <label for="password">Mot de passe</label>
            <input :class="$style.field_btn" type="password" id="password" required="true" v-model="password"> 
            
            <input type="submit" id="envoi_login" @click="send()">
            
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