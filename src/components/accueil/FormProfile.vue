<script>
import axiosCLI from "../../axios/index";

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
                if(!this.actuel_picture.split("/users/")[1]){
                    return "Aucune image";
                }
                else{
                    return this.actuel_picture.split("/users/")[1];
                }
                
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

            axiosCLI.put("/auth/user/profil", data)
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

<form  :class="$style.form" id="update_profile" @submit="update($event)">
    <fieldset :class="$style.field" name="client" form="update_profile">
        <legend :class="$style.field_titre">Profil</legend>

        <label for="email">Email</label>
        <input :class="$style.field_btn" type="email" name="email" required="required" pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" :value="this.actuel_email" >

        <label for="name">Nom</label>
        <input :class="$style.field_btn" type="text" name="name" required="required" pattern="^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$" :value="this.actuel_name" >

        <label for="firstname">Prénom</label>
        <input :class="$style.field_btn" type="text" name="firstname" required="required" pattern="^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$" :value="this.actuel_firstname" >
    
        <label for="picture">Photo de profil</label>
        <label for="picture" :class="$style.picture_profile" id="label_picture">{{namefile}}</label>
        <input :class="$style.field_btn_picture" type="file" id="picture" name="image" required="required" pattern="^.*\.(png|jpeg|jpg|gif)$" @change="this.file= true; getpicture() "> 
        
        <input :class="$style.field_send" type="submit" value="Mettre à jour">
        
    </fieldset>
</form>
</template>



<style lang="scss" module>


.form{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
    position: relative;
    
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