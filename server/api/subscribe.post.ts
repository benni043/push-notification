import {subscriptions} from "#server/push-save";

export default defineEventHandler(async (event) => {
    console.log("aufgerufen");
    const body = await readBody(event);
    subscriptions.push(body);
    return { ok: true };
});