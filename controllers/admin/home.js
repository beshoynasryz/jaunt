export const index = async (req, res, next) => {
    try {
    // If the user is loggedin
      if (req.session.authId && (req.session.authId !== req.session.owner?._id)) {
        res.redirect('admin/auth/sign-in');
	}
        res.render('admin/index',
        { owner: req.session.owner } );
    } catch(err){
        next(err)
    }
}
