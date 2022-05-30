
<script>
import axiosCLI from "../axios/index";
import io from 'socket.io-client';

export default {
    name: "LoginVue",
    data(){
        return {
            email: "",
            password:"",
            socket: io("http://localhost:3030/")
        }
    },
    beforeUDestroy() {
            this.socket.on("connect", (socket)=>{
                        console.log(socket.id);
                    })
    },
    components:{
    },
    methods:{
        send(event){
            event.preventDefault();
                axiosCLI.post("/auth/login", {
                        email: this.email,
                        password: this.password})
                .then(response => {
                    const token = response.data.xsrfToken;
                    localStorage.setItem("token", token);
                    this.$router.replace({path: '/posts'});
                    
                })
                .catch(() => alert("L'adresse email rt/ou le mot de passe est invalide"));
                
        }
    }
}

</script>


<template>
<div :class="$style.div">
    <img src="../assets/Groupomania_Logos/icon.svg" alt="logo groupomania" :class="$style.div_logo">
    <form  :class="$style.form" id="login" @submit="send($event)">
        <fieldset :class="$style.field" form="login">
            <legend :class="$style.field_titre">Connectez-vous</legend>

            <label for="email">Email</label>
            <input :class="$style.field_btn"  type="email" name="email" required="required" pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" autocomplete="email" v-model="email" >
        
        
            <label for="password">Mot de passe</label>
            <input :class="$style.field_btn" type="password" id="password" required="required" v-model="password"> 
            <input :class="$style.field_send" type="submit" id="envoi_login" value="Se connecter">
        </fieldset>
        
    </form>
    <router-link :class="$style.div_singup" to="singup"> Créez un compte</router-link>
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
    width: 500px;
    height: 600px;
    transform: translate(-50%);
    background: linear-gradient(#909cc2, #e54b4b );

    @media screen and (max-width: 510px) {
        width: 300px;
    }

    &_logo{
        width : 200px;
        object-fit: cover;
    }

    &_singup{
        font-size: 16px;

        &:hover{
            color: #084887;
        }
    }
}
.form{
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;

    label{
        padding-bottom: 5px;
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