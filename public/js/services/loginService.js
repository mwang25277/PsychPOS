angular.module('loginService', []).factory('loginService' , function() {
    var id = 0;
    var name = "";
    
    return {
        login : function(id_, name_) { 
            id = id_;
            name = name_;
        },
        
        getName : function () {
            return name;
        },

        getId : function() {
            return id;
        }
    }; 
});