import { Operarios } from '../types';
import { type } from 'os';
type AllTypes = Operarios[] | undefined;
export default function trataRequisicao<T>(type: string, response: any): any {
    if (type === 'Operarios') {
        const operarios: Array<Operarios> = [];
        response.data.forEach((data: any, index: any) => {
            operarios.push({
                _id: data["_id"],
                name: data?.name,
                password: data?.password,
                userId: data.userId,
                field: data.fields[0],
                admin: data?.admin,
            });
        });
        return operarios;
    }
    return 0;
}