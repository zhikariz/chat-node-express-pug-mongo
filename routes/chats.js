const express = require('express');
const router = express.Router();

// Load User Model
const Chat = require('../models/chat');

// @route  GET api/chats/test
// @desc   Tests chats route
router.get('/test', (req, res) => res.json({msg: "Chats Works"}));


// @route  Get api/chats/get/:pengirim/:penerima
// @desc   Send Message
router.post('/send/:idPengirim/:idPenerima', (req, res) => {
  Chat.findOne({id_pengirim: req.body.idPengirim})
    .then(chat => {
      const newChat = {
        id_pengirim: req.params.idPengirim,
        nama_pengirim: req.body.nama_pengirim,
        message: req.body.message,
        id_penerima: req.params.idPenerima,
        nama_penerima: req.body.nama_penerima
      }
      new Chat(newChat).save().then(chat => res.json(chat));
    });
});


// @route  Get api/chats/get/:pengirim/:penerima
// @desc   Get Message
router.get('/get/:idPengirim/:idPenerima', (req, res) => {
  const errors = {};
  const pengirim = req.params.idPengirim;
  const penerima = req.params.idPenerima;
  Chat
    .find({
      $or: [
        {$and: [{id_pengirim: pengirim}, {id_penerima: penerima}]},
        {$and: [{id_pengirim: penerima}, {id_penerima: pengirim}]}
      ]
    })
    .sort({waktu_dikirim: 'asc'})
    .then(chats => {
      if (!chats) {
        errors.chat = 'There are no chats';
        res.status(404).json(errors);
      }
      res.json(chats);
    })
    .catch(err => res.status(404).json({chat: 'There was an error'}));
});


module.exports = router;
