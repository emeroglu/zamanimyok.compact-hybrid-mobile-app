app.directive("zaIf", function($rootScope) {

    return {
        restricts: "A",
        link: function($scope, $element, $attr) {

            if ($attr.zaIf.substr(0,1) == "$") {

                $rootScope.$watch(function() {
                    
                    return $eval($attr.zaIf);

                },function(){

                    if ($eval($attr.zaIf)) {
                        $element.removeClass("z-none");
                    } else {
                        $element.addClass("z-none");
                    }

                });

            } else {

                $scope.$watch(function() {
                    
                    return $scope.$eval($attr.zaIf);

                },function(){

                    if ($scope.$eval($attr.zaIf)) {
                        $element.removeClass("z-none");
                    } else {
                        $element.addClass("z-none");
                    }

                });

            }

        }
    }

});