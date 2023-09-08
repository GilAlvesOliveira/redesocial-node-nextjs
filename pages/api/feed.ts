import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "@/types/RespostaPadraoMsg";
import { validartokenJWT } from "@/middlewares/validarTokenJWT";
import { conectarMongoDB } from "@/middlewares/conectarMongoDB";
import { UsuarioModel } from "@/models/UsuarioModel";
import { PublicacaoModel } from "@/models/PublicacaoModel";

const feedEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any>) => {
    try {
        if(req?.method === 'GET') {
            if(req?.query?.userId) {
                const usuario = await UsuarioModel.findById(req?.query?.userId);
                if(!usuario) {
                    return res.status(400).json({erro: 'Usuario não encontrado.'});
                }
                const publicacoes = await PublicacaoModel.find({idUsuario: usuario._id}).sort({data: -1});
                return res.status(200).json(publicacoes);
            }
        } else {
            return res.status(405).json({erro: 'Metodo informado não é valido.'});
        }
    } catch(e) {
        console.log(e);
        return res.status(400).json({erro: "Não foi possivel obter o feed "});
    }
}

export default validartokenJWT(conectarMongoDB(feedEndpoint));