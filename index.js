const hello = (req, res) => {
    const method = req.method;
    if (method === 'POST') {
        const data = req.body;
        console.log(data);
    }
    res.send('hello');
};

exports.hello = hello;
