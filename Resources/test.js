//Set database connection
var db = Ti.Database.install('/data/database', 'database');
var producten = db.execute("SELECT * FROM mealTimer");

while (producten.isValidRow())
{
  var productid = producten.fieldByName('id');
  var productname = producten.fieldByName('name');
  var producttijd = producten.fieldByName('tijd');
  var productcolor = producten.fieldByName('color');
  var productimage = producten.fieldByName('image');
  
  
  var productarray = [];
  productarray.push({id:productid, naam:productname, image:productimage, color:productcolor, tijd:producttijd});
  producten.next();
}
producten.close();
