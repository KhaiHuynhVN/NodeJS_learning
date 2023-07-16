module.exports = {
   mongooseToObjectForArray(mongooses) {
      return mongooses.map((mongoose) => mongoose.toObject());
   },
   mongooseToObject(mongoose) {
      return mongoose ? mongoose.toObject() : mongoose;
   },
   mongooseFixer(mongoose) {
      return JSON.parse(JSON.stringify(mongoose));
   },
};
