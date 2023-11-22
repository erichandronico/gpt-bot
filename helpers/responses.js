
const catchError = (res, error) => {

    console.log( new Date() +': Error ', error );
    
    res.status(500).json({
        ok: false,
        msg: 'ocurrió un error :(',
        tipo: 'error'
    });

};

const responseCallback = res => (err, data) => {
    if (!err) return res.json({ok: true, data});

    console.log( new Date() +': Error ', err );
    
    res.status(500).json({
        ok: false,
        msg: 'ocurrió un error :(',
        tipo: 'error'
    });
}

const returnCallback = (err, data) => {
    if (!err) return {ok: true, data}

    console.log( new Date() +': Error ', err );
    return { ok: false, msg: 'ocurrió un error :(', tipo: 'error' };
}

module.exports = {
    catchError,
    responseCallback,
    returnCallback
};