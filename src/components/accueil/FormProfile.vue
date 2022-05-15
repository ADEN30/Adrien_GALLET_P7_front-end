<script>
import axios from "axios";

export default {
    name: "FormProfile",
    props:{
        actuel_email: {String},
        actuel_name: {String},
        actuel_firstname: {String},
        actuel_picture:{String}
    },
    data() {
        return {
            name: this.actuel_name,
            firstname: this.actuel_firstname,
            email: this.actuel_email,
            picture: this.actuel_picture,
            file: false
        }
    },
    computed:{
        namefile(){
            if(!this.file){
                return this.actuel_picture.split("/users/")[1]
            }
            else if(this.file){
                return document.getElementById('picture').files[0].name;
               
            }
            else{
                return "Aucune image";
            }
        }
    },
    methods:{
        update(event){
            event.preventDefault();
            let data; console.log(document.getElementById('picture').files[0]);
            if(this.file){
                data = new FormData();
                data.set("client", `{"email": "${document.getElementsByName("email")[0].value}", "name": "${document.getElementsByName("name")[0].value}", "firstname": "${document.getElementsByName("firstname")[0].value}"}`);
                data.set("image", document.getElementById('picture').files[0]);
            }
            else{
                data = {
                    email: document.getElementsByName("email")[0].value,
                    name: document.getElementsByName("name")[0].value,
                    firstname: document.getElementsByName("firstname")[0].value

                }
            }

            axios.put("http://localhost:5000/api/auth/user/profil", data, {withCredentials: true})
            .then(response => {
                console.log(response)
                let donnee = response.data;
                this.$emit('update-profile', {
                    picture_update: donnee.picture
                })
                
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
    <form  :class="$style.form" id="update_profile">
        <fieldset :class="$style.field" name="client">
            <legend :class="$style.field_titre">Profile</legend>

            <label for="email">Email</label>
            <input :class="$style.field_btn" type="email" name="email" pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" :value="this.actuel_email" >

            <label for="name">Nom</label>
            <input :class="$style.field_btn" type="text" name="name" required="true" :value="this.actuel_name" >

            <label for="firstname">Prénom</label>
            <input :class="$style.field_btn" type="text" name="firstname" required="true" :value="this.actuel_firstname" >
        
            <label for="picture">Photo de profile</label>
            <label for="picture" :class="$style.picture_profile" id="label_picture">{{namefile}}</label>
            <input :class="$style.field_btn_picture" type="file" id="picture" name="image" required="true" @change="this.file= true; getpicture() "> 
            
            <input :class="$style.field_send" type="submit" value="Mettre à jour" @click="update($event)">
            
        </fieldset>
    </form>
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
    width: 700px;
    background: linear-gradient(#909cc2, #e54b4b );
    padding: 20px 0px;

    &_login{
        font-size: 18px;

        &:hover{
            color: #084887;
        }
    }
}

.form{
    position: relative;
    left: 10%;
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
        max-width: 250px;
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
        width: 250px;
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