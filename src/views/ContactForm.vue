<template>
    <div class="flex justify-center items-center min-h-screen ">
        <Form 
        @submit="submitContact" 
         v-if="isLoad"
        :validation-schema="contactFromSchema"
         :initial-values="formValue"
            class="space-y-4 border border-gray-500 p-4 rounded-lg min-w-100 ">
            <p v-if="!id" class="text-center text-gray-600 font-medium border-b-2 border-b-blue-200">Thêm mới liên hệ</p>
            <p v-else >Chỉnh sửa liên hệ</p>
            <div class="">
                <label class="block text-gray-600 mb-1 font-medium" for="name">Tên</label>
                <Field class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="name"
                as="input"/>
                <ErrorMessage name="name" class="text-red-500"></ErrorMessage>
            </div>
             <div class="">
                <label class="block text-gray-600 mb-1 font-medium" for="email">Email</label>
                <Field class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="email"
                as="input"/>
                <ErrorMessage name="email" class="text-red-500"></ErrorMessage>
            </div>
            <div class="">
                <label class="block text-gray-600 mb-1 font-medium" for="address">Địa chỉ</label>
                <Field class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="address"
                as="input"/>
                <ErrorMessage name="address" class="text-red-500"></ErrorMessage>
            </div>
            <div class="">
                <label class="block text-gray-600 mb-1 font-medium" for="phone">Điện thoại</label>
                <Field class="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" name="phone"
                as="input"/>
                <ErrorMessage name="phone" class="text-red-500"></ErrorMessage>
            </div>
           
           <div>
  <label for="favorite" class="mr-2 font-medium"><strong>Liên hệ yêu thích</strong></label>
  <Field 
    type="checkbox" 
    name="favorite" 
    as="input" 
    :value="true" 
    :unchecked-value="false" 
    class="mr-1"
  />
</div>

            <div :class="['flex',id?'justify-around':'']">
                <button class="justify-self-center rounded-lg border-2 pl-2 pr-2 bg-blue-500"
              type="submit"
                >Lưu
            </button>
                <button
                @click="deleteContact"
                 v-if="id" 
                 type="button"
                class="bg-red-500 rounded-lg border-2 pl-2 pr-2 ">
                Xóa
            </button>
               
                <button v-if="id" 
                 @click="turn"
                type="button"
                class="bg-gray-500 rounded-lg border-2 pl-2 pr-2">
                Thoát
            </button>
            </div>
        </Form>
    </div>

</template>


<script setup>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { useRoute, useRouter } from 'vue-router'
    import contactService from "@/services/contact.service";
    import { computed, onMounted,ref } from "vue";
    const router = useRouter();
    const route = useRoute();
    const contact = ref({});
    const id = route.query.id;
    const formValue = ref({favorite:false});
    const isLoad = ref(false);

    const contactFromSchema = yup.object().shape({
        name: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(2, "Tên phải có ít nhất 2 ký tự.")
            .max(50, "Tên có nhiều nhất 50 ký tự."),
        email: yup
            .string()
            .email("Email không đúng.")
            .max(50, "E-mail tối đa 50 ký tự"),
        address: yup
            .string()
            .max(100, "Địa chỉ tối đa 100 ký tự."),
        phone: yup
            .string()
            .matches(
                /((09|03|07|08|05)+([0-9]{8})\b)/g,
                "Số điện thoại không hợp lệ."
            ),
        
    })
async function submitContact(values) {
       try{
            console.log("click submit")

        if(!id){
            await contactService.create(values)
        }else{
        await contactService.update(id, values)
       }
        router.push("/")
       }catch(error){
        console.log("co loi xay ra")
       }
    }
onMounted(async()=>{
  if(id) {
    contact.value = await contactService.get(id)
     formValue.value = { ...contact.value }
  }
  isLoad.value=true
})
async function deleteContact(){
 
    await contactService.delete(id)
    router.push("/")
}
function turn(){
    router.push("/")
}
</script>