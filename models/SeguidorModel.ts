import mongoose, { Schema } from "mongoose";

const SeguidorSchema = new Schema({
    usuarioId: {type: String, required: true},            // aqui seria quem segue
    usuarioSeguidoId: {type: String, required: true}      //aqui quem esta sendo seguindo
});

export const SeguidorModel = (mongoose.models.seguidores || mongoose.model('seguidores', SeguidorSchema));