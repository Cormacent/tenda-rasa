<template>
  <section id="room-chat" class="flex flex-col mt-16" ref="RoomChat">
    <h1 class="text-2xl font-bold p-4 pb-0">Chat</h1>
    <div class="card p-4 rounded flex flex-row gap-4 items-center bg-white mx-4 mt-4">
      <img :src="importImage('robot.svg')" alt="Robot" class="w-16 h-16" />
      <div class="flex flex-col justify-center items-center h-16">
        <h3 class="mb-1 text-lg font-semibold">TerraBot</h3>
        <p class="text-sm">
          <span class="inline-block w-3 h-3 rounded-full bg-primary border-2 border-white" title="Online"></span>
          <span class="ml-1 text-xs font-medium">Online</span>
        </p>
      </div>
    </div>
    <div class="flex-1 flex flex-col rounded mt-4 mx-4 mb-4 shadow overflow-hidden relative">
      <!-- Messages area -->
      <div class="flex-1 overflow-y-auto p-4 pb-32 space-y-4 custom-scrollbar">
        <div v-for="(msg, idx) in messages" :key="idx"
          :class="msg.role === 'user' ? 'flex items-end justify-end' : 'flex items-start  '">
          <BubbleContainer :chat="msg" />
        </div>
      </div>
      <!-- Input area fixed at bottom -->
      <div class="p-4 bg-white flex items-center gap-2 border-t absolute left-0 right-0 bottom-0">
        <el-input v-model="message" placeholder="Ketik pesan..." class="flex-1" size="large" clearable
          @keyup.enter="sendMessage" />
        <el-button type="primary" size="large" @click="sendMessage">
          <icon-ep-position class="text-white" />
        </el-button>
      </div>
    </div>
  </section>

</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoomChat } from './RoomChat.logic';
import { formatPrice, importImage } from '@/utils/helper';
import { useChatbotStore } from '@/store/chatbot';
import { useChatSocket } from '@/plugins/socket';
import BubbleContainer from './components/bubble-container/BubbleContainer.vue';



//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const { message, mounted } = useRoomChat();
const chatbotStore = useChatbotStore()
const { socket } = useChatSocket();
const { messages } = useRoomChat();

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------


//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------

onMounted(() => {
  mounted.value = true;
  getAllChat()
});
onBeforeUnmount(() => {
  socket.value?.disconnect()
})
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------

const sendMessage = async () => {
  if (!message.value.trim()) return;
  await chatbotStore.sendPrompt(message.value);
};


const getAllChat = async () => {
  const response = await chatbotStore.getAllChatByEmail('zakimaulana08@gmail.com');
  if (response) {
    messages.value = response
  } else {
    console.error("Gagal mendapatkan chat");
  }
};

</script>

<style scoped lang="scss" src="./RoomChat.scss"></style>
