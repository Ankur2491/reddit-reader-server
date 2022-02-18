const cors = require('cors');
const express = require("express");
const axios = require('axios')
const app = express();
app.use(cors())
let port = process.env.PORT || 3000;

app.get('/reddit/:par/:order/:just', async (req, res) => {
  let para = req.params.par;
  let order = req.params.order;
  let just = req.params.just;
  if (just == true) {
      let resp = await axios.get(`https://www.reddit.com/search.rss?q=${para}`).catch(err=>{console.log(err)});
      res.send(resp.data);
  }
  if (order == 'hot') {
      let resp = await axios.get(`https://www.reddit.com/r/${para}/.rss`)
      res.send(resp.data);
  }
  else {
      let resp = await axios.get(`https://www.reddit.com/r/${para}/new/.rss?sort=new`)
      res.send(resp.data);
  }
})

app.get('/reddit/comments/:sub/comments/:uid/:txt', async (req, res) => {
  let sub = req.params.sub;
  let uid = req.params.uid;
  let txt = req.params.txt;
  let resp = await axios.get(`https://www.reddit.com/r/${sub}/comments/${uid}/${txt}/.rss`);
  res.send(resp.data);
})

app.get('/reddit/comments/:sub/comments/:uid/:txt/:cid', async (req, res) => {
  let sub = req.params.sub;
  let uid = req.params.uid;
  let txt = req.params.txt;
  let cid = req.params.cid;
  let resp = await axios.get(`https://www.reddit.com/r/${sub}/comments/${uid}/${txt}/${cid}/.rss`);
  res.send(resp.data);
})
app.listen(port, () => {
  console.log(`Example app is listening on port http://localhost:${port}`)
});