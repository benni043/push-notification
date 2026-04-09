let subscriptions: any[] = [];

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    subscriptions.push(body);
    return { ok: true };
});