import webpush from 'web-push';
import {subscriptions} from "#server/push-save";

webpush.setVapidDetails(
    'mailto:you@example.com',
    'BKkvpMKOQ3wvNUpoohpuZmTUCNe8rH4bZwCbTeLW16F1ZeUm9DDEavdpXOfXIR6PWZpPswiCYte1KMveWMFvslY',
    'wGiryLM_sL1fRZfWhcYeJ_ZgSucqtOn1S_A60lBThnc'
);

export default defineEventHandler(async (event) => {
    const payload = JSON.stringify({ title: 'Erinnerung', body: 'Zeit für XYZ' });

    for (const sub of subscriptions) {
        console.log(sub)
        try {
            await webpush.sendNotification(sub, payload);
        } catch (err) {
            console.error('Push failed', err);
        }
    }

    return { ok: true };
});