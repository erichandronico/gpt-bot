

const getHelloWorld = async (req, res) => {
    try {
        console.log( 'Hello World', req.query );   
        res.json({ saludo: 'Hola Mundo', ...req.query});
    } catch (error) {
        console.log(error)
        res.status(500).json({ok: false, error })
    }
} 


module.exports = {
    getHelloWorld
}