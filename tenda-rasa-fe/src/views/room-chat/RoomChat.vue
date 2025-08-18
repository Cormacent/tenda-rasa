<template>
  <section id="room-chat" class="relative h-[calc(100vh-7rem)] container mx-auto px-4" ref="RoomChat">
    <!-- Header -->
    <h1 class="text-2xl font-bold">Chat</h1>
    <div class="card p-4 rounded flex gap-4 items-center bg-white">
      <img :src="importImage('robot.svg')" alt="Robot" class="w-16 h-16" />
      <div class="flex flex-col justify-center items-center h-16">
        <h3 class="mb-1 text-lg font-semibold">TerraBot</h3>
        <p class="text-sm">
          <span class="inline-block w-3 h-3 rounded-full  border-2 border-white" :class="{
            'bg-success': isOnline,
            'bg-primary': !isOnline
          }" title="Online"></span>
          <span class="ml-1 text-xs font-medium">{{ isOnline ? 'Online' : 'Offline' }}</span>
        </p>
      </div>
    </div>

    <!-- Messages area -->
    <div class="absolute left-0 right-0 overflow-y-auto px-4 space-y-4" :style="{ top: '140px', bottom: '60px' }"
      ref="RoomChatMessages">
      <div v-for="(msg, idx) in messages" :key="idx"
        :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
        <BubbleContainer :chat="msg" />
      </div>
    </div>

    <!-- Input area -->
    <div class="absolute bottom-0 left-0 right-0 px-4 py-2 border-t flex gap-2 items-center bg-white">
      <el-input v-model="message" placeholder="Ketik pesan..." class="flex-1" size="large" clearable
        @keyup.enter="onSendMessage" />
      <el-button type="primary" size="large" @click="onSendMessage">
        <icon-ep-position class="text-white" />
      </el-button>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useRoomChat } from './RoomChat.logic';
import { formatPrice, importImage } from '@/utils/helper';
import { useChatbotStore } from '@/store/chatbot';
import BubbleContainer from './components/bubble-container/BubbleContainer.vue';
import { useChatSocket } from '@/composables/useChatSocket';
import { useUserStore } from '@/store/user';
import { Role } from '@/enums/role';
import { Intent } from '@/enums/intent';



//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const { message, mounted } = useRoomChat();
const chatbotStore = useChatbotStore()
const { messages, sendMessage, isOnline } = useChatSocket();
const { userInfo } = useUserStore()
const RoomChatMessages = ref<HTMLElement | null>(null);

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------


//----------------------------------------
// 🎯 Watchers
//----------------------------------------

watch(messages, async () => {
  scrollToBottom()
}, { deep: true });

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------

onMounted(async () => {
  mounted.value = true;
  await getAllChat()
  scrollToBottom()
});

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const scrollToBottom = async () => {
  await nextTick();
  RoomChatMessages.value?.scrollTo({
    top: RoomChatMessages.value.scrollHeight,
    behavior: 'smooth',
  });
}

const onSendMessage = () => {
  if (!message.value.trim()) return;
  sendMessage({
    name: userInfo?.name ?? '',
    email: userInfo.email ?? '',
    message: {
      chat: message.value,
      intent: Intent.USER
    },
    role: Role.USER,
    intent: Intent.USER
  });
  message.value = '';
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
