export class BaseRepository<T> {
  public model!: any;
  constructor(model: any) {
    this.model = model;
  }
  async create(data: any): Promise<T> {
    return await this.model.create(data);
  }
  async updatebyID(data: any, ID: string): Promise<any> {
    //const obj = await this.model.findOneByID(ID);
    return await this.model.update(data, { where: { ID: ID } });
  }
  async deletebyID(data: any): Promise<number> {
    return await this.model.destroy(data);
  }
  async findOneByID(ID: string) {
    return await this.model.findOne({ where: { ID: ID } });
  }
  async findAll(data: any): Promise<T[]> {
    return await this.model.findAll(data);
  }
}
