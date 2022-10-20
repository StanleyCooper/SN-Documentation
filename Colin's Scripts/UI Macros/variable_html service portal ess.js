/*
UI Macro for use as a catalog item variable to show HTML on catalog item.

Set the instructions value on the variable to the HTML you want displayed.
*/

<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">

       <g:evaluate jelly="true">

               var gr = new GlideRecord('item_option_new');

               gr.get(jelly.jvar_question_id);

               gr

       </g:evaluate>

       <div class="help-block text-muted col-xs-6">

               <g:no_escape>${gr.instructions}</g:no_escape>

       </div>

</j:jelly>
