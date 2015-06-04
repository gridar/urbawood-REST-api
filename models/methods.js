var mongoose = require('mongoose');

var methodSchema = mongoose.Schema({
  name: String,
  description: String,
  type: String,
  parameters: Array,
  script: String,
  _api: { type: mongoose.Schema.Types.ObjectId, ref: 'api' }
}, {collection: 'method'});

mongoose.model('Method', methodSchema);