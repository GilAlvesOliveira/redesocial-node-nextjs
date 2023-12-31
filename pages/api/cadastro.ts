import type { NextApiRequest, NextApiResponse } from 'next';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import type { cadastroRequisicao } from '../../types/CadastroRequisicao';
import { UsuarioModel } from '../../models/UsuarioModel';
import { conectarMongoDB } from "../../middlewares/conectarMongoDB";
import md5 from "md5";
import { upload, uploadImagemCosmic} from '../../services/uploadImagemCosmic';
import nc from 'next-connect';
import { politicaCORS } from '@/middlewares/politicaCORS';

const handler = nc()
.use(upload.single('file'))
.post( async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
        try {
        const usuario = req.body as cadastroRequisicao;

        if(!usuario.nome || usuario.nome.length < 2) {   // aqui verifica se o nome tem menos de 2 letras..se tiver ele retorna um erro
            return res.status(400).json({erro: 'Nome invalido'});
        }

        if(!usuario.email || usuario.email.length < 5    // aqui verifica se tem um email e se ele tem mais de 5 caracteres e tbm se tem . e @ 
            || !usuario.email.includes('@')           
            || !usuario.email.includes('.')) {
            return res.status(400).json({erro: 'Email invalido'});
        }

        if(!usuario.senha || usuario.senha.length < 4) { // aqui verifica se a senha tem mais de 4 caracteres
            return res.status(400).json({erro: 'Senha invalida'});
        }

        const usuarioComMesmoEmail = await UsuarioModel.find({email: usuario.email}); // aqui seria uma variavel para verificar se ja exixte um usuario com mesma email
        if(usuarioComMesmoEmail && usuarioComMesmoEmail.length > 0) {
            return res.status(400).json({erro: 'Ja existe uma conta com o email informado'});
        }

        //enviar a imagem do multer para o cosmic
        const image = await uploadImagemCosmic(req);
        
        const usuarioASerSalvo = {                        // aqui cria uma variavel que tenha nome, email, senha e vai criptografar a senha 
            nome: usuario.nome,
            email: usuario.email,
            senha: md5(usuario.senha),
            avatar: image?.media?.url
        }
        await UsuarioModel.create(usuarioASerSalvo);
        return res.status(200).json({msg: 'Usuario criado com sucesso'});
        }catch(e) {
            console.log(e);
        return res.status(500).json({erro: 'Erro ao cadastrar usuario'});

        }
        
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default politicaCORS(conectarMongoDB(handler));