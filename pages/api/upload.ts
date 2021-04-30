import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import multer from 'multer';
import path from "path";

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: '*'
})

const STORAGE_DESTINATION = process.env.NODE_ENV === "production"
  ? "/home/dev1/upload"
  : "/Users/2langk/Desktop/"


const storage = multer.diskStorage({
  destination: STORAGE_DESTINATION,
  filename: function (_: any, file: any, cb: any) {
    cb(null, file.originalname.split(".")[0] + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
})

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

type NextApiRequestWithFormData = NextApiRequest & {
  file: any,
}

export default async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
  console.log('START: /api/upload ');

  if (req.method !== 'POST') {
    return res.status(400).send({ message: 'Only POST requests allowed' })
  }

  try {
    await runMiddleware(req, res, cors)
    await runMiddleware(req, res, upload.single('upload-image'))

    res.send(req.file.path)
    console.log(`   Success: upload image at ${req.file.path}`)
  } catch (err) {
    console.error(`   ERROR: upload image ${err.message}`)
  }

  console.log('END: /api/upload');
  res.status(204).end()
}

export const config = {
  api: {
    bodyParser: false
  },
}