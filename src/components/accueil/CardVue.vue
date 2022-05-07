




<script>
import axios from "axios";

export default {
    name: "PostsVue",
    data(){
        return{
            posts: []
        }
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
                        let index = 1;
                        let date_1= post[0].date_post;
                        let post_to_push = 0;
                        while(index < post.lenght){
                            let date_2 = post[index].date_post;
                            date_1= date_1.replaceAll(":", "");
                            date_1= date_1.replaceAll("T", "");
                            date_1= date_1.replaceAll(".", "");
                            date_1= date_1.replaceAll("Z", "");
                            date_1= date_1.replaceAll("-", "");
                            date_1 = parseInt(date_1);
                            console.log(date_1);
                            
                            date_2= date_2.replaceAll(":", "");
                            date_2= date_2.replaceAll("T", "");
                            date_2= date_2.replaceAll(".", "");
                            date_2= date_2.replaceAll("Z", "");
                            date_2= date_2.replaceAll("-", "");
                            date_2 = parseInt(date_2);
                            console.log(date_2);

                            if(date_1 > date_2){
                                index++;
                            }
                            else if(date_1 < date_2){
                                date_1 = date_2;
                                post_to_push = index;
                                index ++;
                            }
                            
                        }
                        this.posts.push(post[post_to_push]);
                        post.splice(post_to_push, 1);
                        
                    }while(post.length > 0);
                }
                this.posts.reverse();
                console.log(this.posts);
                
                
            })
            .catch(err => console.log(err));
    },
    methods:{
        commentaire(event){
            event.preventDefault();
            axios.post("http://localhost:5000/api/posts/comment",{
                post: 2,
                comment: "Nouveau"
            }, {withCredentials: true})
            .then(data => {alert(data.data.message);location.reload()})
            .catch(err => {console.log(err);});
        }
    }
}
</script>
<template>
<div :class="$style.container">
    <div v-if="posts.length == 0"> Aucune publication</div>

    <div v-for="post of posts" :key="post.id_post" :class="$style.card">
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
                <font-awesome-icon icon="heart"/>
                <font-awesome-icon :icon="['far','heart']"/>
            </div>
            <div>
                <font-awesome-icon icon="heart"/>
                <font-awesome-icon :icon="['far','heart']"/>
            </div>
            
        </div>
        
        <div :class="$style.card_comment">
            <ul v-if="post.comment" :class="$style.card_comment_liste">
                <li v-for="commentaire in post.comment" :key="commentaire" :class="$style.card_comment_liste_ligne"> <div :class="$style.card_comment_liste_ligne_user" ><img :src="commentaire.picture" alt=""> <p>{{commentaire.firstname}} {{commentaire.name}} </p></div> <p>{{commentaire.comment}}</p></li>
            </ul>
            <div :class="$style.card_comment_btn">
                <input type="text" :class="$style.card_comment_btn_write" id="texte">
                <a @click="commentaire($event)" :class="$style.card_comment_btn_send" :id="post.id_post">Publier</a>
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