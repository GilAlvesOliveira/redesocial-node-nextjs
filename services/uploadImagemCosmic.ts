import multer from 'multer';
import { createBucketClient } from '@cosmicjs/sdk'

const {
    BUCKET_SLOG,
    READ_KEY,
    WRITE_KEY } = process.env;

    const bucketRedeSocial = createBucketClient({    //aqui foi importado do cosmicjs/slk
        bucketSlug: BUCKET_SLOG as string,
        readKey: READ_KEY as string,
        writeKey: WRITE_KEY as string
    });

    const storage = multer.memoryStorage();           //multer vai gravar a imagem na memoria da aplicação so depois vai fazer o upload

    const upload = multer({ storage: storage });      //função de upload de imagem

    const uploadImagemCosmic = async (req: any) => {   //esta é a função de upload que vai ser async e vai ter uma requisição
        if (req?.file?.originalname) {                  // vai checar se na requisição vai ter um arquivo e se este arquivo tem um nome
       
            if(!req.file.originalname.includes('.png') &&
            !req.file.originalname.includes('.jpg') &&
            !req.file.originalname.includes('.jpeg')) {
                throw new Error('Extensão da imagem invalida');
            }
            const media_object = {                      // se a requisção tem um arquivo e se este arquivo tem um nome vou criar um objeto
            originalname: req.file.originalname,
            buffer: req.file.buffer,
            };

                if (req.url && req.url.includes("publicacao")) {   // se a url for publicação...vou mandar para o  bucket de publicação
                return await bucketRedeSocial.media.insertOne({
                    media: media_object,
                    folder: "Publicacoes",
                });
                } else {
                    return await bucketRedeSocial.media.insertOne({
                      media: media_object,
                      folder: "Avatar",
                    });
                  } 
                }
              };

export { upload, uploadImagemCosmic };