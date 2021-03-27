const displayCounter = (req, res) => {
    const method = req.method;
    if (method === 'GET') {
        const data = req.body;
        console.log(data);
        res.send({
            message: 'This is google function with camelCase:) ',
            method: method,
        });
    }
    res.send({
        request: req.body,
        method: method,
    });
};

exports.displayCounter = displayCounter;
