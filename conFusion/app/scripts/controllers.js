'use strict';

angular.module('confusionApp')
  .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";
  //$scope.dishes= menuFactory.getDishes();
  //$scope.message = "Loading ...";
  //$scope.dishes = menuFactory.getDishes().query();
  menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });


  $scope.select = function(setTab) {
    $scope.tab = setTab;
    
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } 
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };
  
  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };


}])



.controller('ContactController', ['$scope', function($scope) {

  $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
  var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
  $scope.channels = channels;
  $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
   $scope.sendFeedback = function() {
      console.log($scope.feedback);

      if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {  
         $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    feedbackFactory.sendFeedback().save({id:$scope.feedback.id},$scope.feedback);
                    $scope.invalidChannelSelection = false;
                    //feedbackFactory.save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            //var dish= menuFactory.getDish(parseInt($stateParams.id,10));

            //$scope.dish = dish;
            $scope.dish = {};
            //$scope.showDish = true;
            //$scope.message="Loading ...";
            //$scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );

}])


.controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

      //$scope.Comment = {rating:5,ratecomments:"",name:"", date:""};
      $scope.mycomment = {rating:5,comment:"",author:"", date:""};
      $scope.submitComment = function () {
                
                //var new_name = $scope.Comment.name;
                //var new_rate = $scope.Comment.rate;
                //var new_ratecomments = $scope.Comment.ratecomments;
                //var new_date = new Date();
                $scope.mycomment.date = new Date();
                console.log($scope.mycomment);
                //$scope.dish.comments.push({'rating': $scope.Comment.rating, 'comment': $scope.Comment.comment, 'author':$scope.Comment.author, 'date':$scope.Comment.date});
                $scope.dish.comments.push($scope.mycomment);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
                
            }
}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
            /*$scope.leaders= corporateFactory.getLeaders();*/

            $scope.showLeaders = false;
            $scope.message = "Loading ...";
            //$scope.leaders = corporateFactory.getLeaders().query();
            corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
        }])

.controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory) {
            //$scope.featureDish=menuFactory.getDish(0);
            $scope.dish = {};

            //$scope.featureDish = menuFactory.getDishes().get({id:0});
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:0})
              .$promise.then(
              function(response){
                $scope.dish = response;
                $scope.showDish = true;
              },
              function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
              }
              );

            //$scope.featurePromotion=menuFactory.getPromotion(0);
            $scope.showPromotion = false;
            $scope.message = "Loading ...";
            $scope.featurePromotion=menuFactory.getPromotion().get({id:0})
              .$promise.then(
                function(response){
                  $scope.featurePromotion = response;
                  $scope.showPromotion = true;
                },
                function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            

            //$scope.chef=corporateFactory.getLeader(3);
            $scope.showChef = false;
            $scope.message = "Loading ...";
            $scope.chef=corporateFactory.getLeaders().get({id:3})
              .$promise.then(
                function(response){
                  $scope.chef = response;
                  $scope.showChef = true;
                },
                function(response){
                  $scope.message = "Error: "+response.status + " " + response.statusText;
                }
                );
        }])

;
