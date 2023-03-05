export const index = async (req, res, next) => {
    try {
    // If the user is loggedin
	if (!req.session.loggedin) {
        res.redirect('admin/auth/sign-in');
	}
        res.render('admin/index',
        { owner: req.session.owner } );
    } catch(err){
        next(err)
    }
}
