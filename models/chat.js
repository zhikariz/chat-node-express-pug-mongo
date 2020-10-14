const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Chat Schema
const ChatSchema = Schema({
  id_pengirim: {
    type: String,
  },
  nama_pengirim: {
    type: String,
  },
  message: {
    type: String,
  },
  nama_penerima: {
    type: String,
  },
  id_penerima: {
    type: String,
  },
  waktu_dikirim: {
    type: Date,
    default: Date.now
  },
});

module.exports = Chat = mongoose.model('Chat', ChatSchema);
