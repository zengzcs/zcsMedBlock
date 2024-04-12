import { NextRequest } from "next/server";


export interface NextReq{
    parseReqBody(req: NextRequest): Promise<any>
}
export class NextReqService implements NextReq { 
    async parseReqBody(req: NextRequest): Promise<any> {
        try {
            console.log("PARSING REQUEST")
            const response = req.body;
            const reader = response.getReader();
            const { done, value } = await reader.read();
            const deciphertext = new TextDecoder().decode(value);
            const json = JSON.parse(deciphertext);
            console.log("json");
            console.log(json);
            return Promise.resolve(json);
        } catch (e) {
            console.log("ERROR WHEN PARSE REQUEST BODY");
            console.log(req);
        }
    }
}

const instance = new NextReqService();
export default instance;