var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Menu = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

var SubMenu = new Schema({
	parent_id  : String,
    user_id    : String,
    content    : String,
    updated_at : Date
});
mongoose.model( 'Menu', Menu );
mongoose.model( 'SubMenu', SubMenu );
mongoose.connect( 'mongodb://127.0.0.1:27017' );
