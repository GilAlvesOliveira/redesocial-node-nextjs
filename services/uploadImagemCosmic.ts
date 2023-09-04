import multer from 'multer';
import { createBucketClient } from 'cosmicjs/sdk'

const {
    BUCKET_SLOG,
    READ_KEY,
    WHITE_KEY } = process.env;

    const bucketRedeSocial = createBucketClient({
        bucketSlug: BUCKET_SLOG as string,
        readKey: READ_KEY as string,
        whiteKey: WHITE_KEY as string
    });

    const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadImagemCosmic = async (req: any) => {
  if (req?.file?.originalname) {
    if (
      !req.file.originalname.includes(".png") &&
      !req.file.originalname.includes(".jpg") &&
      !req.file.originalname.includes(".jpeg")
    ) {
      throw new Error("Extensão da imagem inválida");
    }
    const media_object = {
      originalname: req.file.originalname,
      buffer: req.file.buffer,
    };

    if (req.url && req.url.includes("publicacao")) {
      return await bucketRedeSocial.media.insertOne({
        media: media_object,
        folder: "publicacao",
      });
    } else if (req.url && (req.url.includes("usuario") || req.url.includes("cadastro"))) {
      return await bucketRedeSocial.media.insertOne({
        media: media_object,
        folder: "avatar",
      });
    } else {
      return await bucketRedeSocial.media.insertOne({
        media: media_object,
        folder: "stories",
      });
    }
  }
};

export { upload, uploadImagemCosmic };