import type { EntityName } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/core';
import type { Collection } from 'mongodb';
import type { MongoEntityManager } from './MongoEntityManager';

export class MongoEntityRepository<T extends object> extends EntityRepository<T> {

  constructor(protected readonly _em: MongoEntityManager,
              protected readonly entityName: EntityName<T>) {
    super(_em, entityName);
  }

  /**
   * Shortcut to driver's aggregate method. Available in MongoDriver only.
   */
  async aggregate(pipeline: any[]): Promise<any[]> {
    return this.getEntityManager().aggregate(this.entityName, pipeline);
  }

  getCollection(): Collection<T> {
    return this.getEntityManager().getCollection(this.entityName);
  }

  /**
   * @inheritDoc
   */
  getEntityManager(): MongoEntityManager {
    return this._em;
  }

  /**
   * @inheritDoc
   */
  protected get em(): MongoEntityManager {
    return this._em;
  }

}
