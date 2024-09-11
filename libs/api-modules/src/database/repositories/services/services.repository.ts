import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Service,
  ServiceEntity,
  ServiceSupabaseImageEntity,
  ServicePriceEntity,
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
    @InjectRepository(ServicePriceEntity)
    private servicePricesRepository: Repository<ServicePriceEntity>,
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
    where: Omit<FindOneOptions<Service>['where'], 'price'>,
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
    where: Omit<FindOneOptions<Service>['where'], 'price'>,
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
    service.status = payload.status;
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

    if (payload.price) {
      const servicePrice = new ServicePriceEntity();
      servicePrice.serviceId = service.id;
      servicePrice.value = payload.price.value;
      servicePrice.discountValue = payload.price.discountValue;
      servicePrice.amount = payload.price.amount;
      servicePrice.unit = payload.price.unit;
      await this.servicePricesRepository.save(servicePrice);
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
    const { newSupabaseImage, ...rest } = payload;

    await this.servicesRepository.update({ id: service.id }, rest);

    if (payload.newSupabaseImage) {
      const serviceSupabaseImage = new ServiceSupabaseImageEntity();
      serviceSupabaseImage.serviceId = service.id;
      serviceSupabaseImage.supabaseId = payload.newSupabaseImage.id;
      serviceSupabaseImage.publicUrl = payload.newSupabaseImage.publicUrl;
      serviceSupabaseImage.path = payload.newSupabaseImage.path;
      serviceSupabaseImage.fullPath = payload.newSupabaseImage.fullPath;
      await this.serviceSupabaseImagesRepository.save(serviceSupabaseImage);
    }
  }

  async deleteServiceSupabaseImageByServiceId(serviceId: string) {
    await this.serviceSupabaseImagesRepository.delete({ serviceId });
  }
}
