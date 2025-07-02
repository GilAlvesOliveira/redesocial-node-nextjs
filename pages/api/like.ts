import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "@/types/RespostaPadraoMsg";
import { validarTokenJWT } from "@/middlewares/validarTokenJWT";
import { conectarMongoDB } from "@/middlewares/conectarMongoDB";
import { PublicacaoModel } from "@/models/PublicacaoModel";
import { UsuarioModel } from "@/models/UsuarioModel";
import { politicaCORS } from "@/middlewares/politicaCORS";
import admin from "@/lib/firebase";

const likeEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
  try {
    if (req.method !== "PUT") {
      return res.status(405).json({ erro: "Método informado não é válido." });
    }

    const { id, userId } = req?.query;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ erro: "ID da publicação é obrigatório e deve ser uma string." });
    }
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ erro: "ID do usuário é obrigatório e deve ser uma string." });
    }

    const publicacao = await PublicacaoModel.findById(id);
    if (!publicacao) {
      return res.status(400).json({ erro: "Publicação não encontrada." });
    }

    const usuario = await UsuarioModel.findById(userId);
    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    const indexDoUsuarioNoLike = publicacao.likes.findIndex((e: any) => e.toString() === usuario._id.toString());
    if (indexDoUsuarioNoLike !== -1) {
      // Descurtir
      publicacao.likes.splice(indexDoUsuarioNoLike, 1);
      await PublicacaoModel.findByIdAndUpdate({ _id: publicacao._id }, publicacao);
      return res.status(200).json({ msg: "Publicação descurtida com sucesso" });
    } else {
      // Curtir
      publicacao.likes.push(usuario._id);
      await PublicacaoModel.findByIdAndUpdate({ _id: publicacao._id }, publicacao);

      // Enviar notificação ao dono da postagem
      const owner = await UsuarioModel.findById(publicacao.user);
      if (owner && owner.fcmToken) {
        const message = {
          notification: {
            title: "Nova curtida!",
            body: `${usuario.username} curtiu sua foto.`,
          },
          data: {
            postId: id,
          },
          token: owner.fcmToken,
        };

        try {
          await admin.messaging().send(message);
          console.log(`Notificação enviada para ${owner.username} (${owner.fcmToken})`);
        } catch (error) {
          console.error("Erro ao enviar notificação:", error);
        }
      } else {
        console.log(`Nenhum token FCM para o usuário ${owner?.username || "desconhecido"}`);
      }

      return res.status(200).json({ msg: "Publicação curtida com sucesso" });
    }
  } catch (e) {
    console.error("Erro ao curtir/descurtir:", e);
    return res.status(500).json({ erro: "Ocorreu erro ao curtir/descurtir uma publicação." });
  }
};

export default politicaCORS(validarTokenJWT(conectarMongoDB(likeEndpoint)));