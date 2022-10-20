//Server side script include takes in the parameter Street

var GetCSG = Class.create();
GetCSG.prototype = {
    initialize: function() {
		this.csgAdmin = gs.getProperty('csg.assignment.group_admin');
		this.csgEastQ = gs.getProperty('csg.assignment.group_eastq');
		this.csgWestQ = gs.getProperty('csg.assignment.group_westq');
		this.csgNorthQ = gs.getProperty('csg.assignment.group_northq');
		this.csgEndPoint = gs.getProperty('csg.assignment.group_endpoint');
		this.csgServDesk = gs.getProperty('csg.assignment.group_srvdesk');
		this.edcAVC = gs.getProperty('edc.assignment.group_avc');
    },


	_getNewCSG: function(st){
		if(st.includes("160 Longwood") || st.includes("160-164 Longwood") || st.includes("164 Longwood") || st.includes("158 Longwood") || st.includes("180 Longwood") || st.includes("188 Longwood") || st.includes("635 Huntington") || st.includes("641 Huntington") || st.includes("643 Huntington") || st.includes("655 Huntington") || st.includes("665 Huntington") || st.includes("651 Huntington") || st.includes("677 Huntington") || st.includes("260 Longwood") || st.includes("10 Shattuck") || st.includes("25 Shattuck") || st.includes("401 Park") || st.includes("107 Avenue Louis Pasteur") || st.includes("107 Ave Louis Pasteur") || st.includes("90 Smith") || st.includes("1542 Tremont")){
			if((!(st.includes("Center for Biomedical Informatics"))) && (!(st.includes("CBMI"))) && (!(st.includes("DBMI"))) && (!(st.includes("Department of Biomedical Informatics")))){
				return this.csgAdmin;
			}
		}
		if(st.includes("210 Longwood") || st.includes("220 Longwood") || st.includes("200 Longwood") || st.includes("Center for Biomedical Informatics") || st.includes("CBMI") || st.includes("DBMI") || st.includes("Department of Biomedical Informatics")){
			return this.csgEastQ;
		}
		if(st.includes("240 Longwood") || st.includes("45 Shattuck") || st.includes("250 Longwood")){
			return this.csgWestQ;
		}
		if(st.includes("4 Blackfan") || st.includes("77 Avenue Louis Pasteur") || st.includes("77 Ave Louis Pasteur")){
			return this.csgNorthQ;
		}
		return this.csgServDesk;
	},

	_getNewCSGLoc1: function(st){
		if(st.includes("160-164 Longwood") || st.includes("158 Longwood") || st.includes("180 Longwood") || st.includes("188 Longwood") || st.includes("635 Huntington") || st.includes("641 Huntington") || st.includes("Countway") || st.includes("Gordon Hall") || st.includes("Landmark") || st.includes("Vanderbilt")|| st.includes("Alpert/236") || st.includes("Alpert/436") || st.includes("Alpert/563") && !(st.includes("Center for Biomedical Informatics") || st.includes("CBMI") || st.includes("DBMI") || st.includes("Department of Biomedical Informatics"))){
			return this.csgAdmin;
		}
		if((st.includes("Armenise") || st.includes("Goldenson") || st.includes("Warren Alpert") || st.includes("Center for Biomedical Informatics") || st.includes("CBMI") || st.includes("DBMI") || st.includes("Department of Biomedical Informatics")) && (!(st.includes("Alpert/236"))) && (!(st.includes("Alpert/436"))) && (!(st.includes("Alpert/563"))) && (!(st.includes("Armenise/Amphitheater")))){
			return this.csgEastQ;
		}
		if(st.includes("Building C") || st.includes("LHRRB") || st.includes("Seely Mudd") || st.includes("250 Longwood")){
			return this.csgWestQ;
		}
		if(st.includes("HIM") || st.includes("NRB")){
			return this.csgNorthQ;
		}
		if(st.includes("Tutorial Room") && (!(st.includes("115 Tutorial Room")))){
			return this.csgEndPoint;
		}
		if(st.includes("Armenise/Amphitheater") || st.includes("TMEC")){
			return this.edcAVC;
		}
		return this.csgServDesk;
	},

	_getNewCSGLoc2: function(st){
		if(st.includes("Tutorial Room") && (!(st.includes("115 Tutorial Room")))){
			return this.csgEndPoint;
		}
		else{
			return this.edcAVC;
		}
	},

    type: 'GetCSG'
};
