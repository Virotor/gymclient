
import axios from 'axios';
import { IClient } from '../../interfaces/Client';

export async function getClientInfo(clientId: number, showMessage: (string: string, type: string) => void): Promise<any> {
    let result = await axios({
        method: 'get',
        url: 'http://localhost:8080/client/info?id=' + clientId
    }).catch(function (error) {
        if (error.response) {
            showMessage(error.response.data.message, "error");
        }
        else {
            showMessage("Ошибка сервера, сервер недоступен", "error");
        }
    });
    return result
}


