import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import { conectarMongoDB } from '@/middlewares/conectarMongoDB';
import { validarTokenJWT } from '@/middlewares/validarTokenJWT';
import { UsuarioModel } from '@/models/UsuarioModel';
import { SeguidorModel } from '@/models/SeguidorModel';
import { politicaCORS } from '@/middlewares/politicaCORS';

const pesquisaEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any[]>) => {

    try {
        if(req.method === 'GET') {
            if(req?.query?.id) {
                const usuarioEncontrado = await UsuarioModel.findById(req?.query?.id);
                if(!usuarioEncontrado) {
                    return res.status(400).json({erro: 'Usuario não encontrado'});
                }

                const user = {
                    senha: null,
                    segueEsseUsuario: false,
                    nome: usuarioEncontrado.nome,
                    email: usuarioEncontrado.email,
                    _id: usuarioEncontrado._id,
                    avatar: usuarioEncontrado.avatar,
                    seguidores: usuarioEncontrado.seguidores,
                    seguindo: usuarioEncontrado.seguindo,
                    publicacoes: usuarioEncontrado.publicacoes,
                } as any;

                const segueEsseUsuario = await SeguidorModel.find({ usuarioId: req?.query?.userId, usuarioSeguidoId: usuarioEncontrado._id });
                if (segueEsseUsuario && segueEsseUsuario.length > 0) {
                    user.segueEsseUsuario = true;
                }

                usuarioEncontrado.senha = null;
                return res.status(200).json(usuarioEncontrado);
            } else {
                const {filtro} = req.query;
                console.log(filtro);
                if(!filtro || filtro.length < 2) {
                    return res.status(400).json({erro: 'Favor informar pelo menos 2 caracteres na busca'});
                }
                
                const usuariosEncontrados = await UsuarioModel.find({
                    //  nome : {$regex : filtro, $options: 'i'}    aqui seria uma busca pelo nome e o regex pega qualquer parte do nome e o "i" ignora o case sensetive.
                    $or: [
                        {nome: {$regex: filtro, $options: 'i'}},
                        {email: {$regex: filtro, $options: 'i'}}
                    ] 
                });
                console.log(usuariosEncontrados);
                return res.status(200).json(usuariosEncontrados);
            }
        }
        return res.status(405).json({erro: 'Metodo informado não é valido'});
    } catch(e) {
        console.log(e);
        return res.status(500).json({erro: 'Não foi possivel buscar usuarios' + e});
    }
}

export default politicaCORS(validarTokenJWT(conectarMongoDB(pesquisaEndpoint)));