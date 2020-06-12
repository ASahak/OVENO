module.exports = class BaseService {
    constructor(model, name) {
        this.model = model;
        this.name = name;
    }

    async getOneByParams(params = null) {
        if (params) {
            return this.model.findOne(params);
        }

        return this.model.findOne();
    }

    async getById(_id, project = {}) {
        const result = await this.model.findOne({ _id }, project);

        if (!result) {
            throw new NotFound(NOT_EXISTS(this.name));
        }

        return result;
    }

    async getByParams(params = null) {
        if (params) {
            return await this.model.find(params);
        }

        return await this.model.find();
    }

    async getByEmail(email) {
        const data = await this.model.findOne({ email });

        if (!data) {
            throw new NotFound(NOT_EXISTS(this.name));
        }

        return data;
    }

    async getAllFromCollection(project = null) {
        if (project) {
            return await this.model.find({}, project);
        }

        return await this.model.find({});
    }

    async create(data) {
        return this.model.create(data);
    }

    async delete(_id) {
        return this.model.findOneAndDelete({ _id });
    }

    async update(_id, attributes, customOptions = null) {
        let options = { new: true };
        if (customOptions) {
            options = { ...options, ...customOptions };
        }

        return this.model.findOneAndUpdate({ _id }, attributes, options);
    }
}
