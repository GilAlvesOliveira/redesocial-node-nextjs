import mongoose, { Schema } from "mongoose";

const PublicacaoSchema = new Schema({
    idUsuario: {type: String, require: true},    // Guarda uma String com o ID da publicação e é obrigatório para a criação
    descricao: {type: String, require: true},    // Guarda uma String com a descrição da publicação ou o texto e é obrigatória para a criação
    foto: {type: String, require: true},         // Guarda uma String com a url da foto da publicação e é obrigatória para a criação
    data: {type: Date, require: true},           // Guarda a data em que a publicação foi criada e é obrigatória para a criação
    comentarios: {type: Array, require: true, default: []}, // Guarda os ID's de quem curtiu a publicação em um Array, é obrigatória e por padrão é criada vazia
    likes: {type: Array, require: true, default: []}  // Guarda os  comentários da publicação em um Array, é obrigatória e por padrão é criada vazia
});

export const PublicacaoModel = (mongoose.models.publicacoes || mongoose.model('publicacoes', PublicacaoSchema));
    //aqui exporta o modelo , depois adiciona pelo mogoose os dados na coleção usuarios, caso a coleção não exista ela sera criada