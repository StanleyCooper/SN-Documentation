var assetComment = '';
var ciDescription = '';

var assetGR = new GlideRecord('alm_hardware');
assetGR.query();
while(assetGR.next()){

  //gs.log('Asset: ' + assetGR.display_name);
  assetComment = assetGR.comments;

  var ciGR = new GlideRecord('cmdb_ci');
  ciGR.addEncodedQuery('asset=' + assetGR.sys_id);
  ciGR.query();
  if(ciGR.next()){

    //gs.log('CI: ' + ciGR.name);
    ciDescription = ciGR.short_description;

  }

  if(assetComment != '' && ciDescription != ''){

    gs.log('Asset Comments: ' + assetComment + '\n\nCI Description: ' + ciDescription);
    assetGR.comments = 'Asset Comments: ' + assetComment + '\n\nCI Description: ' + ciDescription;
    assetGR.update();

  }
  if(assetComment != '' && ciDescription == ''){

    gs.log('Asset Comments: ' + assetComment);
    assetGR.comments = 'Asset Comments: ' + assetComment;
    assetGR.update();

  }
  if(assetComment == '' && ciDescription != ''){

    gs.log('CI Description: ' + ciDescription);
    assetGR.comments = 'CI Description: ' + ciDescription;
    assetGR.update();

  }

  assetComment = '';
  ciDescription = '';

  }



83H8082 - empty
DMPZ6H24KD6J
1ZXPD42
7NJ6C42
