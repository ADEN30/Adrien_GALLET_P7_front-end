<template>
<div :class="$style.container" >
    <div :class="$style.card">
        <div :class="$style.card_tools">
            <div ><font-awesome-icon icon="ellipsis-vertical" :class="$style.card_tools_image"/></div>
        </div>
        <div :class="$style.car_content">

                <div :class="$style.card_user">

                    <img :src="picture" alt="">
                    <h1 >Jean tend</h1>

                </div>

            <div >
                <div :class="$style.card_content_post">
                    <h2 :class="$style.card_content_post_titre" v-if="titre != ''"> {{titre}}</h2>
                    <p :class="$style.card_content_post_texte" v-if="texte != ''"> {{texte}}</p>
                </div>
                
                <img :src="picture" alt="photo de profile" :class="$style.card_picture">

                <div :class="$style.card_emoji">

                    <button :class="$style.card_emoji_like" type="input" name="like">
                        <font-awesome-icon icon="thumbs-up" />   2
                    </button>

                    <button :class="$style.card_emoji_dislike" type="input" name="dislike">
                        <font-awesome-icon icon="thumbs-down" />    1
                    </button>

                </div>

            </div>
            
            <div :class="$style.card_comment">

                <ul :class="$style.card_comment_liste">

                    <li :class="$style.card_comment_liste_ligne"> 

                        <div :class="$style.card_comment_liste_ligne_user" >
                            <img :src="picture" alt="image du post"> <p >Jean Baptiste </p>
                        </div> 
                        <p :class="$style.card_comment_liste_ligne_comment">C'est très beau !</p>
                    </li>

                </ul>

                <div >
                    <div>2 autres commentaires</div> 
                </div>
                <div :class="$style.card_comment_btn">
                    <input type="text" :class="$style.card_comment_btn_write" placeholder="Commenter ici..."> 
                    <div :class="$style.card_comment_btn_send" >Publier</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "CardModif",
    props:{
        picture: {String},
        texte: {String},
        titre: {String},
    }
}
</script>

<style lang="scss" module>



.card{
    border-radius: 3%;
    background: linear-gradient(#f4f4f4, #e54b4b );
    box-shadow: 5px 6px 10px 0px #000000;
    padding: 10px 0px;
    z-index: 3;
    width: 500px;

    @media screen and(max-width: 510px) {
        width: 300px;
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

            &_titre{
                width: 250px;
                word-wrap: break-word;

                @media screen and(max-width: 510px) {
                    font-size: 17px;
                }
            }

            &_texte{
                word-wrap: break-word;
                width: 90%;

                @media screen and(max-width: 510px) {
                    font-size: 13px;
                }

            }

            
        }
    }

    &_picture{
        width: 100%;
        height: 300px;
        object-fit: cover;

        @media screen and (max-width: 510px) {
            height: 150px;
        }
    }

    &_user{
        display: flex;
        align-items: center;
        column-gap: 20px;
        border-bottom: 0px;
        padding: 0px 10px;
        position: relative;
        bottom: 20px;

        h1{

            @media screen and (max-width: 510px) {
                font-size: 20px;
            }
        }

        img{
            width: 50px;
            border-radius: 50%;
            border: 1px solid;
            object-fit: cover;
            height: 50px;
        }
    }

    &_emoji{

        display: flex;
        column-gap: 20px;
        position: relative;
        left: 20px;
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

            @media screen and (max-width: 610px) {
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

            @media screen and (max-width: 610px) {
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
                background-color: #909cc2af;
                height: min-content;
                padding: 5px;
                border-radius: 15px;
                &_user{
                    display: flex;
                    align-items: center;
                    justify-content: left;
                    column-gap: 5px;
                    border-radius: 20px;
                    
                    img{
                        border-radius: 50%;
                        height: 40px;
                        width: 40px;
                        object-fit: cover;

                        @media screen and (max-width: 510px) {
                            height: 35px;
                            width: 35px;
                        }
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
            align-items: center;
            border: 1px solid;
            border-radius: 20px;
            height: 40px;
            margin: 0px 5px;
            background-color: #909cc2;
            &_write{
                height: 100%;
                width: 90%;
                border-radius: 20px 0px 0px 20px;
                border: 0px;
                border-right: 1px solid;
                padding: 0px 0px 0px 10px;
                background-color: white;
                
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
   width: min-content;

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