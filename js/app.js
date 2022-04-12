var app = angular.module("myApp",["ngRoute","mds"])

app.config(function ($routeProvider) {
    $routeProvider
        .when("/",{
            template:"<h1>Home</h1>"
        })
        .when("/users",{
            templateUrl:"templates/users.html",
            controller:"usresCtrl"
        })
        .when("/emps",{
            templateUrl:"templates/emps.html",
            controller:"empsCtrl"
        })
        .when("/insertUser",{
            templateUrl:"templates/insertUser.html",
            controller:"insertUserCtrl"
        })
        .when("/insertEmp",{
            templateUrl:"templates/insertEmp.html",
            controller:"insertEmpCtrl"
        })
})

app.controller("usresCtrl",function ($scope,$rootScope,$http2) {
    function getUSers(){
        $http2.get("api/getUsers.php")
            .then(function (response) {
                $scope.users=response.data
                $scope.$apply()
            })
    }
    getUSers()
    $scope.changeUserImage=function(img,id){
        var check = confirm("Sure to change the image")
        if(check){
            $http2.post("api/editUserImage.php",{
                id:id,
                img:img
            }).then(function (resp) {
                if(resp.data.status){
                    alert("Image updated successfully")
                    getUSers()
                }
                else
                    alert("Failed to update image")
            })
        }
    }

    $scope.preEditUser=function(user){
        $scope.editedUser=angular.copy(user)
        console.log($scope.editedUser)
        $("#myModal").modal("show")
    }
    $scope.editUser=function(){
        var check = confirm("Sure to change user ?")
        if(check){
            $http.post("api/editUser.php",$scope.editedUser)
                .then(function (resp) {
                    if(resp.data.status){
                        alert("User updated successfully")
                        $("#myModal").modal("hide")
                       getUSers()
                    }
                    else{
                        alert("Failed to update user")
                    }

                })
        }
    }
    $scope.deleteUser=function (id,index) {
        var check = confirm("Are you sure")
        if(check){
            $http.post("api/deleteUser.php",{
                id:id
            }).then(function (response) {
                if(response.data.status){
                    alert("User deleted successfully")
                    $scope.users.splice(index,1)
                }
                else{
                    alert("Failed to delete user")
                }
            })
        }
    }
})

app.controller("empsCtrl",function ($scope,$rootScope,$http2) {
    function getEmps(){
        $http2.get("/appA22/api/getEmps.php")
            .then(function (response) {
                $scope.emps=response.data
                $scope.$apply()
            })
    }
    getEmps()
    $scope.editImage=function(img,id){
        $http2.post("api/editEmpImage.php",{
            id:id,
            img:img
        }).then(function (resp) {
            if(resp.data.status){
                alert("Image Updated Successfully")
                getEmps()
            }
            else{
                alert("Failed to update employee")
            }
        })
    }
    $scope.copyEmp=function(emp){
        emp.showEdit=true
        console.log($scope.emps)
        $scope.copiedEmp=angular.copy(emp)
    }
    $scope.editEmp=function(){
        var check = confirm("Sure to edit employee ?")
        if(check){
            $http.post("api/editEmp.php",$scope.copiedEmp)
                .then(function (resp) {
                    if(resp.data.status){
                        alert("Employee updated successfully")
                        getEmps()
                    }
                    else{
                        alert("Failed to update employee")
                    }
                })
        }
    }
    $scope.deleteEmp=function (id,index) {
        var check = confirm("Are you sure ?")
        if(check){
            $http.post("api/deleteEmp.php",{
                id:id
            }).then(function (response) {
                if(response.data.status){
                    alert("Employee deleted successfully")
                    $scope.emps.splice(index,1)
                }
                else{
                    alert("Failed to delete employee")
                }
            })
        }
    }
})

app.controller("insertUserCtrl",function ($scope,$rootScope,$http2) {
    $scope.addUser=function () {
        $http2.post("http://localhost/appA22/api/insertUser.php",{
            name:$scope.name,
            user:$scope.user,
            pass:$scope.pass,
            img:$scope.x
        }).then(function (response) {
            if(response.data.status){
                alert("Inserted Successfully")
                $scope.name=""
                $scope.user=""
                $scope.pass=""
                $scope.y=""
                $scope.$apply()
            }
            else{
               alert("Failed to insert user")
            }
        })
    }
})

app.controller("insertEmpCtrl",function ($scope,$rootScope,$http2) {
    $scope.addEmp=function () {
        $http2.post("api/insertEmp.php",{
            name:$scope.name,
            age:$scope.age,
            sal:$scope.sal,
            addr:$scope.addr,
            img:$scope.x
        }).then(function (response) {
            if(response.data.status){
                alert("Employee inserted successfully")
                $scope.name=""
                $scope.age=""
                $scope.sal=""
                $scope.addr=""
                $scope.y=""
                $scope.$apply()
            }
            else{
             alert("Failed to insert employee")
            }
        })
    }
})