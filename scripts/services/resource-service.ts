import { Resource } from "models/resource";
// /api/unknown
import ServiceCall from "@smartface/extension-utils/lib/service-call";
const sc = new ServiceCall({
    baseUrl: "https://reqres.in",
    logEnabled: true,
});

export interface ResourceService {
    getResourceList() : Promise<Resource> ;
}

export class ResourceServiceImpl implements ResourceService {
    async getResourceList() : Promise<Resource> {
        const endPoint = "/api/unknown";
        const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
        const response = await sc.request(endPoint, options);
        return response;
    }
}