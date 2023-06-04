import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
//import mysql from "mysql";

export const bucket = "ibaverde";

export const s3 = new AWS.S3({
  endpoint: "http://13363.masterdaweb.net:9000/",
  accessKeyId: "XAZTT2KQlMBl89mYnrig",
  secretAccessKey: "KPUiUdeJlmEWpfZKX9MH97uKsJ4LfSLkSFmzZ4AP",
  sslEnabled: false,
  s3ForcePathStyle: true,
});

const storage = multerS3({
  s3,
  bucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
    console.log(file.location);
    //saveToMySQL(file.originalname, req.file.location);
  },
  key: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });


