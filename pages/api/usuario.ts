import type { NextApiRequest, NextApiResponse } from "next";
import { validartokenTWT } from '../../middlewares/validarTokenJWT';

const usuarioEndpoint = (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json('usuario autenticado com sucesso');
}

export default validartokenTWT(usuarioEndpoint);