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
          :class="msg.role === 'user' ? 'flex items-end gap-2 justify-end' : 'flex items-start gap-2'">
          <img v-if="msg.role !== 'user'" :src="importImage('robot.svg')" alt="Robot" class="w-8 h-8 rounded-full" />
          <div :class="msg.role === 'user'
            ? 'bg-primary text-white rounded-2xl px-4 py-2 shadow text-sm max-w-xs'
            : 'bg-white rounded-2xl px-4 py-2 shadow text-sm max-w-xs'">
            <!-- User message -->
            <template v-if="msg.role === 'user'">
              {{ msg.message.prompt }}
            </template>
            <!-- Assistant reply -->
            <template v-else>
              {{ msg.message.reply }}
              <!-- Optionally render menu if available -->
              <div v-if="msg.message.menu && msg.message.menu.length" class="mt-2">
                <ul>
                  <li v-for="(menuItem, menuIdx) in msg.message.menu" :key="menuIdx"
                    class="mb-2 p-2 rounded border bg-gray-50">
                    <div class="font-semibold">{{ menuItem.menu_name }}</div>
                    <div class="text-xs text-gray-500">{{ menuItem.booth_name }} &bull; {{ menuItem.category }}</div>
                    <div class="text-sm">{{ menuItem.description }}</div>
                    <div class="text-xs mt-1">
                      <span class="font-bold text-primary">Rp{{ menuItem.price.toLocaleString() }}</span>
                      <span v-if="menuItem.spiciness_level" class="ml-2">🌶️ Level {{ menuItem.spiciness_level }}</span>
                      <span v-if="menuItem.is_available" class="ml-2 text-green-600">Tersedia</span>
                      <span v-else class="ml-2 text-red-600">Habis</span>
                    </div>
                    <img v-if="menuItem.image_url" :src="menuItem.image_url" alt="Menu Image"
                      class="w-16 h-16 mt-2 rounded object-cover" />
                  </li>
                </ul>
              </div>
            </template>
          </div>
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
import { ref, onMounted } from 'vue';
import { useRoomChat } from './RoomChat.logic';
import { importImage } from '@/utils/helper';
import { useChatbotStore } from '@/store/chatbot';
import { socket } from '@/plugins/socket';
import { IChatbot } from '@/models/IChatbot';

const { message, mounted } = useRoomChat();
const messages = ref<Array<IChatbot>>([]);
const chatbotStore = useChatbotStore()

const sendMessage = async () => {
  if (!message.value.trim()) return;
  await chatbotStore.sendPrompt(message.value);
};

onMounted(() => {
  socket.on("chat-message", (data: IChatbot) => {
    messages.value.push(data);
  });
  mounted.value = true;
  getAllChat()
});
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
