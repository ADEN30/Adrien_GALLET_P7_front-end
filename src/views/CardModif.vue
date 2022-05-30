<template>
    <NavBar/>
    <div :class="$style.content">
        <form-card :class="$style.form" :post_id="this.post" :titre="this.titre" :texte="this.texte" :picture="this.picture" @update-post="update_data"/>
        <card-modif :class="$style.post" :picture="this.picture" :titre="this.titre" :texte="this.texte"/>
    </div>
</template>

<script>
import NavBar from '../components/accueil/NavBar.vue';
import FormCard from '../components/accueil/FormCard.vue';
import CardModif from '../components/accueil/CardModif.vue';
import axiosCLI from '../axios/index';
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
        
        const reponse  = await axiosCLI.get(`/posts/${id}`);
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

.content{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    align-items: center;
}

.form{
    border-radius: 2%;
    box-shadow: 1px 1px 5px 0px rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    width: 500px;
    background: linear-gradient(#909cc2, #e54b4b );
    padding: 20px 0px;

    @media screen and (max-width: 510px) {
                width: 300px;
            }
}
</style>