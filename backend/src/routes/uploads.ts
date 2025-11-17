import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const router = Router()

const uploadsDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const filename = (req.query.filename as string) || file.originalname
    cb(null, filename)
  }
})

const upload = multer({ storage })

// Return a mock presigned url and public url
router.post('/', (req, res) => {
  const { filename } = req.body
  if (!filename) return res.status(400).json({ error: 'filename required' })
  const host = req.get('host')
  const protocol = req.protocol
  const uploadUrl = `${protocol}://${host}/api/uploads/upload?filename=${encodeURIComponent(filename)}`
  const publicUrl = `${protocol}://${host}/uploads/${encodeURIComponent(filename)}`
  res.json({ uploadUrl, publicUrl })
})

// Endpoint to receive file upload (used as the uploadUrl)
router.post('/upload', upload.single('file'), (req, res) => {
  const filename = (req.query.filename as string) || req.file?.originalname
  if (!filename) return res.status(400).json({ error: 'missing filename' })
  const host = req.get('host')
  const protocol = req.protocol
  const publicUrl = `${protocol}://${host}/uploads/${encodeURIComponent(filename)}`
  res.json({ ok: true, publicUrl })
})

export default router
