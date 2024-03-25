class MongoService {
  constructor(model) {
    this.model = model;
  }

  async getAll(params = {}) {
    return await this.model.find(params);
  }
}

export default MongoService;
