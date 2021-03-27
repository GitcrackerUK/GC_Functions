const displayCounter = (req, res) => {
    const method = req.method;
    if (method === 'GET') {
        const data = req.body;
        console.log(data);
    }
    res.send('hello');
};

exports.displayCounter = displayCounter;
