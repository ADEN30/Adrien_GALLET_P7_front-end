




<script>
import axiosCLI from "../../axios/index";

export default {
    name: "PostsVue",
    data(){
        return{
            posts: [],
            postId: null,
            comment:{
                texte: "",
                display: false
            },
            like:{
              user: localStorage.getItem("like") 
            },
            tools:{
                display: false
            },
            user:{
                userId: "", 
                droit: 2,
            },
            nbr_post: 1
            
        }
    },
    computed:{
    },
    beforeCreate(){
        axiosCLI.defaults.headers.common['x-xsrf-token'] = localStorage.getItem("token");
            
            axiosCLI.get('/posts')
            .then(data =>{
                let post = [];
                this.user.userId = data.data.userId;
                this.user.droit = data.data.droit;
                for(let i = 0; i <data.data.post_no_comment.length; i++){
                    post.push(data.data.post_no_comment[i]);
                }
                for(let i = 0; i <data.data.publication_commenter.length; i++){
                    post.push(data.data.publication_commenter[i])
                }
                if(post.length > 1){
                    let nbr_post = post.length;
                    let compteur = 0;
                    do{
                        let index = 0;
                        if(post.length > 1){
                        let id_1= post[0].id_post;
                            for(let i = 1; i< post.length; i++){

                                if(id_1 > post[i].id_post){
                                    index = 0;
                                }
                                else if(id_1 < post[i].id_post){
                                    id_1 = post[i].id_post;
                                    index = i;
                                }
                            }
                        }
                        this.posts.push(post[index]);
                        post.splice(index, 1);
                        
                        compteur+=1 ;
                        
                    }while(compteur < nbr_post);
                }
                else{
                    this.posts.push(post[0]);
                }
            })
            .catch(err => console.log(err));
    },
    methods:{
        create_commentaire(event, index){
            event.preventDefault();
            if(this.comment.texte != ""){

            
            axiosCLI.post("/posts/comment",{
                post: this.postId,
                comment: `${this.comment.texte}`
            })
            .then(data => {
                const reponse = data.data;
                let comment = {
                    comment: `${this.comment.texte}`,
                    ...reponse
                };
                this.posts[index].comment.push(comment)
                this.comment.texte = "";
            })
            .catch(err => {console.log(err);});
            }
            else{
                alert("Impossible de créé un commentaire vide")
            }
        },
        nb_commentaire(tableau, post){
            if(this.comment.display && this.postId == post){
                let card = document.getElementById(`post_${this.postId}`)
                card.style.borderRadius = "20px";
                return tableau;
            }
            else if(tableau.length > 1){
                return [tableau[0], tableau[1]]
            }
            else{
                return tableau
            }
        },
        create_like(valeur, post){
            switch(valeur){
                case 2:{
                    axiosCLI.post("/posts/like", {post: post,like: valeur })
                        .then(data => {
                            const reponse = data.data;
                            const post_liked = this.getOnepost(post);
                            post_liked.nbLike_post = post_liked.nbLike_post + reponse.like;
                            post_liked.nbDislike_post = post_liked.nbDislike_post + reponse.dislike;
                        })
                        .catch(err => console.log(err));
                        break;
                }
                case 3:{
                    axiosCLI.post("/posts/like", {post: post,like: valeur })
                        .then(data => {
                            const reponse = data.data;
                            const post_liked = this.getOnepost(post);
                            post_liked.nbLike_post = post_liked.nbLike_post + reponse.like;
                            post_liked.nbDislike_post = post_liked.nbDislike_post + reponse.dislike;
                            
                            
                        })
                        .catch(err => console.log(err));
                        break;
                }
            }
        },
        getOnepost(id){
            for(let i = 0; i< this.posts.length; i++){
                if(this.posts[i].id_post == id){
                    return this.posts[i];
                }
            }
        },
        async delete_comment(id_comment, index, post){
            const reponse = await axiosCLI.delete("/posts/comment",{data:{post, id_comment}});
             if(reponse){
                 let post_comment = this.getOnepost(post);
                 post_comment.comment.splice(index,1);
             }

        },
        async delete_post(index, post){
            const reponse = await axiosCLI.delete("/posts/",{data:{post}});
             if(reponse){
                 this.posts.splice(index,1);
             }

        }

    }
}
</script>

<template >
<div :class="$style.container" >
    <div v-if="posts.length == 0"> Aucune publication</div>

    <article v-for="(post, numeros) of posts" :key="post.id_post" :id="'post_'+ post.id_post " :class="$style.card" >
        
            <div :class="$style.card_tools" v-if="post.userid_post == this.user.userId && post.id_post || this.user.droit == 1" >
            <div @click="this.tools.display = true; this.postId = post.id_post"><font-awesome-icon icon="ellipsis-vertical" :class="$style.card_tools_image"/></div>
            </div>

            <div v-if="this.tools.display == true && this.postId == post.id_post" :class="$style.card_tools_modif_delete">
                    <router-link :to="'/posts/'+post.id_post+'/modif/'" :id="post.id_post"><font-awesome-icon icon="pen-to-square" :class="$style.card_tool_modif_delete_image"/> Modifier</router-link>
                    <div @click="delete_post( numeros, post.id_post)"><font-awesome-icon icon="trash" :class="$style.card_tool_modif_delete_image"/> Supprimer</div>
            </div>

            <div :class="$style.card_content"  @click="this.tools.display = false"  >

                <div  :class="$style.card_user_1" :id="'user_'+ post.id_post" v-if="post.userid_post == this.user.userId || this.user.droit == 1">

                    <img :src="post.user_build.picture_user" alt="image du créateur du post" > 
                    <h1 >{{post.user_build.firstname_user}} {{post.user_build.name_user}}</h1>
                    
                </div>
                <div  :class="$style.card_user_2" :id="'user_'+ post.id_post" v-else>

                    <img :src="post.user_build.picture_user" alt="image du créateur du post" > 
                    <h1 >{{post.user_build.firstname_user}} {{post.user_build.name_user}}</h1>
                    
                </div>

            <div>

                <div :class="$style.card_content_post" :id="'content_'+ post.id_post">
                    <h2 :class="$style.card_content_post_titre"  v-if="post.titre_post != ''"> {{post.titre_post}}</h2>
                    <p :class="$style.card_content_post_texte" v-if="post.text_post != ''"> {{post.text_post}}</p>
                </div> 
                <router-link :to="`/posts/${post.id_post}`"><img :src="post.picture_post" alt="image du post" :class="$style.card_picture"></router-link>
                <div :class="$style.card_emoji">
                    <button :class="$style.card_emoji_like" type="input" name="like" :id="'like_' + post.id_post" @click="create_like(2, post.id_post)"><font-awesome-icon icon="thumbs-up" />   {{post.nbLike_post}}</button>
                    <button :class="$style.card_emoji_dislike" type="input" name="dislike" :id="'dislike_' + post.id_post" @click="create_like(3, post.id_post)"><font-awesome-icon icon="thumbs-down" />    {{post.nbDislike_post}}</button>
                </div>

            </div>
            
            <div :class="$style.card_comment" >
                <ul v-if="post.comment.length >0" :class="$style.card_comment_liste">
                    <li  v-for="(commentaire, index) in nb_commentaire(post.comment,post.id_post)"  :key="commentaire.id_user_post_comment" :class="$style.card_comment_liste_ligne" > 
                        
                        <div :class="$style.card_comment_liste_ligne_user" >
                            <img :src="commentaire.picture" alt="image du créateur du commentaire"> <p >{{commentaire.firstname}} {{commentaire.name}} </p>
                        </div> 
                        <div :class="$style.card_comment_liste_ligne_comment_delete" @click="delete_comment(commentaire.id_comment, index, post.id_post)" v-if="this.user.userId == commentaire.id_comment || this.user.droit == 1">Supprimer</div>
                        <p :class="$style.card_comment_liste_ligne_comment">{{commentaire.comment}}</p>
                    </li>
                </ul>
                <div :class="$style.card_comment_action" v-if="post.comment">
                    <div :class="$style.card_comment_action_more" v-if=" post.comment.length > 2 && this.comment.display == false || this.comment.display == true && this.postId != post.id_post" @click="this.postId= post.id_post; this.comment.display = true">{{post.comment.length -2}} autres commentaires</div> 
                    <div :class="$style.card_comment_action_less" v-else-if="post.id_post == this.postId && this.comment.display == true" @click="this.postId = null; this.comment.display = false">Réduire...</div>
                </div>
                <form :class="$style.card_comment_btn">
                    <input type="text" :class="$style.card_comment_btn_write" id="texte" v-model="comment.texte">
                    <input type="submit" @click="this.postId = post.id_post; create_commentaire($event, numeros);" value="Publier" :class="$style.card_comment_btn_send" >
                </form>
            </div>
        </div>
    </article>
</div>
</template>

<style lang="scss" module>

.container{
    display: flex;
    flex-direction: column;
    width: min-content;
    row-gap: 30px;
    padding-bottom: 20px;
}

.card{
    border-radius: 3%;
    background: linear-gradient(#f4f4f4, #e54b4b );
    box-shadow: 5px 6px 10px 0px #000000;
    padding: 10px 0px;
    z-index: 3;
    width: 500px;

    @media screen and(max-width: 510px) {
        width: 300px;
        border-radius: 20px;
    }

    &_content{
        z-index: 1;

        &_post{
            text-align: left;
            margin-bottom: 5%;
            display: flex;
            flex-direction: column;
            row-gap: 30px;
            padding-left: 20px;
            width: 90%;
            word-break: break-all;

            &_titre{

                @media screen and(max-width: 510px) {
                       font-size: 13px;
                }
            }

            &_texte{

                @media screen and(max-width: 510px) {
                    font-size: 10px;
                }

            }

            
        }
        
    }

    &_picture{
        width: 100%;
        height: 338px;
        object-fit: cover;

        @media screen and (max-width: 510px) {
            height: 200px;
        }
    }

    &_user_1, &_user_2{
        display: flex;
        align-items: center;
        column-gap: 20px;
        border-bottom: 0px;
        padding: 0px 10px;
        position: relative;
        bottom: 20px;

        h1{
            @media screen and (max-width: 510px) {
                font-size: 17px;
            }
        }
        

        img{
            height: 50px;
            width: 50px;
            border-radius: 50%;
            border: 1px solid;
            object-fit: cover;

            @media screen and (max-width: 510px) {
                height: 35px;
                width: 35px;
            }
        }
    }
    &_user_2{
        margin-bottom: 10px;
        bottom: 0px;
        
    }

    &_emoji{

        display: flex;
        column-gap: 20px;
        position: relative;
        left: 10px;
        width: min-content;
        margin: 10px 0px;

        &_like{
            display: flex;
            column-gap: 7px;
            font-size: 20px;
            background-color: white;
            border: 0px;
            padding: 4px 5px;
            border-radius: 50px;

            @media screen and(max-width: 510px) {
                font-size: 15px;
            }
        }
        &_dislike{
            display: flex;
            align-items: center;
            column-gap: 7px;
            font-size: 20px;
            background-color: white;
            border: 0px;
            padding: 4px 5px;
            border-radius: 50px;

            @media screen and(max-width: 510px) {
                font-size: 15px;
            }
        }

    }

    &_comment{
        width: 100%;

        &_liste{
            padding: 10px;
            display: flex;
            flex-direction: column;
            
            &_ligne{

                display: flex;
                flex-direction: column ;
                margin-bottom: 10px;
                list-style: none;
                border-radius: 0px;
                background-color: white;
                height: min-content;
                padding: 5px;
                border-radius: 15px;

                &_user{
                    display: flex;
                    align-items: center;
                    justify-content: left;
                    column-gap: 5px;
                    border-radius: 20px;

                    @media screen and (max-width: 510px) {
                        font-size: 13px;
                    }
                    
                    img{
                        border: 1px solid black;
                        border-radius: 50%;
                        height: 40px;
                        width: 40px;
                        object-fit: cover;
                    }
                }

                &_comment{
                    border: 1px solid black;
                    border-radius: 20px;
                    width: 80%;
                    text-align: left;
                    word-wrap: break-word;
                    margin-left: 60px;
                    padding: 5px;

                    @media screen and (max-width: 510px) {
                        margin-left: 30px;
                        font-size: 10px;
                    }

                    &_delete{
                        cursor: pointer;
                        position: relative;
                        left: 80%;
                        bottom: 40px;
                        width: min-content;

                        @media screen and (max-width: 510px) {
                            font-size: 11px;
                        }
                    }
                }
            }
            
        }

        &_action_more{
            cursor: pointer;
            margin: 0px 0px 10px 10px;
        }
        &_action_less{
            cursor: pointer;
            margin: 0px 0px 10px 10px;
        }

        &_btn{
            display: flex;
            text-align: center;
            border: 1px solid;
            border-radius: 20px;
            height: 20px;
            margin: 0px 5px;
            background-color: #909cc2;
            &_write{
                width: 90%;
                border-radius: 20px 0px 0px 20px;
                border: 0px;
                border-right: 1px solid;
                padding: 0px 0px 0px 10px;
                
            }
            &_send{
                cursor: pointer;
                width: 20%;
                border-radius: 0px 25px 25px 0px;
                border: none;
                background-color: #909cc2;
            }
        }
    }
}
.card_tools{
   position: relative;
   left: 95%;
   font-size: 30px;
   z-index: 3;
   width: min-content;
   cursor: pointer;

   @media screen and (max-width: 510px) {
        font-size: 20px;
    }

   &_modif_delete{
       display: flex;
       column-gap: 20px;
       padding-left: 10px;
        position: relative;
        bottom: 30px;
        font-size: 15px;
        z-index: 4;
        cursor: pointer;

        @media screen and (max-width: 510px) {
            font-size: 10px;
            bottom: 25px;
        }

        &_image{
            
            font-size: 10px;

            @media screen and (max-width: 510px) {
                font-size: 5px;
            }
        }

   }
}
</style>