<template>
<div :class="$style.div">
    <form  :class="$style.form" id="editPost">
        <fieldset :class="$style.field">
            <legend :class="$style.field_titre">Modifié votre publication</legend>

            <label for="titre">Titre</label>
            <input :class="$style.field_btn" type="text" name="titre" required="true" v-model="titre" >

            <label for="name">Texte</label>
            <input :class="$style.field_btn" type="text" name="texte" required="true" v-model="texte" >

            <label for="picture">Photo de profile</label>
            <label for="picture" :class="$style.picture_profile" id="label_picture">{{namefile}}</label>
            <input :class="$style.field_btn_picture" type="file" id="picture" name="image" required="true" @change="getpicture()">
            
            <input :class="$style.field_send" type="submit" id="update" @click="send($event)">
            
        </fieldset>
    </form>
    <img :src="this.picture" alt="">
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: "CardModif",
    data(){
        return{
            post: null,
            titre: "",
            texte: "",
            picture: ""
        }
    },
    computed:{
        namefile(){
            if(this.picture.length > 0){
                return this.picture.split("/posts/")[1]
            }
            else{
                return "Aucune image";
            }
            
        }
    },
     async beforeCreate(){
        let id = this.$route.params.id;
        
        const reponse  = await axios.get(`http://localhost:5000/api/posts/${id}`, {withCredentials: true});
        
        let donnee = reponse.data;
        if(donnee.publication_commenter){
            donnee = donnee.publication_commenter[0];
        }
        else if(donnee.post_no_comment){
            donnee = donnee.post_no_comment[0];
        }
        if(donnee.titre_post != "undefined"){
            this.titre = donnee.titre_post;
        }
        if(donnee.text_post != "undefined"){
            this.texte = donnee.text_post;
        }
        if(donnee.picture_post != "undefined"){
            this.picture = donnee.picture_post;
        }
        
    },
    methods:{
        send(event){
            event.preventDefault();
            this.post = this.$route.params.id;
            console.log(this.post);
            console.log(document.getElementById('editPost'));
            let data = new FormData();
            data.append("post", `{"titre": "${this.titre}", "texte": "${this.texte}"}`);
            data.append("image", document.getElementById('picture').files[0]);
                axios.put("http://localhost:5000/api/posts/"+ this.post, data,{withCredentials: true})
                .then(data => {
                    let reponse1 = data.data;
                    console.log(reponse1)
                    this.picture = reponse1.picture
                    
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