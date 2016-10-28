var applicationChart = angular.module('applicationChart',[]);
applicationChart.controller('Chart',['$scope', '$http','$filter',function($scope,$http,$filter ){
    $scope.genChart=function() {
        var reg = new Array();
        var amo = new Array();
        var url = "https://fitqbe.com/task-test/chart.json";
        $http({
            method:'GET',
            url: url
        }).success(function(data) {
            $scope.daneOrderBy=$filter('orderBy')(data,'registered');
            angular.forEach($scope.daneOrderBy,function(value,index){
                reg.push(value.registered);
                amo.push(value.amount);
                });
            $scope.printChart=function(){
                var data = {
                    labels: reg,
                    datasets: [
                        {
                            label: "My First dataset",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: amo,
                            spanGaps: false,
                        }
                    ]
                };
        var ctx = document.getElementById("Chart");
        var newChart = new Chart(ctx, {
        type: 'line',
        data: data
        });
            };
            $scope.printChart();
        })
        .error(function(error) {
                console.log("Error occured");
        });
    };
}]);