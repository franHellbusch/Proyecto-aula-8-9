class MongoService {
  constructor(model) {
    this.model = model;
  }

  async getAll(params = {}) {
    return await this.model.find(params);
  }

  async getById(id) {
    const data = await this.model.findById(id);

    if (!data) {
      throw new Error(`Object ${id} not found`);
    }

    return data;
  }

  async getByParams(params) {
    const data = await this.model.findOne(params);

    if (!data) {
      throw new Error(`Object ${id} not found`);
    }

    return data;
  }

  async save(object) {
    const data = new this.model(object);
    return await data.save();
  }

  async deleteById(id) {
    await this.getById(id);
    await this.model.findByIdAndDelete(id);

    return id;
  }
}

export default MongoService;
