import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '@demo-A/api-modules';
import {
  CreateServicePayload,
  CreateServiceResponse,
  GetServicesResponse,
} from '@demo-A/api-types';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ServicesService {
  constructor(
    private servicesRepository: ServicesRepository,
    private cls: ClsService,
  ) {}

  async createService(
    payload: CreateServicePayload,
  ): Promise<CreateServiceResponse> {
    try {
      const service = await this.servicesRepository.createService({
        cardVariant: payload.cardVariant,
        title: payload.title,
        shortDescription: payload.shortDescription,
        longDescription: payload.longDescription,
        imagePath: payload.imagePath,
        imageUrl: payload.imageUrl,
      });
      return { success: true, service };
    } catch (e) {
      return { success: false, service: null };
    }
  }

  async getServices(): Promise<GetServicesResponse> {
    const services = await this.servicesRepository.getServices();
    return { services };
  }
}
