import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service, ServiceEntity } from '@demo-A/api-types';
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

  async getServices(): Promise<Service[]> {
    const services = await this.servicesRepository.find();
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
    service.imagePath = payload.imagePath;
    service.imageUrl = payload.imageUrl;
    await this.servicesRepository.save(service);
    return service;
  }

  async updateServiceByServiceId(
    serviceId: string,
    payload: ServicesRepositoryUpdateServicePayload,
  ): Promise<void> {
    const service = await this.servicesRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) throw new Error('Service not found');
    await this.servicesRepository.update({ id: service.id }, payload);
  }
}
