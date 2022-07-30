function Validator(options){

    var selectorRule = {}
   

    function validate(inputElement, rule){    
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage; 

        var rules = selectorRule[rule.selector];
        for(var i = 0; i < rules.length; i++){
        errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
            
      }
        if(errorMessage){
            errorElement.innerText = errorMessage,
            inputElement.parentElement.classList.add('invalid');


         }else{
          errorElement.innerText = '',
          inputElement.parentElement.classList.remove('invalid');

         }
         return !errorMessage;
    }

    var formElement = document.querySelectorAll(options.form)

    if(formElement){
      
        formElement.onSubmit= function(e){
            e.preventDefault();
            
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector)
                
               validate(inputElement, rule)
               if(!isValid){
                isFormvalid = false
               }
           var isFormvalid = true;
           
             
          
        });
        
                   
              if (isFormvalid) {
                if(typeof options.onSubmit === 'function'){
                    var enableInput = formElement.querySelectorAll('[name]');
                    var formValue = Array.from(enableInput).reduce(function(values, input){
                      return (values[input.name] = input.value) && values

                    },{});

                    options.onSubmit(formValue)
                }
          } 
          }
       
        options.rules.forEach(function(rule){


            // lưu các rule của các selector vào selectorrule
     
            if(Array.isArray(selectorRule[rule.selector])){
             selectorRule[rule.selector].push(rule.test)
             

            }else{
            selectorRule[rule.selector]= [rule.test]
             }
            selectorRule[rule.selector]= [rule.test]
       



            
 
        var inputElement = formElement.querySelector(rule.selector)
        
     if(inputElement){
       
       inputElement.onblur = function(){
          validate(inputElement, rule)
      
        }
       inputElement.oninput = function(){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

        errorElement.innerText = '',
        inputElement.parentElement.classList.remove('invalid');

       }

     
    }

 
        });
    
    
    }
}

// rule là các form'fullname và ismail' nếu khi rule.value là nhận lại các value người dùng đã nhập để nhận và trả ra message lỗi
// trim() là loại bỏ các khoảng trống

Validator.isRequired = function (selector, message){
 return {
    selector:selector,
    test: function(value){
     return value.trim() ? undefined : message || 'Vui lòng nhập trường này'

    }
 }

},


Validator.isEmail = function (selector, ){
      

    return {
        selector:selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'trường này phải là email'
  
        }
  
        
     }
    
},


Validator.minLength = function (selector, min, )
{ 
    return {
       selector:selector,
       
       test: function(value){
        return value.length >= min ? undefined : `vui lòng nhập ít nhất ${min} ký tự`
  
       }
     
    }
  
   }

Validator.isConfirmed = function(selector, getconfirm, message){
return {
    selector:selector,
    test: function(value){
        return value === getconfirm() ? undefined : message || 'Giá trị nhập vào không chính xác'
    }
}

} 
