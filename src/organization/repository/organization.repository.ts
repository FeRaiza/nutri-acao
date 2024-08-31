import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrganizationRepository } from '../interfaces/organization-repository.interface';
import { Organization } from '../entities/organization.entity';
import { CreateOrganizationDto } from '../dto/organization/create-organization.dto';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  // Encontrar todas as organizações
  async findAllOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  // Encontrar uma organização por ID
  async findOrganizationById(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findOneBy({ id });
    return organization;
  }

  // Criar uma organização
  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const organization = this.organizationRepository.create(
      createOrganizationDto,
    );
    return this.organizationRepository.save(organization);
  }

  // Atualizar uma organização
  async updateOrganization(
    id: string,
    organization: Partial<Organization>,
  ): Promise<Organization> {
    await this.organizationRepository.update(id, organization);
    return this.findOrganizationById(id);
  }

  // Deletar uma organização
  async deleteOrganization(id: string): Promise<void> {
    await this.organizationRepository.delete(id);
  }
}
