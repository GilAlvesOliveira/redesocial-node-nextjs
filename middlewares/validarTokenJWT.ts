import type { NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import type { RespostaPadraoMsg } from '../types/RespostaPadraoMsg';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const validartokenTWT = (handler: NextApiHandler) =>
     (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {

        try{
            const {MINHA_CHAVE_JWT} = process.env;          //validei a chave de acesso
        if(!MINHA_CHAVE_JWT) {
            return res.status(500).json({erro: 'ENV chave JWT não informada na execução do processo'});
        }

        if(!req || !req.headers) {                      //verifiquei se veio algum header
            return res.status(401).json({erro: 'Não foi possivel validar o token de acesso'});
        }

        if(req.method !== 'OPTIONS') {                  //validei se o metodo é diferente de options se for ja vai direto
            const authorization = req.headers['authorization'];   //depois foi validado o header de autorização
            if(!authorization) {
                return res.status(401).json({erro: 'Não foi possivel validar o token de acesso'});
            }

            const token = authorization.substring(7);  // validei se veio o token 
            if(!token) {
                return res.status(401).json({erro: 'Não foi possivel validar o token de acesso'});
            }

            const decoded = jwt.verify(token, MINHA_CHAVE_JWT) as JwtPayload;  //foi decodificado e ver se retornou o objeto se não volto vai dar  erro
            if(!decoded) {
                return res.status(401).json({erro: 'Não foi possivel validar o token de acesso'});
            }

            if(req.query) {       // se volta o objeto verifica se tem algum objeto na requisição
                req.query = {};
            }

            req.query.userId = decoded._id;
        }

        }catch(e) {
            console.log(e);
            return res.status(401).json({erro: 'Não foi possivel validar o token de acesso'})
        }

        return handler(req, res);
    }