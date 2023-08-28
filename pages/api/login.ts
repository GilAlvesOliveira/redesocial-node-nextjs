import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import type { LoginResposta } from '../../types/LoginResposta';
import md5 from 'md5';
import { UsuarioModel } from '../../models/UsuarioModel';
import jwt from 'jsonwebtoken';

const endpointLogin = async (                      //esta linha era... export default (
    req: NextApiRequest,
    res: NextApiResponse<RespostaPadraoMsg | LoginResposta>   //dentro do <> coloca o type importado para padronizar as respostas
) => {

    const {MINHA_CHAVE_JWT} = process.env;
    if(!MINHA_CHAVE_JWT) {
        return res.status(500).json({erro: 'ENV Jwt não informada.'});
    }

    if(req.method === 'POST') { //aqui esta validando o metodo
        const {login, senha} = req.body;

        const usuariosEncontrados = await UsuarioModel.find({email: login, senha: md5(senha)});
       // if(login === 'admin@admin.com' &&  senha === "Admin@123"){                // este login e senha esta mocado apenas para fazer os testes.
        if(usuariosEncontrados && usuariosEncontrados.length > 0) {                 //verifica se tem usuario e pega o primeiro
            const usuarioEncontrado = usuariosEncontrados[0];                           // aqui usuarioEncontrado vai ser o usuariosncontrados
            
            const token = jwt.sign({_id: usuarioEncontrado._id}, MINHA_CHAVE_JWT);
            
            return res.status(200).json({nome: usuarioEncontrado.nome, email: usuarioEncontrado.email, token}); // aqui seria as msg de erro ou status
        }
        return res.status(400).json({erro: 'Usuario ou senha não encontrado'});
    }
    return res.status(405).json({erro: 'Metodo informado não é válido!'});
}

export default conectarMongoDB(endpointLogin);   //esta linha não tinha ate fazer o middlewares e a função conectarMongoDB