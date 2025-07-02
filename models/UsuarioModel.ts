import mongoose, { Schema } from 'mongoose';

const UsuarioSchema = new Schema({
    nome: {type: String, required: true},
    fcmToken: { type: String },
    email: {type: String, required: true},
    senha: {type: String, required: true},
    avatar: {type: String, required: false},
    seguidores: {type: Number, default: 0},
    seguindo: {type: Number, default: 0},
    publicacoes: {type: Number, default: 0}
});

export const UsuarioModel = (mongoose.models.usuarios || mongoose.model('usuarios', UsuarioSchema)); 
//exporta a tabela onde o mogoose dentro das tabelas dela esta criado..se tiver criado ou se não esistir ele cria uma tabela