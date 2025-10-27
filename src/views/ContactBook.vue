<template>
       <div class="p-3 gap-2 flex flex-col items-center border-2">

         <div>
            <InputSearch 
            class="border-2"
           @search="searchTextF"

            ></InputSearch>
        </div>
       
       <div class="flex gap-3 ">
         <div>
           <h1 class="text-xl">Danh bạ <i class="fas fa-address-book"></i></h1>
        <ContactList 
       class=" min-w-90 h-40 overflow-y-auto border-green-600 border-4"
        :contacts=contactFiller
        v-model:activeID="activeIndex"
        ></ContactList>
          <div class=" mt-3 text-white flex justify-between tex">
        <button @click="refesh" class="rounded bg-blue-600 p-1  hover:cursor-pointer"><i class="fas fa-redo"></i>Làm mới</button>
         <button @click="goToAddContact" class="rounded bg-green-600 p-1 hover:cursor-pointer">
          
          <i class="fas fa-plus"></i>Thêm mới</button>
        <button @click="removeAllContact" class="rounded bg-red-600 p-1  hover:cursor-pointer"><i class="fas fa-trash"></i>Xóa tất cả</button>
     
       </div>
        </div>
  
    <div class="p-1 min-w-3xs">
      <h1 class="text-xl ">
        Chi tiết liên hệ <i class="fas fa-address-card"></i>
      </h1>
      <ContactCard 
      class=" min-h-40 border-4 border-blue-400"
      :contact="activeContact"></ContactCard>
    </div>
       </div>

       </div>
</template>

<script setup>
import contactService from '@/services/contact.service';
import InputSearch from '@/components/InputSearch.vue';
import ContactCard from '@/components/ContactCard.vue';
import ContactList from '@/components/ContactList.vue';
import { useRouter } from 'vue-router';
import {computed, ref, watch} from 'vue'

const router = useRouter()
const activeIndex = ref(-1)
const searchText = ref('')

const contacts = ref([''])

const activeContact = computed(()=> {
  if(activeIndex.value<0 ) return null
  return contacts.value.find(contact => contact._id===activeIndex.value)
})
function searchTextF(text){
 searchText.value = text;
}
const contactFiller = computed(()=>{
  if(searchText.value){
    const text = searchText.value
    // searchText.value=''
   return contacts.value.filter(contact => contact.name.toLowerCase().includes(text.toLowerCase()))
  }
  // console.log(contacts.value)
  return contacts.value
})
// console.log(contactFiller.value)
async function  refesh(){
try {
  contacts.value = await contactService.getAll();
  // console.log(contacts.value)
} catch (error) {
  console.log(error)
}

}
// refesh()
async function removeAllContact(){
try{
  await contactService.deleteAll()
  refesh()
  // console.log(contacts.value)
}catch(error){
  console.log(error)
}
}
function goToAddContact(){
  router.push('/contactAdd')
}
</script>