var gdt = new GlideDateTime();
var queryOne;
var queryTwo;

if(gdt.getDayOfMonth() <=7){
	queryOne = 'cdw.classroomcheck.weekone';
	queryTwo = 'cdw.classroomcheck.weekthree';
}
if(gdt.getDayOfMonth() > 7 && gdt.getDayOfMonth() <=14){
	queryOne = 'cdw.classroomcheck.weektwo';
	queryTwo = 'cdw.classroomcheck.weekfour';
}
if(gdt.getDayOfMonth() > 14 && gdt.getDayOfMonth() <=21){
	queryOne = 'cdw.classroomcheck.weekthree';
	queryTwo = 'cdw.classroomcheck.weekone';
}
if(gdt.getDayOfMonth() > 21 && gdt.getDayOfMonth() <=28){
	queryOne = 'cdw.classroomcheck.weekfour';
	queryTwo = 'cdw.classroomcheck.weektwo';
}

var cartId = GlideGuid.generate(null);
var cart = new Cart(cartId);
var item = cart.addItem(gs.getProperty('cdw.classroomcheck.item'));
cart.setVariable(item, 'classroom_check_query', queryOne);
var rc = cart.placeOrder();
gs.info(rc.number);

var cartId = GlideGuid.generate(null);
var cart = new Cart(cartId);
var item = cart.addItem(gs.getProperty('cdw.classroomcheck.item'));
cart.setVariable(item, 'classroom_check_query', queryTwo);
var rc = cart.placeOrder();
gs.info(rc.number);
