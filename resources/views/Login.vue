<template>
    <div class="bg-[#E7E8F3] w-full h-[100vh] items-center justify-center flex">
        <form @submit.prevent="validar"  class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
        >
            <div
                class="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-black to-black bg-clip-border text-white shadow-lg shadow-black"
            >
                <h3
                    class="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased"
                >
                    INICIAR SESIÓN
                </h3>
            </div>
            <div class="flex flex-col gap-4 p-6">
                <div class="relative h-11 w-full min-w-[200px]">
                    <input
                        placeholder=""
                        v-model="user"
                        class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label
                        class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
                        Email
                    </label>
                </div>
                <div class="relative h-11 w-full min-w-[200px]">
                    <input
                        placeholder=""
                        v-model="password"
                        type="password"
                        @input="validatePassword"
                        class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    />
                    <label
                        class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                    >
                        Contraseña
                    </label>
                    <!-- Mensaje de error -->
                        <p v-if="passwordError" class="text-red-500 text-sm mt-1">
                        {{ passwordError }}
                        </p>
                </div>
            </div>
            <div class="p-6 pt-0">
                <button
                    data-ripple-light="true"
                    type="submit"
                    :loading="loading"
                    class="block w-full select-none rounded-lg bg-gradient-to-tr from-black to-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Iniciar
                </button>
                <p
                    class="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased"
                >
                    No tienes cuenta?
                    <router-link to="/crearCuenta">
                        <a
                            class="ml-1 block font-sans text-sm font-bold leading-normal text-black antialiased"
                        >
                            Crear Cuenta
                        </a></router-link
                    >
                </p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
 
let user = ref("danielM@gmail.com");
let password = ref("12345678");
let router = useRouter();
let loading = ref(false);
const store = useStore();
let passwordError = ref("")

async function validar() {
    try {
        loading.value = true;
        const response = await store.dispatch('newLogin', {
            user: user.value,
            password: password.value,
        });

        if (response) {
            clean()
            pasarHome(); 
        }
    } catch (error) {
        console.error("Error en la validación:", error);
        clean()
        //notifyError("Usuario o contraseña inválidos."); 
    } finally {
        loading.value = false;
    }
}

function validatePassword() {
  passwordError.value =
    password.value.length < 8 ? 'La contraseña debe tener al menos 8 caracteres.' : ''
}

function clean(){
    user.value= "",
    password.value= ""
}

function pasarHome() {
    router.push("/home");
}
</script>
<a href=""></a>