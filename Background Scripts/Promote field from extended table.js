/**********************************
THIS IS NOT CAPTURED IN UPDATE SETS AND MUST BE RAN ON EACH INSTANCE THAT DESIRE TO MAKE THE CHANGES ON!!
DO THIS PRIOR TO IMPORTING THE UPDATE SETS
**********************************/

//Move from child to parent table
GlideDBUtil.promoteColumn('table_to_move_from', 'table_to_move_to', 'field_to_move', true);

//Move from parent to child table
GlideDBUtil.promoteColumn('table_to_move_from', 'table_to_move_to', 'field_to_move', false);


//Harvard Law promote u_building from alm_hardware to alm_asset
//Steps to implement
//Visit background scripts
//Run script below
//Push update SET 20190305 - Aptris RAC CS0003450 - Building Field - Asset
//Test
GlideDBUtil.promoteColumn('alm_hardware', 'alm_asset', 'u_building', true);
