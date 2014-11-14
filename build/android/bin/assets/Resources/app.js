var rand = Math.floor((Math.random() * 99999999999) + 1);;
Ti.API.info(rand);
//Set database connection
var db = Ti.Database.install('productDB', 'database' + rand);
var producten = db.execute("SELECT * FROM mealTimer");

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});



win1.open(); // DON"T CLOSE!!

var scrView1 = Ti.UI.createScrollView({
    layout: 'horizontal',
    contentWidth: '750px',
    height: '100%',
  	width: '100%',
    top:'50dp',
	left:'0',
    backgroundColor: '#000'
});




// bouwen van de header

var header = Titanium.UI.createView({
	backgroundColor:'#ad302c',
	width:'100%',
	height:'50dp',
	top:'0',
	left:'0',
	
});

var headerlogo = Titanium.UI.createImageView({
	image:'header.png'
});

win1.add(header);
win1.add(scrView1);
header.add(headerlogo);



while (producten.isValidRow())
{
  var productid = producten.fieldByName('id');
  var productname = producten.fieldByName('name');
  var producttijd = producten.fieldByName('tijd');
  var productcolor = producten.fieldByName('color');
  var productimage = producten.fieldByName('image');
  
  var productarray = [];
  productarray.push({id:productid, naam:productname, image:productimage, color:productcolor, tijd:producttijd});
  
	var item1 = Titanium.UI.createView({
		height: '360px',
		width: '360px',
		backgroundColor:'#'+productcolor,
		id: productid,
		tijd: producttijd,
		plaatje: productimage
	});
	
	
		
		var win3 = Ti.UI.createWindow({
		backgroundColor:'#B00bbb',
		});	
		
		var label = Ti.UI.createLabel({
		text: Ti.App.Properties.getString("keuze")
		});
		
		var header2 = Ti.UI.createLabel({
				backgroundColor:'#ad302c',
				width:'100%',
				height:'50dp',
				top:'0',
				left:'0'
		});
		
		
		win3.add(label);
		win3.add(header2);
		
		header2.addEventListener('click', function(item1) {
			Ti.App.Properties.setString('keuze', "");
			win3.close();
		});
		
		Ti.API.info(productimage);
	
	item1.addEventListener('click', function(e) {
		Ti.App.Properties.setString("keuze", e.source.tijd);
		Ti.App.Properties.setString("plaatje", e.source.plaatje);
		
		keuzeIcon = Ti.UI.createImageView({
			image:'/iconen/'+Ti.App.Properties.getString("plaatje"),
			top:'30dp',	
			width:'150dp',
			height:'150dp'
		});
		win2.open();

		keuzeDetail.add(keuzeIcon);
		

	});
	
		
		
		
	var item1label = Titanium.UI.createLabel({
		text:productname,
		top:'90dp',
		font: {fontSize: '14px'},
		color: '#fff',
		id: productid,
		tijd: producttijd,
		plaatje: productimage
	});
	
	
	
	var item1image = Titanium.UI.createImageView({
		image: '/iconen/' + productimage,
		height:'55dp',
		width:'55dp',
		top: '20dp',
		id: productid,
		tijd: producttijd,
		plaatje: productimage
	});
	


	scrView1.add(item1);
	item1.add(item1label);
	item1.add(item1image);
	
  producten.next();
}

// licensed MIT.
// copyright Daniel Tamas
// http://rborn.info





// countdown timer 

var countDown =  function( m , s, fn_tick, fn_end  ) {
	return {
		total_sec:m*60+s,
		timer:this.timer,
		set: function(m,s) {
			this.total_sec = parseInt(m)*60+parseInt(s);
			this.time = {m:m,s:s};
			return this;
		},
		start: function() {
			var self = this;
			this.timer = setInterval( function() {
				if (self.total_sec) {
					self.total_sec--;
					self.time = { m : parseInt(self.total_sec/60), s: (self.total_sec%60) };
					fn_tick();
				}
				else {
					self.stop();
					fn_end();
				}
				}, 1000 );
			return this;
		},
		stop: function() {
			clearInterval(this.timer);
			this.time = {m:0,s:0};
			this.total_sec = 0;
			return this;
		}
	};
};	
	



var my_timer = new countDown(Ti.App.Properties.getString("keuze"),0, 
		function() {
			display_lbl.text = my_timer.time.m+" : "+my_timer.time.s;
		},
		function() {
			alert("The time is up!");
		}
	);


// interface

var win1 = Titanium.UI.createWindow({  
    backgroundColor:'#ccc'
});





var display_lbl =  Titanium.UI.createLabel({
	text: Ti.App.Properties.getString('keuze')+" : 0",
	height:80,
	width:320,
	top:100,
	left:0,
	color:'#fff',
	borderRadius:10,
	backgroundColor:'#000',
	font:{
		fontSize:70,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var set_btn = Titanium.UI.createButton({
	title:'Set',
	width:200,
	height:30,
	top:200,
	left:60,	
	font:{
		fontSize:20,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var start_btn = Titanium.UI.createButton({
	title:'Start',
	width:200,
	height:30,
	top:250,
	left:60,	
	font:{
		fontSize:20,
		fontWeight:'bold'
	},
	textAlign:'center'
});

var stop_btn = Titanium.UI.createButton({
	title:'Stop',
	width:200,
	height:30,
	top:300,
	left:60,	
	font:{
		fontSize:20,
		fontWeight:'bold'
	},
	textAlign:'center'
});




set_btn.addEventListener('click',function(){
	display_lbl.text = Ti.App.Properties.getString('keuze')+" : 0";
	my_timer.set(Ti.App.Properties.getString("keuze"),0);
});

stop_btn.addEventListener('click',function(){
	my_timer.stop();
});

start_btn.addEventListener('click',function(){
	my_timer.start();
});


win3.add(display_lbl);
win3.add(set_btn);
win3.add(start_btn);
win3.add(stop_btn);



// BOUWEN VAN HET 2DE SCHERM

var win2 = Ti.UI.createWindow({
	height:'100%',
	width:'100%'
});

var header2 = Ti.UI.createView({
	height:'50dp',
	width:'100%',
	backgroundColor:'#ad302c',
	top:'0'
});

var backButton = Ti.UI.createImageView({
	left:'10dp',
	image:'/images/back.png'
});

	backButton.addEventListener('click', function(item1) {
		//keuzeDetail.remove(keuzeIcon);
		win2.close();
	});
		
	win2.addEventListener('close', function(item1) {
		keuzeDetail.remove(keuzeIcon);
	});

var logo = Ti.UI.createImageView({
	image:'/images/header.png'
});

var keuzeDetail = Ti.UI.createView({
	top:'50dp'
});

var gerechtImage = Ti.UI.createImageView({
	image:'/images/gerecht.png',
	width:'100%',
	height:'250dp',
	top:'0'
});



var keuzeLabel = Ti.UI.createImageView({
	text:'tonijn',
	top:'180dp',
	color:'#fff'
});

var buttonView = Ti.UI.createView({
	top:'300dp',
	width:'100%',
	layout:'horizontal'
});

	buttonView.addEventListener('click', function(){
		win3.open()
	});

var buttonMagn = Ti.UI.createView({
	width:'540px',
	height:'400px',
	backgroundColor:'#901d22'
});

var buttonPan = Ti.UI.createView({
	width:'540px',
	height:'400px',
	backgroundColor:'#753569'
});

var buttonOven = Ti.UI.createView({
	width:'540px',
	height:'400px',
	backgroundColor:'#5b3155'
});

var buttonFrit = Ti.UI.createView({
	width:'540px',
	height:'400px',
	backgroundColor:'#8f44ad'
});

var imageMagn = Ti.UI.createImageView({
	image:'/images/magn.png',
	width:'300px',
	height:'300px'
});


var imagePan = Ti.UI.createImageView({
	image:'/images/pan.png',
	width:'300px',
	height:'300px'
});


var imageOven = Ti.UI.createImageView({
	image:'/images/oven.png',
	width:'300px',
	height:'300px'
});


var imageFrit = Ti.UI.createImageView({
	image:'/images/frit.png',
	width:'300px',
	height:'300px'
});


win2.add(header2);
win2.add(keuzeDetail);
win2.add(buttonView);
buttonView.add(buttonMagn);
buttonView.add(buttonPan);
buttonView.add(buttonOven);
buttonView.add(buttonFrit);
buttonMagn.add(imageMagn);
buttonPan.add(imagePan);
buttonOven.add(imageOven);
buttonFrit.add(imageFrit);
keuzeDetail.add(gerechtImage);
keuzeDetail.add(keuzeLabel);
header2.add(backButton);
header2.add(logo);



