import { readFileSync, writeFileSync } from 'node:fs'
import * as path from 'node:path'
import signpdf from '@signpdf/signpdf'
import { P12Signer } from '@signpdf/signer-p12'

function work() {
  const inputPdfPath = path.join(
    __dirname,
    'test-assets',
    'with-placeholder.pdf',
  )
  const certificatePath = path.join(__dirname, 'test-assets', 'certificate.p12')

  // Pdf para ser assinado
  const inputPdf = readFileSync(inputPdfPath)
  // Certificado que vai ser usado para assinar o pdf
  const certificate = readFileSync(certificatePath)

  const signer = new P12Signer(certificate)

  // Assinando pdf e criando pdf assinado
  signpdf
    // Assinar o pdf com o certificado
    .sign(inputPdf, signer)
    // signedPdf é o pdf assinado digitalmente em forma de Buffer
    .then(function (signedPdf: Buffer) {
      const currentTimeInMs = new Date().getTime().toString()
      const outputPdfName = `${currentTimeInMs}-signed-pdf.pdf`

      const outputPdfPath = path.join(__dirname, 'test-assets', outputPdfName)
      // Criar o pdf assinado digitalmente
      writeFileSync(outputPdfPath, signedPdf)
    })
}

work()
