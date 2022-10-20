/*************************

Config
Name: Customer Site Map
API ID: customer_site_map
No ACLs

Create two resources
**************************/

/*********

name: kb
http method: get
relative path: /kb
security: requires authentication false


******/

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {


    var kbs, user_criteria, articles;
    var base_url = gs.getProperty('glide.servlet.uri');
    var site_maps_before = "";
    var site_maps = "";
    var hdrs = {};

    hdrs['Content-Type'] = 'text/xml';
    response.setHeaders(hdrs);
    response.setStatus(200);
    var writer = response.getStreamWriter();

    var public_kb_sys_ids = [];

    var base_sites = [
        "/",
        //"/?id=kb_search&amp;kb_knowledge_base=42876ccd6f840600d7a2be7cbb3ee4f2",
        "/?id=kb_search&amp;kb_knowledge_base=378e51056f46c200f290bc226e3ee44a" //public kb sys_id
    ];

    kbs = new GlideRecord("kb_knowledge_base");
    kbs.addQuery("active", true);
    kbs.query();
    while(kbs.next()){
        user_criteria = new GlideRecord("kb_uc_can_read_mtom");
        user_criteria.addQuery('kb_knowledge_base',kbs.getValue('number'));
        user_criteria.query();
        if(!user_criteria.hasNext()){
            public_kb_sys_ids.push(kbs.getValue('sys_id'));
        }

        user_criteria = null;
    }

    kbs = null;

    articles = new GlideRecord("kb_knowledge");
    articles.addQuery("workflow_state","published");
    articles.addQuery("kb_knowledge_base", "IN", public_kb_sys_ids.join(','));
    articles.query();

    writer.writeString('<?xml version="1.0" encoding="UTF-8"?>\n\n <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

    //Base sites
    for(var i = 0; i < base_sites.length; i++){
        writer.writeString("<url>\n");
        writer.writeString("<loc>" + base_url + "kb" + base_sites[i] + "</loc>");
        writer.writeString("</url>\n");
    }

    var useful_data = []; //We have to do this here. If we just get the values while concatenating the strings, it breaks and never returns a sitemap.
    var single_article = "";

    while(articles.next()){
        writer.writeString("<url><loc>" + base_url + "kb/?id=kb_article_view&amp;sysparm_article=");

        useful_data = {
            number: articles.getValue('number'),
            sys_id: articles.getValue('sys_id'),
            date: articles.getValue('published')
        };

        writer.writeString(useful_data.number);
        writer.writeString("&amp;sys_kb_id=" + useful_data.sys_id + "</loc>");

        writer.writeString("<lastmod>" + useful_data.date + "</lastmod>");
        writer.writeString("<priority>0.7</priority>\n</url>");

        writer.writeString(single_article);
    }

    writer.writeString("</urlset>");

})(request, response);


/*********

name: root
http method: get
relative path: /
security: requires authentication false


******/

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

	var base_url = gs.getProperty('glide.servlet.uri');
	var site_maps = "";
    var gr = new GlideRecord("sys_ws_operation");


	gr.addQuery("web_service_definition", "dd63bf9edbfe2414ac5860fdd3961906"); //Sys ID of Wesleyan Scripted Rest Service
	gr.addQuery("name","!=","root");
	gr.query();

	var writer = response.getStreamWriter();

	site_maps = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

	while(gr.next()){


		site_maps += "<sitemap>";
		site_maps += "<loc>" + base_url + ((gr.getValue("operation_uri") +'').substring(1)) + "</loc>";
		site_maps += "<lastmod>" + gs.now() + "</lastmod>";
		site_maps += "</sitemap>";
	}

	site_maps += "</sitemapindex>";

	response.setContentType('text/xml');
	writer.writeString(site_maps);

})(request, response);
