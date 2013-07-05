//"Unknown provider: $meteorProvider <- $meteor"
app.controller("MeteorCtrl", ["$scope", "$meteor", "$timeout",function($scope, $meteor, $timeout){

    $scope.Todos = $meteor("todos");
    $scope.todos = $scope.Todos.find({});
    $scope.Lists = $meteor("lists");
    $scope.lists = $scope.Lists.find({});

    $scope.currentTags = function(){
        var temp = {};
        for(var i in $scope.todos){
            todo = $scope.todos[i];
            for(var o in todo.tags){
                tag = todo.tags[o];
                if(temp[tag]){
                    temp[tag] = temp[tag] +1;
                }else{
                    if(!(tag instanceof Object)){
                        temp[tag] = 1;
                    }

                }
            }
        }
        return temp;
    }
    $scope.$watch('selectedList', function() {
        $scope.selectedTags = [];
        $scope.newTodo = {
            tags : [],
            list_id : $scope.selectedList
        }
    })
    $scope.$watch('selectedTags + selectedList', function() {
        if($scope.selectedList){
            sel = {list_id : $scope.selectedList}
            if ($scope.selectedTags.length > 0) {
                sel.tags = {'$in' : $scope.selectedTags};
            }
            $scope.todos = $scope.Todos.find(sel);

            // This could also be done by a separate query in the previous function
            if ($scope.selectedTags.length == 0) {
                $scope.computedCurrentTags = $scope.currentTags();
            }
        } else {
            $scope.todos = null;
        }
    })

    $scope.selectedList = $scope.lists.length > 0 ? $scope.lists[$scope.lists.length-1]._id : "";//$routeParams.id;
    $scope.oldSelectedList = $scope.selectedList;

    $scope.changeList = function(id){
        $scope.stopped = false;
        $scope.click = $timeout(function(){
            if(!$scope.stopped)   {
                $scope.selectedList = id;
            }
        },200);
    }
    $scope.stop  = function(){
        $scope.stopped = $timeout.cancel($scope.click);
    }

    $scope.removeTag = function(todo,tag){
        todo.tags.splice(todo.tags.indexOf(tag),1);
        todo.$save();
    }

    $scope.addFilterTag = function(tag){
        if($scope.selectedTags.indexOf(tag)>-1){
            $scope.selectedTags.splice($scope.selectedTags.indexOf(tag),1);
        }else{
            $scope.selectedTags.push(tag);
        }
        $scope.selectedTags = clone($scope.selectedTags); // Force updating
    }
    $scope.isFilterTag = function(tag){
        if($scope.selectedTags.indexOf(tag)>-1){
            return true;
        }
        return false;
    }

}]);