<template>
    <div>
        <Sidebar v-if="!$route.meta.sideBar"/>
        <router-view></router-view>
    </div>
</template>


<script setup>
import Sidebar from '../js/components/siderbar.vue';

</script>

