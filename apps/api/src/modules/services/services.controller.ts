import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UsePipes,
  Param,
} from '@nestjs/common';
import {
  createServicePayloadSchema,
  CreateServicePayload,
  CreateServiceResponse,
  GetServicesResponse,
  GetServiceResponse,
} from '@demo-A/api-types';
import { ZodValidationPipe } from '@demo-A/nest-utils';

import { AuthJwtGuard } from '../auth/auth.jwt.strategy';
import { ServicesService } from './services.service';
import { AllowedRoles, RolesGuard } from '../auth/auth.role.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getServices(): Promise<GetServicesResponse> {
    return this.servicesService.getServices();
  }

  @Get('/:serviceId')
  getServiceById(
    @Param('serviceId') serviceId: string,
  ): Promise<GetServiceResponse> {
    return this.servicesService.getServiceById({ serviceId });
  }

  @Post('/create')
  @AllowedRoles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthJwtGuard)
  @UsePipes(new ZodValidationPipe(createServicePayloadSchema))
  createService(
    @Body() payload: CreateServicePayload,
  ): Promise<CreateServiceResponse> {
    return this.servicesService.createService(payload);
  }
}
