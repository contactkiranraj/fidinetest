var utils    = require( '../utils' );
var mongoose = require( 'mongoose' );
var Menu     = mongoose.model( 'Menu' );
var SubMenu     = mongoose.model( 'SubMenu' );


exports.index = function ( req, res, next ){

  var user_id = req.cookies ?
    req.cookies.user_id : undefined;
var _id = req.cookies ?
    req.cookies._id : undefined;

  Menu.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, categories ){
      if( err ) return next( err );
      // var parent_id = categories[0]._id;
      var len = Object.keys(categories).length;
      // console.log(len);

 SubMenu.
    find({}).
    sort( '-updated_at' ).
    exec( function ( err, sub_categories ){
      if( err ) return next( err );
      var id = sub_categories[0].parent_id;

       SubMenu.
    find({parent_id:id}).
    sort( '-updated_at' ).
    exec( function ( err, sub_categories ){
      if( err ) return next( err );
// console.log(sub_categories);
      res.render( 'index', {
          title : 'Admin Menu Control',
          categories : categories,
          sub_categories : sub_categories
      });
});
      });
    });
};

exports.create = function ( req, res, next ){
  new Menu({
      user_id    : req.cookies.user_id,
      content    : req.body.content,
      updated_at : Date.now()
  }).save( function ( err, categories, count ){
    if( err ) return next( err );

    res.redirect( '/' );
  });
};

exports.createsub = function ( req, res, next ){
  // console.log(req.params.id);
  new SubMenu({
      parent_id    : req.params.id,
      usr_id   : req.cookies.user_id,
      content    : req.body.content,
      updated_at : Date.now()
  }).save( function ( err, sub_categories, count ){
    if( err ) return next( err );

    res.redirect( '/' );
  });
};



exports.destroy = function ( req, res, next ){
  Menu.findById( req.params.id, function ( err, categories ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( categories.user_id !== user_id ){
      return utils.forbidden( res );
    }

    categories.remove( function ( err, categories ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};

exports.edit = function( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  Menu.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, categories ){
      if( err ) return next( err );

      res.render( 'edit', {
        title   : 'Express Todo Example',
        categories   : categories,
        current : req.params.id
      });
    });
};

exports.update = function( req, res, next ){
  Menu.findById( req.params.id, function ( err, categories ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( categories.user_id !== user_id ){
      return utils.forbidden( res );
    }

    categories.content    = req.body.content;
    categories.updated_at = Date.now();
    categories.save( function ( err, todo, count ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};

// ** express turns the cookie key to lowercase **
exports.current_user = function ( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};




exports.customer = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;
  Menu.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, categories ){
      if( err ) return next( err );
      return categories;
      // res.render( 'customer', {
      //     title : 'Menu',
      //     categories : categories
      // });
    });
};