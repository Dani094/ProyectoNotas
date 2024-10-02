<template>
    <div class="lg:pl-40 pt-10 bg-[#E7E8F3] h-[100vh]">
        <button type="button" class="bg-green-500 p-3 rounded-3xl" @click="isModalOpen = true, isEditing = false;">
            <p class="flex justify-center items-center font-bold text-white">AGREGAR NOTA<span class="material-icons text-2xl"> add </span></p>
        </button>
        

        <!-- card note -->
        <div class="flex flex-wrap w-full gap-6">
            <div v-for="note in notes" :key="note.id" class="bg-black text-white w-full sm:w-1/2 lg:w-1/6 mt-20 p-8 rounded-2xl">
                <div class="w-full mb-4" @click="deleteItem(note.id)">
                    <span class="material-icons text-2xl flex justify-end cursor-pointer"> close </span>
                </div>
                <div class="flex w-full justify-between">
                    <h3 class="font-bold text-2xl mb-5 ">{{ note.title }}</h3> 
                    <button><span class="material-icons text-2xl" @click="isModalOpen = true, isEditing = true, info(note)"> edit </span>
                    </button>
                </div>
                <p>{{ note.description }}</p>
                <p class="text-end mt-4 underline">#{{ note.label }}</p>
            </div>
        </div>

        <!-- Formulario -->
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div class="bg-white p-8 rounded-2xl w-[400px]">
                <div class="w-full mb-4 flex justify-between">
                    <h3 class="font-bold text-2xl">{{ isEditing ? 'Editar Nota' : 'Agregar Nota' }}</h3>
                    <span @click="closeModal" class="material-icons text-2xl cursor-pointer"> close </span>
                </div>
                <!-- Formulario -->
                <form @submit.prevent="isEditing ? PutNote() : PostNote()">
                    <div class="mb-4">
                        <label for="title" class="block font-bold mb-1">Título</label>
                        <input v-model="title" id="title" type="text" class="w-full border border-gray-300 p-2 rounded" placeholder="Título" required>
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block font-bold mb-1">Descripción</label>
                        <textarea v-model="description" id="description" class="w-full border border-gray-300 p-2 rounded" placeholder="Descripción" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="tag" class="block font-bold mb-1">Etiqueta</label>
                        <input v-model="label" id="tag" type="text" class="w-full border border-gray-300 p-2 rounded" placeholder="Ej: Tareas" required>
                    </div>
                     <!-- boton guardar nota -->
                    <div class="flex justify-end">
                        <button type="submit" class="bg-green-500 text-white p-2 rounded-3xl">{{ isEditing ? 'Actualizar Nota' : 'Guardar Nota' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import { useStore } from 'vuex';
import { sweetDelete } from "../js/Global/sweetAlert2.js"

const store = useStore();
let isModalOpen = ref(false);

let title=ref("")
let description=ref("")
let userId = ref("");
let label=ref("")
let noteId=ref("")

let isEditing = ref(false);

let notes = ref([]);

async function GetNotes() {
  try {
    const res = await store.dispatch('GetNotesForUser', userId.value);
    if (res) {
      notes.value = res;
    }
  } catch (error) {
    console.error("Error al obtener las notas:", error);
  }
}


async function PostNote() {
  isModalOpen.value = true;
  isEditing.value = false;
  const newNote = { title: title.value, description: description.value, user_id: userId.value, label: label.value };

  const response = await store.dispatch('PostNotes', newNote);
  if (response) {
    GetNotes()
    clean();
    isModalOpen.value = false; 
  }
}

async function PutNote() {
    const updatedNote = {
    id: noteId.value,
    title: title.value,
    description: description.value,
    user_id: userId.value   , 
    label: label.value,
  };

  const response = await store.dispatch('PutNotes', updatedNote);
  if (response) {
    GetNotes();
    closeModal();
    clean();
  }
}

async function deleteItem(id) {
    sweetDelete(id, async () => {
        try {
            await store.dispatch('DeleteNote', id); 
            await GetNotes();
            sweetPositive("La nota se ha eliminado con éxito."); 
        } catch (error) {
            console.log("Error al eliminar la nota:", error);
        }
    });
}

function closeModal() {
  isModalOpen.value = false;
  clean();
}

function info(note) {
    noteId.value = note.id;
    title.value = note.title; 
    description.value = note.description;
    label.value = note.label; 
}

function clean() {
    noteId.value = ""; 
    title.value = '';
    description.value = '';
    label.value = '';
}

onMounted(() => {
    userId.value = store.getters.getUserId;
    GetNotes();
});
</script>
