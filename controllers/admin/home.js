export const index =async (req, res, next) => {
    try {
        res.render('admin/index');
    } catch(err){
        next(err)
    }
}
