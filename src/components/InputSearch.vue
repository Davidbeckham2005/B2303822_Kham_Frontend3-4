<template>
<div class="w-xl flex justify-between h-11 border-red-500 border-4"
@keyup.enter="submit">
    <input 
    class=" flex-9 p-2"
    type="text" placeholder="Nhập thông tin cần tìm"
    :value="valueToFind"
    @input="updateValueToFind"
    >
    <button
    @click="submit" 
    class="border-2 hover:cursor-pointer"><i class="fas fa-search"></i> Tìm kiếm
</button>
</div>

</template>

<script setup>
import { ref } from 'vue';

const valueToFind = ref('') 
const emit= defineEmits(['search'])

function submit(e){
    e.preventDefault();
    emit('search',valueToFind.value)
    // console.log(valueToFind.value)
    valueToFind.value=''
}
function updateValueToFind(e){
valueToFind.value=e.target.value
}
</script>