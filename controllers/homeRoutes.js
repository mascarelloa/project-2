const router = require('express').Router();
const withAuth = require('../utils/auth');

// Login route
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
    res.render('login');
  });
  
  // router.get('/login', (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  //   }
  //   res.render('login', {layout:"main.handlebars"});
  // });


//server routing to the shelf page.
  router.get('/shelf', withAuth, async (req, res) => {
    //
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: User }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('shelf', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });



  module.exports = router;