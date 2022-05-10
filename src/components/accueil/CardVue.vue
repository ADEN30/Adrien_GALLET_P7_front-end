




<script>
import axios from "axios";

export default {
    name: "PostsVue",
    data(){
        return{
            posts: [],
            postId: null,
            comment:{
                texte: "",
                nbr: [],
                display: false
            },
            like:{
              user: localStorage.getItem("like") 
            },
            tools:{
                display: false
            },
            user:{
                userId: ""
            }
            
        }
    },
    computed:{
    },
    beforeCreate(){
        axios.defaults.headers.common['x-xsrf-token'] = localStorage.getItem("token");
        axios.get('http://localhost:5000/api/posts', {
            withCredentials: true})
            .then(data =>{
                let post = [];
                this.user.userId = data.data.userId;
                for(let i = 0; i <data.data.post_no_comment.length; i++){
                    post.push(data.data.post_no_comment[i]);
                }
                for(let i = 0; i <data.data.publication_commenter.length; i++){
                    post.push(data.data.publication_commenter[i])
                }
                if(post.length > 1){

                    do{
                        let id_1= post[0].id_post;
                        for(let i = 1; i< post.length; i++){

                            if(id_1 > post[i].id_post){
                                console.log(id_1);
                            }
                            else if(id_1 < post[i].id_post){
                                id_1 = post[i].id_post;
                            }
                        }

                        let index = post.indexOf(id_1);
                        this.posts.push(post[id_1-1]);
                        post.splice(index, 1);
                        
                    }while(post.length > 0);
                }
            })
            .catch(err => console.log(err));
    },
    methods:{
        create_commentaire(event, id_post){
            event.preventDefault();
            
            axios.post("http://localhost:5000/api/posts/comment",{
                post: id_post,
                comment: `${this.comment.texte}`
            }, {withCredentials: true})
            .then(data => {
                const reponse = data.data;
                const post_comment = this.getOnepost(id_post);
                let comment = {
                comment: `${this.comment.texte}`,
                ...reponse
            };
                post_comment.comment.push(comment)
                this.postId = id_post;
                this.comment.texte = "";
            })
            .catch(err => {console.log(err);});
        },
        nb_commentaire(tableau, post){
            if(tableau.length ==1){
                return tableau;
            }
            else if(tableau.length > 1  && !this.comment.display ){
                this.comment.nbr = [tableau[0], tableau[1]];
                return this.comment.nbr;
            }
            else if(tableau.length > 1 && this.postId == post && this.comment.display){
                return tableau;
            }
        },
        create_like(valeur, post){
            switch(valeur){
                case 2:{
                    axios.post("http://localhost:5000/api/posts/like", {post: post,like: valeur }, {withCredentials: true})
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
                    axios.post("http://localhost:5000/api/posts/like", {post: post,like: valeur }, {withCredentials: true})
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
        }

    }
}
</script>

<template >
<div :class="$style.container" >
    <div v-if="posts.length == 0"> Aucune publication</div>

    <div v-for="post of posts" :key="post.id_post" :id="'post_'+ post.id_post " :class="$style.card" >
        
            <div :class="$style.card_tools" v-if="this.user.userId == post.userid_post">
            <div @click="this.tools.display = true; this.postId = post.id_post"><font-awesome-icon icon="ellipsis-vertical" :class="$style.card_tools_image"/></div>
            </div>

            <div v-if="this.tools.display == true && this.postId == post.id_post" :class="$style.card_tools_modif_delete">
                    <router-link to="modif"><font-awesome-icon icon="pen-to-square" :class="$style.card_tool_modif_delete_image"/> Modifier</router-link>
                    <div><font-awesome-icon icon="trash" :class="$style.card_tool_modif_delete_image"/> Supprimer</div>
            </div>
            <div :class="$style.car_content" @click="this.tools.display = false">
                <div v-if="!post.user_build" :class="$style.card_user">

                    <img :src="post.picture_user" alt="">
                    <h2 >{{post.firstname_user}} {{post.name_user}}</h2>
                </div>
                <div  :class="$style.card_user" v-else >

                    <img :src="post.user_build.picture_user" alt="" >
                    <h2 >{{post.user_build.firstname_user}} {{post.user_build.name_user}}</h2>
                    
                </div>
            <div>
                <img :src="post.picture_post" alt="" :class="$style.card_picture">
                <div>
                    <button type="input" name="like" :id="'like_' + post.id_post" @click="create_like(2, post.id_post)"><font-awesome-icon icon="thumbs-up" />   {{post.nbLike_post}}</button>
                    <button type="input" name="dislike" :id="'dislike_' + post.id_post" @click="create_like(3, post.id_post)"><font-awesome-icon icon="thumbs-down" />    {{post.nbDislike_post}}</button>
                </div>
            </div>
            
            <div :class="$style.card_comment">
                <ul v-if="post.comment" :class="$style.card_comment_liste">
                    <li  v-for="commentaire in nb_commentaire(post.comment,post.id_post)"  :key="commentaire.id_user_post_comment" :class="$style.card_comment_liste_ligne" > 
                        <div :class="$style.card_comment_liste_ligne_user" >
                            <img :src="commentaire.picture" alt=""> <p >{{commentaire.firstname}} {{commentaire.name}} </p>
                        </div> <p :class="$style.card_comment_liste_ligne_comment">{{commentaire.comment}}</p>
                    </li>
                </ul>
                <div v-if="post.comment.length > 2" >
                    <div v-if=" this.comment.display == false || this.comment.display == true && this.postId != post.id_post" @click="this.postId= post.id_post; this.comment.display = true">{{post.comment.length}} autres commentaires</div> 
                    <div v-else-if="post.id_post == this.postId && this.comment.display == true" @click="this.postId = null; this.comment.display = false">Réduire...</div>
                </div>
                <div :class="$style.card_comment_btn">
                    <input type="text" :class="$style.card_comment_btn_write" id="texte" v-model="comment.texte">
                    <a @click="create_commentaire($event, post.id_post)" :class="$style.card_comment_btn_send" >Publier</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" module>
.container{
    display: flex;
    flex-direction: column;
    width: min-content;
    row-gap: 30px;
}
.card{
    border-radius: 3%;
    background-color: white;
    box-shadow: 0px 0px 0px 1px #000000;
    padding: 10px 0px;
    z-index: 3;
    
    &_content{
        z-index: 1;
    }

    &_picture{
        max-width: 400px ;
        object-fit: cover;
    }

    &_user{
        display: flex;
        align-items: center;
        column-gap: 20px;
        border-bottom: 0px;
        padding: 0px 10px;
        position: relative;
        bottom: 20px;

        img{
            width: 50px;
            border-radius: 50%;
            border: 1px solid;
            object-fit: cover;
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
                background-color: #9c999961;
                height: min-content;
                padding: 5px;
                border-radius: 15px;
                &_user{
                    display: flex;
                    align-items: center;
                    justify-content: left;
                    column-gap: 5px;
                    border-radius: 20px;

                    p{
                        
                    }
                    
                    img{
                        border-radius: 50%;
                        width: 40px;
                        object-fit: cover;
                    }
                }

                &_comment{
                    border: 1px solid black;
                    border-radius: 20px;
                    max-width: 300px;
                    text-align: left;
                    word-wrap: break-word;
                    margin-left: 60px;
                    padding: 5px;
                }
            }
            
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
            }
        }
    }
}
.card_tools{
   position: relative;
   left: 95%;
   font-size: 30px;
   z-index: 3;

   &_modif_delete{
       display: flex;
       column-gap: 20px;
       padding-left: 10px;
        position: relative;
        bottom: 30px;
        font-size: 15px;
        z-index: 4;

        &_image{
            
            font-size: 10px;
        }

   }
}
</style>