<template>
<div :class="$style.container" >
    <div :class="$style.card">
        <div :class="$style.card_tools">
            <div ><font-awesome-icon icon="ellipsis-vertical" :class="$style.card_tools_image"/></div>
        </div>
        <div :class="$style.car_content">

                <div :class="$style.card_user">

                    <img :src="picture" alt="">
                    <h2 >Jean tend</h2>

                </div>

            <div>
                <h3 v-if="titre != ''"> {{titre}}</h3>
                <p v-if="texte != ''"> {{texte}}</p>
                <img :src="picture" alt="" :class="$style.card_picture">

                <div>

                    <button type="input" name="like">
                        <font-awesome-icon icon="thumbs-up" />   2
                    </button>

                    <button type="input" name="dislike">
                        <font-awesome-icon icon="thumbs-down" />    1
                    </button>

                </div>

            </div>
            
            <div :class="$style.card_comment">

                <ul :class="$style.card_comment_liste">

                    <li :class="$style.card_comment_liste_ligne"> 

                        <div :class="$style.card_comment_liste_ligne_user" >
                            <img :src="picture" alt=""> <p >Jean Baptiste </p>
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

.container{
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, 0%);
}

.card{
    border-radius: 3%;
    background: linear-gradient(#909cc27e, #e54b4b7d );
    box-shadow: 0px 0px 0px 1px #000000;
    padding: 10px 0px;
    z-index: 3;
    width: 500px;
    &_content{
        z-index: 1;
    }

    &_picture{
        width: 100%;
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
            height: 50px;
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