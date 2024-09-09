import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '@demo-A/api-modules';
import {
  CreateServicePayload,
  CreateServiceResponse,
  GetServiceResponse,
  GetServicesQuery,
  GetServicesResponse,
  ServiceStatus,
  UpdateServiceStatusPayload,
  UpdateServiceStatusResponse,
  User,
} from '@demo-A/api-types';
import { ClsService } from 'nestjs-cls';
import { In } from 'typeorm';

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
        status: payload.status,
        cardVariant: payload.cardVariant,
        title: payload.title,
        shortDescription: payload.shortDescription,
        longDescription: payload.longDescription,
        supabaseImage: payload.supabaseImage
          ? {
              id: payload.supabaseImage.id,
              publicUrl: payload.supabaseImage.publicUrl,
              path: payload.supabaseImage.path,
              fullPath: payload.supabaseImage.fullPath,
            }
          : null,
      });
      return { success: true, service };
    } catch (e) {
      return { success: false, service: null };
    }
  }

  async getServices(query: GetServicesQuery): Promise<GetServicesResponse> {
    // region Handle status includes query
    const user: User | null = this.cls.get('user');
    let statusIncludes: ServiceStatus[] = ['active'];
    if (query.statusIncludes?.length && user?.role === 'admin') {
      statusIncludes = query.statusIncludes;
    }
    // endregion

    const services = await this.servicesRepository.getServices(
      { status: In(statusIncludes) },
      { relations: ['supabaseImage'] },
    );
    return { services };
  }

  async getServiceById(params: {
    serviceId: string;
  }): Promise<GetServiceResponse> {
    const service = await this.servicesRepository.getServiceById(
      params.serviceId,
      { relations: ['supabaseImage'] },
    );
    return { service };
  }

  async updateServiceStatus(
    payload: UpdateServiceStatusPayload,
  ): Promise<UpdateServiceStatusResponse> {
    await this.servicesRepository.updateServiceByServiceId(payload.id, {
      status: payload.status,
    });
    return { success: true };
  }
}
