import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from "mongoose";
import type { RespostaPadraoMsg } from '../types/RespostaPadraoMsg';
//para o middlewares tem que importa estes types para o funcionamento

export const conectarMongoDB = (handler : NextApiHandler) => //aqui vai exportar esta variavel/função que quando for executada 
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {             //endpoint recebe a requisição e processa a resposta ja o middlewares recebe um handler que recebe a função que tem um requeste e um response ai chama o endpoint se necessario for

    //verificar se o banco ja esta conectado, se estiver seguir para o endpoint
    if(mongoose.connections[0].readyState) {                //lendo o codigo...mongoose voce esta com alguma conexao ai? entre couchetes esta zero mas na programação 0 é a primeira .. ou seja veja a primeira conexao ate pq pode ter varias e reastate significa se esta pronto
        return handler(req, res);                           //se estiver pronto ai vem o return handler(req, res)
    }

    //ja que não esta conectado vamos conectar
    //obter a variavel de ambiente preenchida da env
    const {DB_CONEXAO_STRING} = process.env;                //aqui vai procurar as variavesi de ambiente para fazer a configuração ai dentro do destructor(que é a chaves{}) coloca a varial que disponibilizamos na env.exemple

    //se a env estiver vazia aborta o uso do sistema e avisa o programador
    if(!DB_CONEXAO_STRING) {                               // aqui fala ...caso não estiver preeenchida me retorna o erro.. a exclamação siginica não
        return res.status(500).json({erro: 'ENV de configuração do banco, não informado'});
    }

    mongoose.connection.on('connected', () => console.log('Bnaco de dados conectado'));
    mongoose.connection.on('error', error => console.log(`Ocorreu erro ao conectar no banco: ${error}`));
    await mongoose.connect(DB_CONEXAO_STRING);                   // se estiver tudo certo esta linha vai fazer a conexao com o banco de dados, ai tem mais um detalhe que o connect retorna uma Promise que ai a função tem que ser async/await
    
    //agora posso seguir para o endpoint, pois estou conectado no banco
    return handler(req, res);
}