import AWS from 'aws-sdk'
import env from '~/server/env/dotenv'

const uploadImage = async (file: Buffer, fileName: string) => {
  // Connect to S3
  const s3 = new AWS.S3({
    endpoint: `${env.KUN_VISUAL_NOVEL_IMAGE_BED_ENDPOINT}/avatar`,
    accessKeyId: env.KUN_VISUAL_NOVEL_IMAGE_BED_ACCESS_KEY,
    secretAccessKey: env.KUN_VISUAL_NOVEL_IMAGE_BED_SECRET_KEY,
    s3BucketEndpoint: true,
  })

  s3.putObject(
    {
      Body: file,
      Bucket: 'avatar',
      Key: fileName,
    },
    (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    }
  )
}
