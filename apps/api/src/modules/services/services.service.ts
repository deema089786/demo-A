import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '@demo-A/api-modules';
import {
  CreateServicePayload,
  CreateServiceResponse,
  GetServiceResponse,
  GetServicesQuery,
  GetServicesResponse,
  ServiceStatus,
  UpdateServicePayload,
  UpdateServiceResponse,
  UpdateServiceStatusPayload,
  UpdateServiceStatusResponse,
  User,
} from '@demo-A/api-types';
import { ClsService } from 'nestjs-cls';
import { In } from 'typeorm';
import { ConfigService } from '@demo-A/nest-modules';
import { deleteFileFromStorage } from '@demo-A/utils';

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
        price: payload.price.enabled
          ? {
              value: payload.price.value,
              discountValue: payload.price.discountValue,
              amount: payload.price.amount,
              unit: payload.price.unit,
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
      { relations: ['supabaseImage', 'price'] },
    );
    return { services };
  }

  async getServiceById(params: {
    serviceId: string;
  }): Promise<GetServiceResponse> {
    const service = await this.servicesRepository.getServiceById(
      params.serviceId,
      { relations: ['supabaseImage', 'price'] },
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
        relations: ['supabaseImage', 'price'],
      },
    );
    if (!service) throw new Error('Service not found');

    if (service.supabaseImage) {
      const supabase = this.configService.getBy('supabase');
      await deleteFileFromStorage({
        bucket: supabase.serviceImagesBucketName,
        path: service.supabaseImage.path,
        auth: { projectUrl: supabase.projectUrl, apiKey: supabase.apiKey },
      }).catch(console.error);
    }
  }

  async updateService(
    payload: UpdateServicePayload,
  ): Promise<UpdateServiceResponse> {
    try {
      const service = await this.servicesRepository.getServiceById(payload.id, {
        relations: ['supabaseImage', 'price'],
      });
      if (!service) throw new Error('Service not found');

      if (payload.newSupabaseImage && service.supabaseImage) {
        await this.servicesRepository.deleteServiceSupabaseImageByServiceId(
          payload.id,
        );
        const supabase = this.configService.getBy('supabase');
        await deleteFileFromStorage({
          bucket: supabase.serviceImagesBucketName,
          path: service.supabaseImage.path,
          auth: { projectUrl: supabase.projectUrl, apiKey: supabase.apiKey },
        }).catch(console.error);
      }

      await this.servicesRepository.updateServiceByServiceId(payload.id, {
        status: payload.status,
        cardVariant: payload.cardVariant,
        title: payload.title,
        shortDescription: payload.shortDescription,
        longDescription: payload.longDescription,
        newSupabaseImage: payload.newSupabaseImage
          ? {
              id: payload.newSupabaseImage.id,
              publicUrl: payload.newSupabaseImage.publicUrl,
              path: payload.newSupabaseImage.path,
              fullPath: payload.newSupabaseImage.fullPath,
            }
          : null,
      });
      const updateService = await this.servicesRepository.getServiceById(
        payload.id,
        { relations: ['supabaseImage', 'price'] },
      );
      return { success: true, service: updateService };
    } catch (e) {
      return { success: false, service: null };
    }
  }
}
