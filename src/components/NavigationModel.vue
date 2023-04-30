<template>
    <nav v-show="true" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="logo">
            LOGO IS HERE
        </div>
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link to="/Muscles/Legs" class="nav-item nav-link">Legs</router-link>
            <router-link to="/Muscles/Back" class="nav-item nav-link">Back</router-link>
            <router-link to="/Muscles/Chest" class="nav-item nav-link">Chest</router-link>
            <router-link to="/Muscles/Shoulder" class="nav-item nav-link">Shoulder</router-link>
            <router-link to="/Muscles/Triceps" class="nav-item nav-link">Triceps</router-link>
            <router-link to="/Muscles/Bicepts" class="nav-item nav-link">Bicepts</router-link>
        </div>
    </nav>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.navbar{
    display: flex;
    width: 100%;
    height: 4rem;
    justify-content: start;
    background: rgb(36, 165, 75);
}
.navbar-nav{
    display: flex;
    width: 100%;
    justify-content: start;
    align-items: center;
}
.nav-item{
    margin-left: 1rem;
    margin-right: 1rem;
    color: white;
    text-decoration: none;
}
.nav-item:hover{
    color: blue;
}
.logo{
    width: 20%;
}
</style>