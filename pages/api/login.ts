import type { NextApiRequest, NextApiResponse } from "next";

export default (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if(req.method === 'POST') { //aqui esta validando o metodo
        const {login, senha} = req.body;

        if(login === 'admin@admin.com' && //este login e senha esta mocado apenas para fazer os testes.
        senha === "Admin@123"){
            res.status(200).json({msg: 'Usuario autenticado com sucesso'}); // aqui seria as msg de ero ou status
        }
        return res.status(400).json({erro: 'Usuario ou senha não encontrado'});
    }
    return res.status(405).json({erro: 'Metodo informado não é válido!'});
}