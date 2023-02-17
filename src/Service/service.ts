import axios from 'axios';


export class ConversorService {

    public static async converter(body: any): Promise<any> {
        const requestUrl = `https://apicore.goutron.com/api/v1/conversor_wbs/converter_txt`;
        const heads = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };
        return axios.post(requestUrl, body , heads);
    }  
}

