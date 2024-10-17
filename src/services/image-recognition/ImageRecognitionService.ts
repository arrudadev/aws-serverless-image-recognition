import aws from 'aws-sdk'
import axios from 'axios'

export class ImageRecognitionService {
  constructor(private rekognitionService: aws.Rekognition) {}

  async getImageBufferByUrl(imageUrl: string) {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    })

    return Buffer.from(response.data, 'base64')
  }

  async recognizeImage(buffer: Buffer) {
    const params = {
      Image: {
        Bytes: buffer,
      },
    }

    const result = await this.rekognitionService.detectLabels(params).promise()
    const predictions = result.Labels?.filter(
      ({ Confidence }) => Confidence && Confidence > 80,
    )

    return predictions
  }
}
