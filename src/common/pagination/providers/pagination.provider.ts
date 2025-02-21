import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { URL, URLSearchParams } from 'url';
import { Paginated } from '../interfaces/paginated.inteface';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    whereConditions: object = {},
  ): Promise<Paginated<T>> {
    const { page = 1, limit = 6 } = paginationQuery;
    const skip = (page - 1) * limit;

    const results = await repository.find({
      where: whereConditions,
      take: limit,
      skip,
    });

    const totalItems = await repository.count({ where: whereConditions });
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;
    const firstPage = 1;
    const lastPage = totalPages;
    const nextPage = page < totalPages ? page + 1 : totalPages;
    const previousPage = page > 1 ? page - 1 : 1;

    // Construct the base URL from the request
    const baseURL = `${this.request.protocol}://${this.request.headers.host}${this.request.path}`;

    // Preserve existing query parameters
    const buildUrl = (pageNumber: number) => {
      const url = new URL(baseURL);
      const params = new URLSearchParams(
        this.request.query as Record<string, string>,
      );

      params.set('page', pageNumber.toString());
      params.set('limit', limit.toString());

      url.search = params.toString();
      return url.toString();
    };

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage,
        totalPages,
      },
      links: {
        first: buildUrl(firstPage),
        last: buildUrl(lastPage),
        current: buildUrl(currentPage),
        next: buildUrl(nextPage),
        previous: buildUrl(previousPage),
      },
    };

    return finalResponse;
  }
}
