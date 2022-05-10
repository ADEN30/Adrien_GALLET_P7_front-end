




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
                nbr: []
            },
            like:{
              user: localStorage.getItem("like") 
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
            else if(tableau.length > 1 && this.postId != post ){
                this.comment.nbr = [tableau[0], tableau[1]];
                return this.comment.nbr;
            }
            else if(tableau.length > 1 && this.postId == post){
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

<template>
<div :class="$style.container">
    <div v-if="posts.length == 0"> Aucune publication</div>

    <div v-for="post of posts" :key="post.id_post" :id="'post_'+ post.id_post " :class="$style.card">
        <div v-if="!post.user_build" :class="$style.card_user">
            <img :src="post.picture_user" alt="">
            <h2 >{{post.firstname_user}} {{post.name_user}}</h2>
        </div>
        <div  :class="$style.card_user" v-else>
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
                <li  v-for="commentaire in nb_commentaire(post.comment,post.id_post)"  :key="commentaire.id_user_post_comment" :class="$style.card_comment_liste_ligne" > <div :class="$style.card_comment_liste_ligne_user" ><img :src="commentaire.picture" alt=""> <p>{{commentaire.firstname}} {{commentaire.name}} </p></div> <p>{{commentaire.comment}}</p></li>
            </ul>
            <div v-if="post.comment.length > 2" >
                <p v-if="!this.postId || this.postId && post.id_post != this.postId" @click="this.postId= post.id_post">Voir plus...</p> 
                <p v-else-if="this.postId != null && post.id_post == this.postId" @click="this.postId = null">Réduire...</p>
            </div>
            <div :class="$style.card_comment_btn">
                <input type="text" :class="$style.card_comment_btn_write" id="texte" v-model="comment.texte">
                <a @click="create_commentaire($event, post.id_post)" :class="$style.card_comment_btn_send" >Publier</a>
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
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    border-radius: 3%;
    background-color: white;
    box-shadow: 0px 0px 0px 1px #000000;
    padding: 10px 0px;

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
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            padding: 10px;

            &_ligne{
                text-align: center;
                align-items: center;
                list-style: none;
                display: flex;
                border-radius: 20px;
                column-gap: 20px;
                background-color: #9c999961  ;
                
                &_user{
                    display: flex;
                    justify-content: left;
                    align-items: center;
                    column-gap: 5px;
                    border-radius: 20px;
                    padding-right: 10px;
                    background-color: white;
                }

                img{
                    border-radius: 50%;
                    width: 40px;
                    object-fit: cover;
                }
            }
            
        }

        &_btn{
            text-align: center;
            border: 1px solid;
            border-radius: 20px;
            margin: 5px;
            background-color: #909cc2;
            &_write{
                padding: 2px 8px;
                outline: none;
                width: 85%;
                border-radius: 20px 0px 0px 20px;
                border: 0px;
                border-right: 1px solid;
                
            }
            &_send{
                cursor: pointer;
                padding: 3px;
                width: 100%;
            }
        }
    }
}


</style>