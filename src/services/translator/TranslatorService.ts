import aws from 'aws-sdk'

export class TranslatorService {
  constructor(private translateService: aws.Translate) {}

  async translateText(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
  ) {
    const params = {
      SourceLanguageCode: sourceLanguage,
      TargetLanguageCode: targetLanguage,
      Text: text,
    }

    const { TranslatedText } = await this.translateService
      .translateText(params)
      .promise()

    return TranslatedText
  }
}
