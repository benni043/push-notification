<template>
  <div>
    <h1>works</h1>
    <button @click="subscribe()">trigger</button>

    <button @click="funct()">sent</button>

  </div>
</template>

<script setup lang="ts">
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

onMounted(async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');

      // Warte, bis der Service Worker aktiv ist
      await navigator.serviceWorker.ready;

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
    applicationServerKey: urlBase64ToUint8Array('BKkvpMKOQ3wvNUpoohpuZmTUCNe8rH4bZwCbTeLW16F1ZeUm9DDEavdpXOfXIR6PWZpPswiCYte1KMveWMFvslY')
  });

  console.log(4)

  await $fetch('/api/subscribe', {
    method: 'POST',
    body: sub
  });
}
</script>