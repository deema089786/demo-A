import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Service,
  ServiceEntity,
  ServiceSupabaseImage,
  ServiceSupabaseImageEntity,
} from '@demo-A/api-types';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import {
  ServicesRepositoryUpdateServicePayload,
  ServicesRepositoryCreateServicePayload,
} from './services.repository.types';

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private servicesRepository: Repository<ServiceEntity>,
    @InjectRepository(ServiceSupabaseImageEntity)
    private serviceSupabaseImagesRepository: Repository<ServiceSupabaseImageEntity>,
  ) {}

  async getServiceById(
    serviceId: string,
    options: { relations?: FindOneOptions<Service>['relations'] } = {},
  ): Promise<Service | null> {
    const service = await this.servicesRepository.findOne({
      where: { id: serviceId },
      relations: options.relations,
    });
    if (!service) return null;
    return service;
  }

  async getServiceBy(
    where: FindOneOptions<Service>['where'],
    options: { relations?: FindOneOptions<Service>['relations'] } = {},
  ): Promise<Service | null> {
    const service = await this.servicesRepository.findOne({
      where,
      relations: options.relations,
    });
    if (!service) return null;
    return service;
  }

  async getServices(
    where: FindOneOptions<Service>['where'],
    options: { relations?: FindOneOptions<Service>['relations'] } = {},
  ): Promise<Service[]> {
    const services = await this.servicesRepository.find({
      where,
      relations: options.relations,
    });
    return services;
  }

  async createService(
    payload: ServicesRepositoryCreateServicePayload,
  ): Promise<Service> {
    const service = new ServiceEntity();
    service.cardVariant = payload.cardVariant;
    service.title = payload.title;
    service.shortDescription = payload.shortDescription;
    service.longDescription = payload.longDescription;
    await this.servicesRepository.save(service);

    if (payload.supabaseImage) {
      const serviceSupabaseImage = new ServiceSupabaseImageEntity();
      serviceSupabaseImage.serviceId = service.id;
      serviceSupabaseImage.supabaseId = payload.supabaseImage.id;
      serviceSupabaseImage.publicUrl = payload.supabaseImage.publicUrl;
      serviceSupabaseImage.path = payload.supabaseImage.path;
      serviceSupabaseImage.fullPath = payload.supabaseImage.fullPath;
      await this.serviceSupabaseImagesRepository.save(serviceSupabaseImage);
    }

    return service;
  }

  async updateServiceByServiceId(
    serviceId: string,
    payload: ServicesRepositoryUpdateServicePayload,
  ): Promise<void> {
    const service = await this.servicesRepository.findOne({
      where: { id: serviceId },
      relations: ['supabaseImage'],
    });
    if (!service) throw new Error('Service not found');
    const { supabaseImage, ...rest } = payload;
    // TODO handle updating supabaseImage
    await this.servicesRepository.update({ id: service.id }, rest);
  }
}
