import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type { RespostaPadraoMsg } from '../types/RespostaPadraoMsg';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const validarTokenJWT = (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any[]>) => {
    try {
      const { MINHA_CHAVE_JWT } = process.env;
      if (!MINHA_CHAVE_JWT) {
        return res.status(500).json({ erro: 'ENV chave JWT não informada na execução do processo' });
      }

      if (!req || !req.headers) {
        return res.status(401).json({ erro: 'Não foi possível validar o token de acesso' });
      }

      if (req.method !== 'OPTIONS') {
        const authorization = req.headers['authorization'];
        if (!authorization) {
          return res.status(401).json({ erro: 'Não foi possível validar o token de acesso' });
        }

        const token = authorization.substring(7);
        if (!token) {
          return res.status(401).json({ erro: 'Não foi possível validar o token de acesso' });
        }

        const decoded = jwt.verify(token, MINHA_CHAVE_JWT) as JwtPayload;
        if (!decoded) {
          return res.status(401).json({ erro: 'Não foi possível validar o token de acesso' });
        }

        if (!req.query) {
          req.query = {};
        }

        // Adicionar req.query.userId para compatibilidade com usuario.ts
        req.query.userId = decoded._id;
        // Adicionar req.user.id para compatibilidade com salvar-token.ts e like.ts
        req.user = { id: decoded._id };
      }

      return handler(req, res);
    } catch (e) {
      console.error('Erro ao validar token:', e);
      return res.status(401).json({ erro: 'Não foi possível validar o token de acesso' });
    }
  };