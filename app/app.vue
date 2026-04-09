<template>
  <div>
    <h1>works</h1>
    <button @click="subscribe()">trigger</button>

    <button @click="funct()">sent</button>

  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW registered', reg))
        .catch(err => console.error('SW registration failed', err));
  }
});

async function funct() {
  await $fetch('/api/send-push', {
    method: 'POST',
  });
}

async function subscribe() {
  console.log(1)

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  console.log(2)

  const reg = await navigator.serviceWorker.ready;

  console.log(3)

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BKkvpMKOQ3wvNUpoohpuZmTUCNe8rH4bZwCbTeLW16F1ZeUm9DDEavdpXOfXIR6PWZpPswiCYte1KMveWMFvslY'
  });

  console.log(4)

  await $fetch('/api/subscribe', {
    method: 'POST',
    body: sub
  });
}
</script>