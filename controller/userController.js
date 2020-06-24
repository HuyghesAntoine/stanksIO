const data = require('./userManager.js');
const path = require('path');


//this function is called from router.js to register a new user
exports.register = function (req,res){
    const insc = data.insert_user(req.body.lastname,req.body.firstname,req.body.jour,req.body.month,req.body.year,req.body.mail,req.body.mot2pass);
    res.sendFile(path.join(__dirname, "../public/html/index.html"));//when the user is registered he is redirected to the main page
}
//this function is also called from router.js to connect a user
exports.sign_in = function(req,res){
    const conex = data.get_user(req.body.mail, req.body.mot2pass);
    if(conex){
        req.session.firstname=conex.firstname; //if the user succed to connect we keep him in the session
        res.redirect('/?status=success');
        console.log(conex.firstname);
    }
    else{
        res.redirect('/?status=error');// else the user is redirected into the main page with an error
        console.log('erreur');
    }
};