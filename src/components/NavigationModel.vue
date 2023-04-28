<script setup>

</script>

<template>
    <nav v-show="true" class="navbar navbar-expand navbar-dark bg-dark">
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