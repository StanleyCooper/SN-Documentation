Name: Requested Item Attachments
Applies to table: Catalog task [sc_task]
Queries from Table: Attachment [sys_attachment]
Query with:
current.addQuery("table_name", "sc_req_item");
current.addQuery("table_sys_id", parent.request_item);
