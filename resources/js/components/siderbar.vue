<template>
    <div
        class="bg-black fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-3 rounded-tr-xl rounded-br-xl text-white z-1 transition-all"
        :class="{ 'left-0': showSidebar, '-left-full': !showSidebar }"
    >
        <ul class="pl-1">
            <!-- logo  -->
            <li>
                <h3 class="m-8 ml-3 font-semibold text-2xl">NOTES</h3>
            </li>
            <!-- options  -->
            <router-link to="/home">
                <li
                    :class="[
                        $route.path == '/home'
                            ? 'text-[#04162d] bg-[#E7E8F3]'
                            : 'text-default',
                    ]"
                    class="hover:bg-[#E7E8F3] hover:text-black text-center p-4 rounded-tl-xl rounded-bl-xl transition"
                >
                    <span class="material-icons text-2xl"> home </span>
                </li>
            </router-link>

        </ul>
        <!-- div logout  -->
        <div>
            <ul class="pl-4 mb-10 lg:mb-0">
                <li
                    class="hover:bg-[#E7E8F3] hover:text-[#04162d] rounded-tl-xl rounded-bl-xl p-4 text-center transition"
                >
                    <router-link to="/" @click="logout()">
                        <span class="material-icons text-2xl"> logout </span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
    <!-- menu movil  -->
    <nav
        class="bg-[#04162d] lg:hidden fixed w-full mb-0 bottom-[0] left-0 text-2xl text-white py-2 px-8 flex items-center justify-between rounded-tl-md rounded-tr-md z-50"
    >
        <router-link to="/home">
            <button class="p-2">
                <span class="material-icons"> home </span>
            </button>
        </router-link>
        <router-link to="/">
            <button class="p-2">
                <span class="material-icons"> logout </span>
            </button>
        </router-link>
        <button @click="toggleSidebar()" class="p-2">
            <span class="material-icons">
                {{ showSidebar ? "close" : "menu" }}
            </span>
        </button>
    </nav>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from 'vuex';


const store = useStore();

let showSidebar = ref(false);
function toggleSidebar() {
    showSidebar.value = !showSidebar.value;
}

const logout = () => {
    store.dispatch('logoutUser'); 
    router.push('/');
};


</script>
