const hello = (req, res) => {
    const method = req.method;
    if (method === 'POST') {
        console.log(req.body);
    }
    res.send('hello');
};

exports.hello = hello;
