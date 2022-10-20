//Client side SI that then calls the GetCSG SI 

var GetAG = Class.create();
GetAG.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	popAG:function(){
		var strt = this.getParameter('sysparm_street');
		var str1 = this.getParameter('sysparm_street1');
		var str ='';
		if(str1 == '1'){
			var gr1 = new GlideRecord("cmn_location");
			gr1.addQuery("sys_id", strt);
			gr1.query();
			if (gr1.next()) {
			   str = gr1.street;
			}
		}
		else{
			str = strt;
		}

		var agMatrix = gs.getProperty('csg.assignment.group_matrix');
		var sub = this.getParameter('sysparm_sub_cat');
		var tier = this.getParameter('sysparm_tier');
		var gr = new GlideRecord('cmdb_ci');
		if(gr.get(sub)){
			if(tier == 'Tier 1'){
				if(gr.u_tier_1_group == agMatrix){
					var csg1 =  new GetCSG();
					var send1 = csg1._getNewCSG(str);
					return send1;
				}
				else{
					return gr.u_tier_1_group;
				}
			}
			if(tier == 'Tier 2'){
				if(gr.u_tier_2_group == agMatrix){
					var csg2 =  new GetCSG();
					var send2 = csg2._getNewCSG(str);
					return send2;
				}
				else{
					return gr.u_tier_2_group;
				}
			}
			if(tier == 'Tier 3'){
				if(gr.u_tier_3_group == agMatrix){
					var csg3 =  new GetCSG();
					var send3 = csg3._getNewCSG(str);
					return send3;
				}
				else{
					return gr.u_tier_3_group;
				}
			}
		}
	},
    type: 'GetAG'
});
