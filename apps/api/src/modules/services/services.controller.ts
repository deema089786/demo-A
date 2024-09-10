import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UsePipes,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  createServicePayloadSchema,
  CreateServicePayload,
  CreateServiceResponse,
  GetServicesResponse,
  GetServiceResponse,
  getServicesQuerySchema,
  updateServiceStatusPayloadSchema,
  UpdateServiceStatusPayload,
  UpdateServiceStatusResponse,
  updateServicePayloadSchema,
  UpdateServicePayload,
  UpdateServiceResponse,
} from '@demo-A/api-types';
import { ZodValidationPipe } from '@demo-A/nest-utils';

import { AuthJwtGuard, AuthOptionalJwtGuard } from '../auth/auth.jwt.guard';
import { ServicesService } from './services.service';
import { AllowedRoles, RolesGuard } from '../auth/auth.role.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @UseGuards(AuthOptionalJwtGuard)
  getServices(@Query() query: unknown): Promise<GetServicesResponse> {
    const { data, success, error } = getServicesQuerySchema.safeParse(query);
    if (!success) {
      throw new BadRequestException(error.errors);
    }
    return this.servicesService.getServices(data);
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

  @Post('/update-status')
  @AllowedRoles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthJwtGuard)
  @UsePipes(new ZodValidationPipe(updateServiceStatusPayloadSchema))
  updateServiceStatus(
    @Body() payload: UpdateServiceStatusPayload,
  ): Promise<UpdateServiceStatusResponse> {
    return this.servicesService.updateServiceStatus(payload);
  }

  @Post('/update')
  @AllowedRoles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthJwtGuard)
  @UsePipes(new ZodValidationPipe(updateServicePayloadSchema))
  updateService(
    @Body() payload: UpdateServicePayload,
  ): Promise<UpdateServiceResponse> {
    return this.servicesService.updateService(payload);
  }
}
