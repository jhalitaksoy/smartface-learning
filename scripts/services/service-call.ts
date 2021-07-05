import ServiceCall from "sf-extension-utils/lib/service-call";
const sc = new ServiceCall({
    baseUrl: "https://halitaksoy.com/auth-test",
    logEnabled: true,
});

export const post = (endPointPath: string, body?: { [key: string]: any } | string) => {
    return sc.request(endPointPath, {
        method: "POST",
        body: body,
        fullResponse: true,
        headers: { "Content-Type": "application/json" },
    })
}

export default sc