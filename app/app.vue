<template>
    <div>
        <h1>works</h1>
        <button @click="subscribe()">trigger</button>

        <button @click="funct()">sent</button>
    </div>
</template>

<script setup lang="ts">
onMounted(async () => {
    if ("serviceWorker" in navigator) {
        try {
            const reg = await navigator.serviceWorker.register("/sw.js");

            await navigator.serviceWorker.ready;

            console.log("SW ist bereit und aktiv:", reg.active);
        } catch (err) {
            console.error("SW registration failed", err);
        }
    }
});

async function funct() {
    await $fetch("/api/send-push", {
        method: "POST",
    });
}

async function subscribe() {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const reg = await navigator.serviceWorker.ready;

    const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
            "BKkvpMKOQ3wvNUpoohpuZmTUCNe8rH4bZwCbTeLW16F1ZeUm9DDEavdpXOfXIR6PWZpPswiCYte1KMveWMFvslY",
    });

    await $fetch("/api/subscribe", {
        method: "POST",
        body: sub,
    });
}
</script>
