var express = require('express')
app = express();

app.use(express.compress());
app.use(express.static(__dirname + '/static', {maxAge:86400000}));
app.listen(process.env.PORT || 3005);