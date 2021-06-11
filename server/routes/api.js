const express = require('express');
const router = express.Router();

const URL = require('../model/URL');
const msg = require('../constants/serverMessages')

router.get('/', async (_, res) => {
  try {
    const urls = await URL.find({}).sort('-date');
    if (urls.length) {
      res.status(200).send(urls);
    } else {
      res.status(404).send(msg.NO_URLS_ERROR);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(msg.SERVER_ERROR);
  }
});

router.get('/:shortURL', async (req, res) => {
  const { shortURL } = req.params;
  try {
    const url = await URL.findOneAndUpdate({ shortURL }, { $inc: { counter: 1 } }, { new: true });
    if (url) {
      res.status(200).send(url);
    } else {
      res.status(404).send(msg.NO_URL_FOUND_ERROR)
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(msg.SERVER_ERROR);
  }
});

router.post('/', async (req, res) => {
  const { longURL, shortURL } = req.body;
  try {
    if (await URL.findOne({ shortURL })) {
      return res.status(409).send(msg.REPEATED_URL_ERROR);
    }
    newURL = new URL(req.body);
    await newURL.save();
    res.status(200).send(msg.POST_SUCCESS);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(msg.SERVER_ERROR);
  }
});

router.put('/:shortURL', async (req, res) => {
  const { shortURL } = req.params;
  const { newShortURL } = req.body;
  try {
    if (await URL.findOne({ shortURL: newShortURL })) {
      return res.status(409).send(msg.REPEATED_URL_ERROR);
    }
    const url = await URL.findOneAndUpdate({ shortURL }, {shortURL: newShortURL});
    if (url) {
      res.status(200).send(msg.PUT_SUCCESS);
    } else {
      res.status(404).send(msg.NO_URL_FOUND_ERROR)
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(msg.SERVER_ERROR);
  }
});

router.delete('/:shortURL', async (req, res) => {
  const { shortURL } = req.params;
  try {
    const url = await URL.findOneAndRemove({ shortURL });
    if (url) {
      res.status(200).send(msg.DELETE_SUCCESS);
    } else {
      res.status(404).send(msg.NO_URL_FOUND_ERROR);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(msg.SERVER_ERROR);
  }
});

module.exports = router;