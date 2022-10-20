//UI Macro Name = user_show_assigned_ci
//add attribute for ref_contributions of user_show_assigned_ci

<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
     <j2:set var="jvar_n" value="getUserAssets_${ref}"/>

     <a id="${jvar_n}" onClick="getUserAssets()" title="Lookup user assets" alt="Add me" tabindex="0" class="btn btn-default icon-hardware"></a>

     <script>
             function getUserAssets() {
                var refurl = reflistOpenUrl('incident.cmdb_ci', 'incident.cmdb_ci', 'cmdb_ci', 'cmdb_ci', 'null', 'false', '');
                var url = 'assigned_to=' + g_form.getValue('caller_id') + '^ORassigned_to=' + g_form.getValue('u_affected_user');
                var refurlquery = refurl + url;
                popupOpenStandard(refurlquery, 'lookup');
             }

     </script>


</j:jelly>
