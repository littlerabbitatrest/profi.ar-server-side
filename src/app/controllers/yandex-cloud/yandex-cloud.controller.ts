import { Controller, Post } from '@nestjs/common';
import { YandexCloudService } from '@app/services/yandex-cloud';
import { GenerateUrlDto } from '@app/controllers/yandex-cloud';

@Controller('images')
export class YandexCloudController {
  constructor(private readonly yandexCloudService: YandexCloudService) {}

  @Post('generateUrl')
  generateUploadUrl(generateUrlDto: GenerateUrlDto): string {
    return this.yandexCloudService.upload(generateUrlDto);
  }
}

