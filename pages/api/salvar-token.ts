import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from "@/types/RespostaPadraoMsg";
import { validarTokenJWT } from "@/middlewares/validarTokenJWT";
import { conectarMongoDB } from "@/middlewares/conectarMongoDB";
import { UsuarioModel } from "@/models/UsuarioModel";
import { politicaCORS } from "@/middlewares/politicaCORS";

const salvarTokenEndpoint = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ erro: "Método informado não é válido." });
    }

    const { fcmToken } = req.body as { fcmToken?: string };
    const userId = req.user?.id;

    if (!fcmToken) {
      return res.status(400).json({ erro: "Token FCM é obrigatório" });
    }

    if (!userId) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    const usuario = await UsuarioModel.findById(userId);
    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    usuario.fcmToken = fcmToken;
    await UsuarioModel.findByIdAndUpdate({ _id: userId }, usuario);

    console.log(`Token FCM salvo para userId: ${userId}`);
    return res.status(200).json({ msg: "Token FCM salvo com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar token:", error);
    return res.status(500).json({ erro: "Erro ao salvar token: " + error });
  }
};

export default politicaCORS(validarTokenJWT(conectarMongoDB(salvarTokenEndpoint)));