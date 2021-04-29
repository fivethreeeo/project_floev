import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import multer from 'multer';
import path from "path";

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: '*'
})

const STORAGE_DESTINATION = process.env.USER === "dev1"
  ? "/home/dev1/upload"
  : "/Users/2langk/Desktop/"


const storage = multer.diskStorage({
  destination: STORAGE_DESTINATION,
  filename: function (_: any, file: any, cb: any) {
    cb(null, Date.now() + file.originalname.split(".")[0] + path.extname(file.originalname))
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
  if (req.method !== 'POST') {
    return res.status(400).send({ message: 'Only POST requests allowed' })
  }

  await runMiddleware(req, res, cors)
  await runMiddleware(req, res, upload.single('upload-image'))

  console.log(req.file?.path)
  res.send(req.file?.path)
  res.status(204).end()
}

export const config = {
  api: {
    bodyParser: false
  },
}