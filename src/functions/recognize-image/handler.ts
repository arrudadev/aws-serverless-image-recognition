import aws from 'aws-sdk'
import { APIGatewayProxyHandler } from 'aws-lambda'

import { ImageRecognitionService } from '../../services/image-recognition/ImageRecognitionService'
import { TranslatorService } from '../../services/translator/TranslatorService'

const rekognitionService = new aws.Rekognition()
const awsTranslateService = new aws.Translate()

const imageRecognitionService = new ImageRecognitionService(rekognitionService)
const translatorService = new TranslatorService(awsTranslateService)

export const handler: APIGatewayProxyHandler = async (event) => {
  const { imageUrl } = event.queryStringParameters as { imageUrl: string }

  const imageBuffer =
    await imageRecognitionService.getImageBufferByUrl(imageUrl)
  const predictions = await imageRecognitionService.recognizeImage(imageBuffer)

  const names = predictions?.map(({ Name }) => Name).join(' and ') || ''
  const translatedNames = (
    await translatorService.translateText(names, 'en', 'pt')
  ).split(' e ')

  const result = [] as string[]
  for (const index in translatedNames) {
    const translatedPrediction = translatedNames[index]
    const confidence = predictions?.[index].Confidence

    result.push(
      `${confidence?.toFixed(2)}% de ser do tipo ${translatedPrediction}`,
    )
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      result,
    }),
  }
}
