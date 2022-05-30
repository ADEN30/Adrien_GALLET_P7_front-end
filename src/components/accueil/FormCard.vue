<template>
    <form  :class="$style.form" id="editPost" @submit="verif($event)">
        <fieldset :class="$style.field">
            <legend :class="$style.field_titre" v-if="post_id">Modifié votre publication</legend>
            <legend :class="$style.field_titre" v-else>Créé votre poste</legend>

            <label for="titre">Titre</label>
            <textarea :class="$style.field_btn"  name="titre" required="required" :value="this.titre" ></textarea>

            <label for="texte">Texte</label>
            <textarea :class="$style.field_btn_texte" type="text" name="texte" required="required" :value="this.texte" ></textarea>

            <label for="picture">Image</label>
            <label for="picture" :class="$style.picture_profile" id="label_picture">{{namefile}}</label>
            <input :class="$style.field_btn_picture" type="file" id="picture" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" name="image" @change="getpicture()" v-if="post_id">
            <input :class="$style.field_btn_picture" type="file" id="picture" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" name="image"  @change="getpicture()" v-else>
            
            <input :class="$style.field_send" type="submit" value="Mettre à jour" id="update" v-if="post_id">
            <input :class="$style.field_send" type="submit" value="Créé le post" id="create"  v-if="!post_id">

        </fieldset>
    </form>
</template>

<script>
import axiosCLI from '../../axios/index'
export default {
    name: "FormCard",
    props:{
        post_id: {Number},
        titre: {String, default: ""},
        texte: {String, default: ""},
        picture: {String, default: ""}

    },
    data(){
        return {
            post_create: this.post_id,
            titre_create: this.titre,
            texte_create: this.texte,
            picture_create: this.picture,
            file: false
        }
    },
    computed:{
        namefile(){
            if(this.picture_create && !this.picture){
                return this.picture_create.split("/posts/")[1]
            }
            else if(this.picture && !this.picture_create){
                return this.picture.split("/posts/")[1]
            }
            else{
                return "Aucune image";
            }
        }
    },
    methods:{

        verif(event){
            if(!this.post_id){
                this.create(event);
            }
            else{
                this.update(event);
            }
        },
        update(event){
            event.preventDefault();
            this.post_create = this.$route.params.id;
            let data;
            if(!this.file){
                data ={
                    titre: document.getElementsByName('titre')[0].value,
                    texte: document.getElementsByName('texte')[0].value
                }
            }
            else{
                data = new FormData();
                console.log(document.getElementsByName('titre')[0])
                data.append("post", `{"titre": "${document.getElementsByName('titre')[0].value}", "texte": "${document.getElementsByName('texte')[0].value}"}`);
                data.append("image", document.getElementById('picture').files[0]);
            }
            console.log(data)
            axiosCLI.put("/posts/"+ this.post_create, data)
            .then(data => {
                let reponse1 = data.data;
                let picture = reponse1.picture;
                this.$emit('update-post',{
                    titre_update: document.getElementsByName('titre')[0].value,
                    texte_update: document.getElementsByName('texte')[0].value,
                    picture_update: picture
                });
                
            })
            .catch(err => console.log(err));
                
        },
        create(event){
            event.preventDefault();
            let data;
            if(document.getElementById('picture').files[0]){
                data ={
                    titre: document.getElementsByName('titre')[0].value,
                    texte: document.getElementsByName('texte')[0].value
                }
            
                data = new FormData();
                console.log(this.titre_create)
                data.append("post", `{"titre": "${document.getElementsByName('titre')[0].value}", "texte": "${document.getElementsByName('texte')[0].value}"}`);
                data.append("image", document.getElementById('picture').files[0]);
                axiosCLI.post("/posts", data)
                .then(() => {
                    alert("Post créé");
                    this.$router.replace({path: "/posts"});
                })
                .catch(err => console.log(err));
            }
            else{
                alert("Il faut mettre une image");
            }
        },
        getpicture(){
            this.file = true;
            let btn_picture = document.getElementById('picture');
            let label_picture = document.getElementById('label_picture');
            label_picture.innerText = btn_picture.files[0].name;
        }
    }
}
</script>

<style lang="scss" module>

.form{
    
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
        resize: none;
        min-width: 400px;
        min-height: 35px;
        padding: 10px;
        border: 0px;
        border-radius: 10px;
        box-shadow: 0px 0px 0px 1px rgba(1, 1, 1, 0.222);
        font-size: 17px;
        

        @media screen and (max-width: 510px) {
            resize: none;
            min-width: 250px;
            min-height: 100px;
        }

        &_texte{
            margin-bottom: 20px;
            resize: none;
            min-width: 400px;
            min-height: 150px;
            padding: 10px;
            border: 0px;
            border-radius: 10px;
            box-shadow: 0px 0px 0px 1px rgba(1, 1, 1, 0.222);
            font-size: 17px;

            @media screen and (max-width: 510px) {
                min-width: 250px;
                min-height: 300px;
            }
        }
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