var max = 5;
// maximum number of entries in this Menu

var t = data;  // shortcut
t.items = [];
var spacer = {title: gs.getMessage('------------'), type: 'link', href: '?id=req_c_ri&sys_id=78dbc4980f4863008bde807be1050e51', items: []};
var NewIncLink =  {title: gs.getMessage('Create a Ticket'), type: 'link', href:"?id=req_c_ri&sys_id=78dbc4980f4863008bde807be1050e51", items: []};
t.items.push(NewIncLink); //add Create a ticket to top of array
t.items.push(spacer);

var quickCount = new GlideRecord('incident');
quickCount.addActiveQuery();
quickCount.addQuery('caller_id', gs.getUserID());
quickCount.query();

var ritmCount = new GlideRecord('sc_req_item');
ritmCount.addActiveQuery();
ritmCount.addEncodedQuery('request.requested_for=' + gs.getUserID());
ritmCount.query();

t.count = quickCount.getRowCount() + ritmCount.getRowCount();

var u = gs.getUser().getID();

// use record watchers to tell header when to update dropdown counts
t.record_watchers = [];
t.record_watchers.push({'table':'incident','filter':'active=true^caller_id=' + u});
t.record_watchers.push({'table':'sc_req_item','filter':'active=true^requested_for=' + u});


var z = new GlideRecord('incident');
z.addActiveQuery();
z.addQuery('caller_id', gs.getUserID());
z.orderByDesc('sys_created_on');
z.setLimit(max);
z.query();
while (z.next()) {
  var a = {};
//  $sp.getRecordValues(a, z, 'short_description,sys_id,number,sys_updated_on');
a.short_description = z.short_description.getDisplayValue();
a.sys_id = z.sys_id.getDisplayValue();
a.number = z.number.getDisplayValue();
var gdt = new GlideDateTime(z.sys_created_on);
a.sys_updated_on = gdt.getValue();

  if (z.short_description.nil())
    a.short_description = "(No description)";
  a.__table = z.getTableName();
  a.__page = "tic";
  a.type = 'record';
  a.sortOrder = z.sys_created_on;
  t.items.push(a);
}

var g = new GlideRecord('sc_req_item');
g.addActiveQuery();
g.addEncodedQuery('request.requested_for=' + gs.getUserID());
g.orderByDesc('sys_created_on');
g.setLimit(max);
g.query();
while (g.next()) {
  gs.info(g.number);
  var c = {};
//  $sp.getRecordValues(a, z, 'short_description,sys_id,number,sys_updated_on');
c.short_description = g.short_description.getDisplayValue();
c.sys_id = g.sys_id.getDisplayValue();
c.number = g.number.getDisplayValue();
var gdt = new GlideDateTime(g.sys_created_on);
c.sys_updated_on = gdt.getValue();

  if (c.short_description == ''){
    c.short_description = "(No description)";
  }
  c.__table = g.getTableName();
  c.__page = "tic";
  c.type = 'record';
  c.sortOrder = g.sys_created_on;
  t.items.push(c);
}

t.items.sort(function(a, b) {
  return b.sortOrder - a.sortOrder;
});
//t.items = t.items.slice(0, max); // only want first 30
//t.count = t.items.length;

var link = {title: gs.getMessage('View all my tickets'), type: 'link', href: '?id=rec', items: []};

t.items.push(link); // put 'View all requests' first
