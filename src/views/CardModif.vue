<template>
    <NavBar/>
    <form-card :class="$style.form" :post_id="this.post" :titre="this.titre" :texte="this.texte" :picture="this.picture" @update-post="update_data"/>
    <card-modif :class="$style.post" :picture="this.picture" :titre="this.titre" :texte="this.texte"/>
</template>

<script>
import NavBar from '../components/accueil/NavBar.vue';
import FormCard from '../components/accueil/FormCard.vue';
import CardModif from '../components/accueil/CardModif.vue';
import axios from 'axios';
export default {
    name: "FormulaireModif",
    components:{
        FormCard,
        CardModif,
        NavBar
    },
    data(){
        return{
            post: null,
            titre: "",
            texte: "",
            picture: ""
        }
    },
    methods:{
        update_data(payload){
            this.titre = payload.titre_update;
            this.texte = payload.texte_update;
            this.picture = payload.picture_update;
        }
    },
    async beforeCreate(){
        let id = this.$route.params.id;
        
        const reponse  = await axios.get(`http://localhost:5000/api/posts/${id}`, {withCredentials: true});
        let donnee = reponse.data;
        if(donnee.publication_commenter.length >0){
            donnee = donnee.publication_commenter[0];
        }
        else if(donnee.post_no_comment.length >0){
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
        this.post = donnee.id_post;
    }
}
</script>

<style lang="scss" module>
.form{
    position: relative;
    transform: translateX(-50%);
    left: 50%;
    top: 40px;
}
.post{
    position: relative;
    width: min-content;
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
    padding-bottom: 30px;
}
</style>