function onChange(control, oldValue, newValue, isLoading) {
   if(isLoading || newValue == ''){
           return;
   }

   // Allows formats of (999) 999-9999, 999-999-9999, and 9999999999
   var pattern = /^[(]?(\d{3})[)]?[-|\s]?(\d{3})[-|\s]?(\d{4})$/;

   if(!pattern.test(newValue)){

           alert('Phone enter a valid phone number in the format of (999) 999-9999, 999-999-9999, or 999999999');

           g_form.setValue('variablename', '');

   }

}
