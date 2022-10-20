//add newly created model category to desired product models
var modelCategoryGR = new GlideRecord('cmdb_hardware_product_model');
modelCategoryGR.addEncodedQuery('nameLIKEipod^ORnameLIKEIphone 7');
modelCategoryGR.query();
while(modelCategoryGR.next()){

  modelCategoryGR.cmdb_model_category = '3cb4cad8db30dc10565f58eadc9619a8';
  modelCategoryGR.update();

}

//update existing assets product model
var assetModelCategoryGR = new GlideRecord('alm_hardware');
assetModelCategoryGR.addEncodedQuery('model=ce48a3b8db575f409675d855ca9619a3^ORmodel=016cf550db131f409675d855ca961951');
assetModelCategoryGR.query();
while(assetModelCategoryGR.next()){

  assetModelCategoryGR.model_category = '3cb4cad8db30dc10565f58eadc9619a8';
  assetModelCategoryGR.update();

}


/*
var dictionaryUpdateGR = new GlideRecord('sys_dictionary');
dictionaryUpdateGR.addEncodedQuery('sys_idSTARTSWITH338c29d7db011300e66e68d35b9619ea');
dictionaryUpdateGR.query();
if(dictionaryUpdateGR.next()){

  gs.log(dictionaryUpdateGR);
  //dictionaryUpdateGR.reference_cascade_rule = '';
  dictionaryUpdateGR.update();

}

//delete CI's
var count = 0;
var deleteCIGR = new GlideRecord('cmdb_ci_computer');
//deleteCIGR.addEncodedQuery('model_id.nameLIKEipod touch^ORmodel_id.nameLIKEiphone 7^sys_class_name=cmdb_ci_computer');
deleteCIGR.addEncodedQuery('sys_id=ec350ea2db6ce300fcc01bfa4b96195b');
deleteCIGR.query();
while (deleteCIGR.next()) {
    //Delete each record in the query result set
    gs.log('name: ' + deleteCIGR.name);
    deleteCIGR.setWorkflow(false);
    count++;
    deleteCIGR.deleteRecord();
}
gs.log(count);

var dictionaryUpdateGR2 = new GlideRecord('sys_dictionary');
dictionaryUpdateGR2.addEncodedQuery('sys_idSTARTSWITH338c29d7db011300e66e68d35b9619ea');
dictionaryUpdateGR2.query();
if(dictionaryUpdateGR2.next()){

  dictionaryUpdateGR2.reference_cascade_rule = 'delete';
  dictionaryUpdateGR2.update();

}
*/
