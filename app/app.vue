<template>
  <div>
    <h1>works</h1>
    <button @click="subscribe()">trigger</button>
  </div>
</template>

<script setup lang="ts">
async function subscribe() {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  const reg = await navigator.serviceWorker.ready;

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'DEIN_PUBLIC_KEY'
  });

  await $fetch('/api/subscribe', {
    method: 'POST',
    body: sub
  });
}
</script>