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
import { ConfigService } from '@demo-A/nest-modules';
import { createClient } from '@supabase/supabase-js';

import { Config } from '../../config';

@Injectable()
export class ServicesService {
  constructor(
    private servicesRepository: ServicesRepository,
    private cls: ClsService,
    private configService: ConfigService<Config>,
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

    if (payload.status === 'deleted') {
      await this.handleServiceDeleted({ serviceId: payload.id });
    }

    return { success: true };
  }

  private async handleServiceDeleted(params: { serviceId: string }) {
    const service = await this.servicesRepository.getServiceById(
      params.serviceId,
      {
        relations: ['supabaseImage'],
      },
    );
    if (!service) throw new Error('Service not found');

    if (service.supabaseImage) {
      const supabase = this.configService.getBy('supabase');
      const supabaseClient = createClient(supabase.projectUrl, supabase.apiKey);
      const { error } = await supabaseClient.storage
        .from(supabase.serviceImagesBucketName)
        .remove([service.supabaseImage.path]);
      if (error) console.error(error);
    }
  }
}
