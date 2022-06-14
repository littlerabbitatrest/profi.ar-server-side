import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class YandexCloudService {
  constructor(
    private readonly s3 = new S3({
      endpoint: process.env.YA_STORAGE_ENDPOINT,
      secretAccessKey: process.env.YA_STORAGE_SECRET_KEY,
      accessKeyId: process.env.YA_STORAGE_ACCESS_KEY,
      region: process.env.YA_STORAGE_REGION,
      httpOptions: {
        timeout: 10000,
        connectTimeout: 10000
      }
    }),
    private readonly bucket = process.env.YA_STORAGE_BUCKET
  ) {}

  upload({ fileName }) {
    const params = {
      Bucket: this.bucket,
      Key: fileName,
      ContentType: 'image/jpeg'
    };

    return this.s3.getSignedUrl('putObject', params);
  }
}
