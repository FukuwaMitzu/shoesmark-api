import { VIRTUAL_COLUMN_KEY } from './virtualColumn.decorator';
import { SelectQueryBuilder } from 'typeorm';
import { isNotEmptyObject } from 'class-validator';
declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    executeEntitiesAndRawResults(): Promise<{ entities: Entity[]; raw: any[] }>;
    getMany(this: SelectQueryBuilder<Entity>): Promise<Entity[] | undefined>;
    getOne(this: SelectQueryBuilder<Entity>): Promise<Entity | undefined>;
  }
}

SelectQueryBuilder.prototype.getMany = async function () {
  const { entities, raw } = await this.getRawAndEntities();

  const items = entities.map((entity, index) => {
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};
    if (isNotEmptyObject(metaInfo)) {
      const key = metaInfo['propType'];
      entity[key] = raw[index][metaInfo['name']];
    }
    return entity;
  });

  return [...items];
};

SelectQueryBuilder.prototype.getOne = async function () {
  const { entities, raw } = await this.getRawAndEntities();

  if (entities.length == 0) return null;

  const entity = entities[0];
  const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};
  if (isNotEmptyObject(metaInfo)) {
    const key = metaInfo['propType'];
    entity[key] = raw[0][metaInfo['name']];
  }
  return entity;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const originExecute = SelectQueryBuilder.prototype.executeEntitiesAndRawResults;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
SelectQueryBuilder.prototype.executeEntitiesAndRawResults = async function (
  queryRunner,
) {
  const { entities, raw } = await originExecute.call(this, queryRunner);
  entities.forEach((entity, index) => {
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};
    if (isNotEmptyObject(metaInfo)) {
      const key = metaInfo['propType'];
      entity[key] = raw[index][metaInfo['name']];
    }
  });
  return { entities, raw };
};
