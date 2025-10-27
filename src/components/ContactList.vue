<template>
<div>
    <ul>
        <li class="min-w-3xs p-1 hover:bg-blue-500 hover:cursor-pointer" 
        @click="signalChoose(contact._id)"
        v-for="(contact) in contacts" :key="contact._id"
        >{{ contact.name }}</li>
    </ul>
</div>
</template>

<script setup>
const props = defineProps({
    contacts: Array,
    activeIndex: Number,
})
const emit = defineEmits(['update:activeID'])
function signalChoose(id){
    emit('update:activeID',id)
}
</script>