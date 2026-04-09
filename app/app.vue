<template>
  <div>
    <h1>works</h1>
    <button @click="subscribe()">trigger</button>

    <button @click="funct()">sent</button>

  </div>
</template>

<script setup lang="ts">

onMounted(async () => {
  if ('serviceWorker' in navigator) {
    try {
      console.log(1)
      const reg = await navigator.serviceWorker.register('/sw.js');
      console.log(2)
      // Warte, bis der Service Worker aktiv ist
      await navigator.serviceWorker.ready;
      console.log(3)
      console.log('SW ist bereit und aktiv:', reg.active);

      // Falls er noch im Status "installing" ist, lausche auf Statusänderungen
      if (reg.installing) {
        reg.installing.addEventListener('statechange', (e) => {
          console.log('SW Status changed to:', (e.target as any).state);
        });
      }
    } catch (err) {
      console.error('SW registration failed', err);
    }
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