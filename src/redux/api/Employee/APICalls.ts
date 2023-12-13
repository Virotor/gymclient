
import axios from 'axios';

export async function getEmployeeInfo(employeeId: number, showMessage: (string: string, type: string) => void): Promise<any> {
    let result = await axios({
        method: 'get',
        url: 'http://localhost:8080/employee/getInfo?id=' + employeeId
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


