
import ServiceCall from "@smartface/extension-utils/lib/service-call";
import { Passengers } from "models/passengers";
const sc = new ServiceCall({
    baseUrl: "https://api.instantwebtools.net/v1",
    logEnabled: true,
});

export interface PassengerService {
    getPassengerData(page : number, pageSize : number) : Promise<Passengers>;
}

export class PassengerServiceImpl implements PassengerService {
    async getPassengerData(page : number, pageSize : number) : Promise<Passengers> {
        const endPoint = "/passenger?page="+page+"&size=" + pageSize;
        const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
        const response = await sc.request(endPoint, options);
        return response;
    }
}