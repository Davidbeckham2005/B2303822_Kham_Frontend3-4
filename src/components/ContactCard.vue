<template>
<div v-if="contact">
    <div class="p-1"><strong>Tên: </strong>{{ contact.name }}</div>
    <div class="p-1"><strong>Email: </strong>{{ contact.email }}</div>
    <div class="p-1"><strong>Địa chỉ: </strong>{{ contact.address }}</div>
    <div class="p-1"><strong>Điện thoại: </strong> {{ contact.phone }}</div>
    <div class="p-1"><strong>Liên hệ yêu thích
<i :class="['fas',contact.favorite?'fa-check':'fa-times']"></i></strong></div>
</div>
<div v-else>
    <p>Chưa chọn liên hệ nào</p>
</div>

</template>

<script setup>
const props = defineProps({
    contact: Object,
})
</script>