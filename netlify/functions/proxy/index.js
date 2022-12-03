const fetch = require('node-fetch');

exports.handler = async (event) => {
  let statusCode, data;

  let { url, cookie } = JSON.parse(event.body);

  try {
    const response = await fetch(url, {
      headers: { cookie: `${cookie}` },
    });
    data = await response.text();
    statusCode = 200;
  } catch (err) {
    statusCode = err.statusCode || 500;
    data = { error: err.message };
  }

  return {
    statusCode,
    body: JSON.stringify(data),
  };
};
