getSCAttachmentCount(){

  var length;

  try {

  length = angular.element("#sc_cat_item").scope().attachments.length;

  } catch(e) {

  length = -1;

  }

  return length;

}
