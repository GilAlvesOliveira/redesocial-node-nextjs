import type { NextApiResponse} from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import nc from 'next-connect';
import { upload, uploadImagemCosmic} from '../../services/uploadImagemCosmic';
import { conectarMongoDB } from '../../middlewares/conectarMongoDB';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT';
import { PublicacaoModel } from '../../models/PublicacaoModel';
import { UsuarioModel } from '../../models/UsuarioModel';
import { politicaCORS } from '@/middlewares/politicaCORS';

const handler = nc()
    .use(upload.single('file'))
    .post(async (req: any, res: NextApiResponse<RespostaPadraoMsg>) => {
        try {
            const { userId } = req.query;
            const usuario = await UsuarioModel.findById(userId);
            if(!usuario) {
                return res.status(400).json({erro: 'Usuario não informado'});
            }

            if(!req || !req.body) {
                return res.status(400).json({erro: 'Parametros de entrada não informados.'});
            }
            const {descricao} = req?.body;
        if(!descricao || descricao.length < 2) {
            return res.status(400).json({erro: 'Descrição não é valida.'});
        }

        if(!req.file || !req.file.originalname) {
            return res.status(400).json({erro: 'Imagem é obrigatoria.'});
        }

        const image = await uploadImagemCosmic(req);
        const publicacao = {
            idUsuario: usuario._id,
            descricao,
            foto: image.media.url,
            data: new Date()
        }

        usuario.publicacoes++;
        await UsuarioModel.findByIdAndUpdate({_id: usuario._id}, usuario);

        await PublicacaoModel.create(publicacao);
        return res.status(200).json({msg: 'Publicação criada com sucesso.'});
        } catch(e) {
            console.log(e);
            return res.status(400).json({erro: 'erro ao cadastrar publicacao.'});
        }
    })
    .delete(async (req: any, res: NextApiResponse<RespostaPadraoMsg>) => {
        try {
          const { postId, userId } = req.query;
          const publicacao = await PublicacaoModel.findById(postId);
      
          if (!publicacao) {
            return res.status(400).json({ erro: 'Publicação não encontrada' });
          }
      
          if (publicacao.idUsuario !== userId) {
            return res.status(403).json({ erro: 'Operação não autorizada' });
          }
      
          await PublicacaoModel.deleteOne({ _id: postId });
      
          const usuario = await UsuarioModel.findById(userId);
          if (!usuario) {
            return res.status(400).json({ erro: 'Usuário não encontrado' });
          }
      
          usuario.publicacoes--;
          await usuario.save();
      
          return res.status(200).json({ msg: 'Publicação deletada com sucesso' });
        } catch (e) {
          console.log(e);
          return res.status(400).json({ erro: 'Erro ao deletar publicação' });
        }
      });

    export const config = {
        api: {
            bodyParser: false
        }
    }

    export default politicaCORS(validarTokenJWT(conectarMongoDB(handler)));