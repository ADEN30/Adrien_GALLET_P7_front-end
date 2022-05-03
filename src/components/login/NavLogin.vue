<template>

<nav :class="$style.nav">
  <div :class="$style.nav_image"><img src="../../assets/Groupomania_Logos/icon-left-font.png" alt="Groupomania_Logos" :class="$style.Groupomania_Logos"></div>
  <div :class="$style.nav_link">
  <router-link :class="$style.nav_link_route" to="/login" name="login">Login</router-link>
  <router-link :class="$style.nav_link_route" to="/singup" name="singup">Singup</router-link>
  </div>
</nav>

  <router-view/>
</template>

<script>
export default {
  name: 'NavLogin'
}
</script>

<style module lang="scss">

.Groupomania_Logos{
    width: 400px;
    height: 70px;
    object-fit: cover;
}
.nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 2px solid red;
  margin: 10px;
  background: linear-gradient(rgba(189, 99, 99, 0.574), rgba(213, 18, 18, 0.625));

  &_image{
    display: block;
  }
  &_link{
    display: flex;
    justify-content: space-between;
    width: auto;
    &_route{
      font-size: 20px;
      margin-left: 30px;
    }
  }
  
}
</style>
