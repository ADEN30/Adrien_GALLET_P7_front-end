<template>
    <div :class="$style.div">
    <form  :class="$style.form" id="editPost">
        <fieldset :class="$style.field">
            <legend :class="$style.field_titre" v-if="post_id">Modifié votre publication</legend>
            <legend :class="$style.field_titre" v-else>Créé votre poste</legend>

            <label for="titre">Titre</label>
            <input :class="$style.field_btn" type="text" name="titre" :value="this.titre" >

            <label for="name">Texte</label>
            <input :class="$style.field_btn" type="text" name="texte" :value="this.texte" >

            <label for="picture">Image</label>
            <label for="picture" :class="$style.picture_profile" id="label_picture" required>{{namefile}}</label>
            <input :class="$style.field_btn_picture" type="file" id="picture" required  name="image" @change="getpicture()" v-if="post_id">
            <input :class="$style.field_btn_picture" type="file" id="picture" required name="image"  @change="getpicture()" v-else>
            
            <input :class="$style.field_send" type="submit" value="Mettre à jour" id="update" @click="update($event)" v-if="post_id">
            <input :class="$style.field_send" type="submit" value="Créé le post" id="update" @click="create($event)" v-if="!post_id">

        </fieldset>
    </form>
</div>
</template>

<script>
import axios from 'axios'
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
        update(event){
            event.preventDefault();
            this.post_create = this.$route.params.id;
            console.log(document.getElementById('editPost'));
            let data;
            console.log(document.getElementsByName('titre')[0].value)
            if(!this.file){
                data ={
                    titre: document.getElementsByName('titre')[0].value,
                    texte: document.getElementsByName('texte')[0].value
                }
            }
            else{
                data = new FormData();
                console.log(this.titre_create)
                data.append("post", `{"titre": "${document.getElementsByName('texte')[0].value}", "texte": "${document.getElementsByName('texte')[0].value}"}`);
                data.append("image", document.getElementById('picture').files[0]);
            }
            console.log(data)
            axios.put("http://localhost:5000/api/posts/"+ this.post_create, data,{withCredentials: true})
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
                    titre: this.titre_create,
                    texte: this.texte_create
                }
            
                data = new FormData();
                console.log(this.titre_create)
                data.append("post", `{"titre": "${this.titre_create}", "texte": "${this.texte_create}"}`);
                data.append("image", document.getElementById('picture').files[0]);
                axios.post("http://localhost:5000/api/posts/", data,{withCredentials: true})
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
.div{
    border-radius: 2%;
    box-shadow: 1px 1px 5px 0px rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    position: absolute;
    width: 500px;
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
        opacity: 0;
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