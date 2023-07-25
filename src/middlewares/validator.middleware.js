export const validateSchema = (schema) => (req, res, next) => {
  try {
    //El esquema se va a comparar con el req.body que es  la información que va llegando
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.errors.map(error => error.message)
    });
  } 
};
