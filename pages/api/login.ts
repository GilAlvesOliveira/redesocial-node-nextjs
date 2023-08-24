import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';

const endpointLogin = (                      //esta linha era... export default (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg>   //dentro do <> coloca o type importado para padronizar as respostas
) => {
    if(req.method === 'POST') { //aqui esta validando o metodo
        const {login, senha} = req.body;

        if(login === 'admin@admin.com' && //este login e senha esta mocado apenas para fazer os testes.
        senha === "Admin@123"){
            return res.status(200).json({msg: 'Usuario autenticado com sucesso'}); // aqui seria as msg de ero ou status
        }
        return res.status(400).json({erro: 'Usuario ou senha não encontrado'});
    }
    return res.status(405).json({erro: 'Metodo informado não é válido!'});
}

export default conectarMongoDB(endpointLogin);   //esta linha não tinha ate fazer o middlewares e a função conectarMongoDB