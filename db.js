var pg = require('pg');
var statsd = require('./statsd');
var pool;

var createTableText = `

CREATE TABLE IF NOT EXISTS values (
  id SERIAL PRIMARY KEY,
  data JSONB
);
`;

module.exports = {
    connectDB : function() {
        pool = new pg.Pool({
            connectionString: process.env.POSTGRESQL_ADDON_DIRECT_URI || process.env.POSTGRESQL_ADDON_URI,
        })
        pool.query(createTableText, [], (err, res) => {
            if (err) {
              throw err
            }
          })
    },

    updateGauge : function() {
        pool.query('SELECT COUNT(1) FROM values;', [], (err, res) => {
            if (err) {
              throw err
            }
            statsd.gauge('values', res.rows[0]);
          })
    },

    getVal : function(result) {
        pool.query('SELECT * FROM values;', [], (err, res) => {
            if (err) {
                console.log(err);
                res.send('database error');
                return
            }
            var values = {};
            for (var i in res.rows) {
                var val = res.rows[i];
                values[val["id"]] = val["data"]["value"]
            }
            result.render('index', {title: 'NodeJS PostgreSQL demo', values: values});
          });
    },

    sendVal : function(val, res) {
        pool.query('INSERT INTO values(data) VALUES($1) RETURNING *', [{'value': val}], (err, queryData) => {
            if (err) {
                console.log(err);
                res.send(JSON.stringify({status: "error", value: "Error, db request failed"}));
                return
            }
            this.updateGauge();
            statsd.increment('creations');
            result = queryData.rows[0];
            res.status(201).send(JSON.stringify({status: "ok", value: result["data"].value, id: result["id"]}));
          });
    },

    delVal : function(id) {
        pool.query('DELETE FROM values where id = $1', [id], (err, result) => {
            if (err) {
                console.log(err);
            }
            this.updateGauge();
            statsd.increment('deletions');
          });
    }
};
