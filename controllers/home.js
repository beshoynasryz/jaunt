export const index =async (req, res, next) => {
    try {
        res.render('index', { layout: './admin/layouts/guest' }
        );
    } catch(err){
        next(err)
    }
}
