var app = angular.module('APIDATA',[]);

app.controller('MainCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.inputs = [];

        $scope.addPost = function () {
            var formdata = {//'lat' : $scope.lat,
                            //'lon': $scope.lon,
                            'address':$scope.city,
                            'system_capacity':$scope.system_capacity,
                            'azimuth':$scope.azimuth,
                            'tilt':$scope.tilt,
                            'array_type':$scope.array_type.degree,
                            'module_type':$scope.module_type.degree,
                            'losses':$scope.losses,
                            'timeframe':"hourly"};
            var jdata = 'mydata=' + JSON.stringify(formdata);
            $http({
                    url: "http://localhost:3000/server?callback=JSON_CALLBACK",
                    method: "POST",
                    data: jdata,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .success(function (data, status, headers, config) {
                        //alert('Success');
                        var myarray = [];
                        $(function(){
                            function getacData() {
                                var acarray = [];
                                console.log($scope.timeframe.degree);
                                if($scope.timeframe.degree == "monthly") {
                                    for (var i = 1; i <= 12; i++) {
                                        acarray.push([i, data.outputs.ac_monthly[i - 1]]);
                                    }
                                }
                                else if($scope.timeframe.degree == "hourly"){
                                    for (var i = $scope.from-1; i < $scope.to; i++) {
                                        acarray.push([i+1, data.outputs.ac[i]]);
                                    }
                                }
                                var temp = data.station_info.city + ","+ data.station_info.state;
                                return [
                                {label: temp, data: acarray},
                                ];
                            }
                            function getdcData() {
                                var dcarray = [];
                                console.log($scope.timeframe.degree);
                                if($scope.timeframe.degree == "monthly") {
                                    for (var i = 1; i <= 12; i++) {
                                        dcarray.push([i, data.outputs.dc_monthly[i - 1]])
                                    }
                                }
                                else if($scope.timeframe.degree == "hourly"){
                                    for (var i = $scope.from-1; i < $scope.to; i++) {
                                        dcarray.push([i+1, data.outputs.dc[i]])
                                    }
                                }
                                var temp = data.station_info.city + ","+ data.station_info.state;
                                return [
                                    {label: temp, data: dcarray},
                                ];
                            }

                            if($scope.timeframe.degree == "monthly") {
                                var options1 = {
                                    legend: {
                                        show: true
                                    },
                                    series: {
                                        lines: {
                                            show: true
                                        },
                                        points: {
                                            show: true
                                        }
                                    },
                                    axisLabels: {
                                        show: true
                                    },
                                    yaxis: {
                                        show: true,
                                        ticks: 10,
                                        axisLabel: "Monthly ac system o/p (kWhac)",
                                        axisLabelUseCanvas: true,
                                        axisLabelFontSizePixels: 15,
                                        axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                                        axisLabelPadding: 5
                                    },
                                    xaxis: {
                                        show: true,
                                        ticks: 10,
                                        axisLabel: "Months",
                                        axisLabelUseCanvas: true,
                                        axisLabelFontSizePixels: 15,
                                        axisLabelPadding: 5
                                    },
                                    grid: {
                                        color: "#800"
                                    },
                                };
                            }
                            else if ($scope.timeframe.degree == "hourly")
                            {
                                var options1 = {
                                    legend: {
                                        show: true
                                    },
                                    series: {
                                        lines: {
                                            show: true
                                        },
                                        points: {
                                            show: true
                                        }
                                    },
                                    axisLabels: {
                                        show: true
                                    },
                                    yaxis: {
                                        show: true,
                                        ticks: 10,
                                        axisLabel: "Hourly ac system o/p (Wac)",
                                        axisLabelUseCanvas: true,
                                        axisLabelFontSizePixels: 15,
                                        axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                                        axisLabelPadding: 5
                                    },
                                    xaxis: {
                                        show: true,
                                        ticks: 10,
                                        axisLabel: "Hours",
                                        axisLabelUseCanvas: true,
                                        axisLabelFontSizePixels: 15,
                                        axisLabelPadding: 5
                                    },
                                    grid: {
                                        color: "#800"
                                    },
                                };
                            }
                            if($scope.timeframe.degree == "monthly") {
                                var options2 = {
                                    legend: {
                                        show: true
                                    },
                                    series: {
                                        lines: {
                                            show: true
                                        },
                                        points: {
                                            show: true
                                        }
                                    },
                                    axisLabels: {
                                        show: true
                                    },
                                    yaxis: {
                                        show: true,
                                        ticks: 10,
                                        axisLabel: "Monthly dc system o/p (kWhdc)",
                                        axisLabelUseCanvas: true,
                                        axisLabelFontSizePixels: 15,
                                        axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                                        axisLabelPadding: 5
                                    },
                                    xaxis: {
                                        show: true,
                                        ticks: 10,
                                        axisLabel: "Months",
                                        axisLabelUseCanvas: true,
                                        axisLabelFontSizePixels: 15,
                                        axisLabelPadding: 5
                                    },
                                    grid: {
                                        color: "#800"
                                    },
                                };
                            }
                            else if ($scope.timeframe.degree == "hourly") {
                                var options2 = {
                                    legend: {
                                        show: true
                                    },
                                    series: {
                                        lines: {
                                            show: true,
                                        },
                                        points: {
                                            show: true
                                        },
                                    },
                                    axisLabels: {
                                        show: true
                                    },
                                    yaxis: {
                                        show: true,
                                        ticks: 10,
                                        axisLabel: "Hourly dc system o/p (Wdc)",
                                        axisLabelUseCanvas: true,
                                        axisLabelFontSizePixels: 15,
                                        axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                                        axisLabelPadding: 5
                                    },
                                    xaxis: {
                                        show: true,
                                        ticks: 10,
                                        axisLabel: "Hours",
                                        axisLabelUseCanvas: true,
                                        axisLabelFontSizePixels: 15,
                                        axisLabelPadding: 5
                                    },
                                    grid: {
                                        color: "#800"
                                    },
                                };
                            }

                            var acdata = getacData();
                            var plot1 = $.plot("#placeholder1",acdata,options1);
                            var dcdata = getdcData();
                            var plot2 = $.plot("#placeholder2",dcdata,options2);
                            //$("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
                        });

                        for(j=1;j<=12;j++) {
                            console.log(data.outputs.ac_monthly[j-1]);
                        }

                    })
                    .error(function (data, status, headers, config) {
                        alert('Failed');
                    });
        }
}]);
